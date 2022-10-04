using EPiServer.Find.Helpers.Text;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace Optimizely.Server;

public static class PathUtils
{
    public static string[] DefaultDocuments = new string[] { };
    
    /// <summary>
    /// These are the domain names that are considered "local."
    /// </summary>
    /// <remarks>
    /// These need to be lower-cased!
    /// </remarks>
    public static string[] DefaultHosts = new string[] { }; // The main host should be first
    public static string DefaultScheme = "http";
    public static char PathDelim = '/';
    public static string SpaceReplacement = "-";
    public static Func<string, string> CleanPath = DefaultPathCleaner;
    public static Func<string, string> CleanSegment = DefaultSegmentCleaner;

    public static string GetHost()
    {
        return DefaultHosts.FirstOrDefault() ?? "example.com";
    }

    /// <summary>
    /// Returns true if path is an absolute URL (ex: "http://deane.com/deane.jpg")
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public static bool IsAbsolute(string input)
    {
        if (!string.IsNullOrWhiteSpace(input))
        {
            return input.StartsWith("http");
        }
        return false;
    }

    /// <summary>
    /// Returns true if path is relative to root (ex: "/deane.jpg")
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public static bool IsRootRelative(string input)
    {
        if(string.IsNullOrWhiteSpace(input))
        {
            return false;
        }
        return input[0] == PathDelim;
    }

    /// <summary>
    /// Returns true if path is not absolute or relative to root (ex: "deane.jpg")
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public static bool IsRelative(string input)
    {
        return !IsAbsolute(input) && !IsRootRelative(input);
    }

    /// <summary>
    /// Returns true if path is the root ("/")
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public static bool IsRoot(string input)
    {
        return CleanPath(input) == PathDelim.ToString();
    }


    /// <summary>
    /// Takes the filename from a path and converts it to a top level directory
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    /// <example>
    /// /deane/barker.html becomes /deane/barker/
    /// </example>
    public static string ConvertFilenameToDirectory(string path)
    {
        // Root paths are weird...
        if (path == PathDelim.ToString())
        {
            return PathDelim.ToString(); 
        }

        var builder = new SmartBuilder(path);
        var localPath = builder.Path;

        if (IsDefaultDocument(localPath))
        {
            builder.Path = RemoveDefaultDocument(builder.Path);
        }
        else
        {
            var directoryPath = Path.GetDirectoryName(localPath);
            var filePath = Path.GetFileNameWithoutExtension(localPath);

            // This is a special case for deanebarker.net

            // /_contact.md
            if (IsRoot(directoryPath) && filePath.StartsWith("_"))
            {
                return MakePath(Path.GetFileNameWithoutExtension(localPath).RemoveFromStart("_"));
            }

            // /deane/_deane.md
            // When the filename is the same as the enclosing directory name prefaced with an underscore, this should be treated as a default document
            if (Path.GetFileName(localPath).StartsWith("_") && GetSegments(directoryPath).LastOrDefault() == Path.GetFileNameWithoutExtension(localPath).RemoveFromStart("_"))
            {
                return CleanPath(directoryPath);
            }

            builder.Path = MakePath(directoryPath, filePath);
        }

        return builder;
    }

    /// <summary>
    /// Takes the top-level directory and converts it to a filename with the supplied extenson
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    /// <example>
    /// /deane/barker/ becomes /deane/barker.html
    /// </example>
    public static string ConvertDirectoryToFilename(string path, string extension)
    {
        // PROBLEM: We can't really do this for the root path...

        var builder = new SmartBuilder(path);
        var localPath = builder.Path;

        var segments = GetSegments(localPath);
        if(!segments.Any())
        {
            // PROBLEM: We can't really do this for the root path...
            // What do we do here?
            return null;
        }

        var fileName = new StringBuilder();
        fileName.Append(segments.Last());
        fileName.Append(".");
        fileName.Append(extension.TrimStart(".".ToCharArray()));

        segments = segments.RemoveFromEnd(1); // Remove the last directory
        segments = segments.Concat(new[] { fileName.ToString() }); // Add the filename

        builder.Path = MakePath(segments);

        return builder;
    }

    /// <summary>
    /// Default implementation. Cleans each segment, ensures trailing slash for directories, removes default documents
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    private static string DefaultPathCleaner(string input)
    {
        if (input == "/")
        {
            return "/"; // Let's just return here, because this is not getting any cleaner. Note, root paths are weird...
        }

        var builder = new SmartBuilder(input);
        builder.Path = RemoveDefaultDocument(builder.Path);
        builder.Path = MakePath(GetSegments(builder.Path).Select(CleanSegment));
        
        if (!IsFileTarget("."))
        {
            builder.Path = EnsureTrailingSlash(builder.Path);
        }
        return builder;
    }


    /// <summary>
    /// Ensures input has a trailing slash. if input is null or empty, will return just a slash.
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    private static string EnsureTrailingSlash(string input)
    {
        if(!input.HasValue())
        {
            return PathDelim.ToString();
        }

        if(input.Last() == PathDelim)
        {
            return input;
        }

        var sb = new StringBuilder(input);
        sb.Append(PathDelim);
        return sb.ToString();
    }

    /// <summary>
    /// Removes URL encoding
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public static string DecodeUrl(string input)
    {
        return WebUtility.UrlDecode(input);
    }

    /// <summary>
    /// Default implementation. Decodes, corrects slashes, trims, replaces spaces, lower-cases
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public static string DefaultSegmentCleaner(string input)
    {
        if(!input.HasValue())
        {
            return null;
        }

        input = DecodeUrl(input);
        input = FixSlashes(input);  // This might be two segments... but I'm not sure that matters

        return input.ToLower().Trim().Replace(" ", SpaceReplacement);

        // Need to handle more than one space
        // Worried that Regex is slow
    }

    /// <summary>
    /// Returns true if the last path segments contains a "."
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    public static bool IsFileTarget(string path)
    {
        var segments = GetSegments(path);
        if(segments.IsEmpty())
        {
            return false; // This is the root
        }
        return segments.Last().Contains(".");
    }

    /// <summary>
    /// Removes the last segment if it's one of the values defined in the DefaultDocuments static array
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    public static string RemoveDefaultDocument(string path)
    {
        if (!IsDefaultDocument(path))
        {
            return path; // You should have checked this before...
        }

        var segments = GetSegments(path);

        if (segments.Count() == 1)
        {
            return "/"; // Root paths are weird
        }

        return MakePath(segments.Take(segments.Count() - 1));
    }

    /// <summary>
    /// Returns true if the path is explicitly targeting a default document
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    public static bool IsDefaultDocument(string path)
    {
        if(DefaultDocuments == null)
        {
            throw new NullReferenceException("The DefaultDocuments array must be defined.");
        }

        var segments = GetSegments(path);
        if(segments.IsEmpty())
        {
            return false;
        }

        return DefaultDocuments.Contains(segments.Last());
    }

    /// <summary>
    /// Returns true if the pattern matches the pattern
    /// </summary>
    /// <param name="path"></param>
    /// <param name="pattern"></param>
    /// <returns></returns>
    public static bool IsMatch(string path, string pattern)
    {
        return Regex.IsMatch(CleanPath(path), pattern);
    }

    /// <summary>
    /// Returns true if the path matches any of the patterns
    /// </summary>
    /// <param name="path"></param>
    /// <param name="patterns"></param>
    /// <returns></returns>
    public static bool IsMatchForAny(string path, params string[] patterns)
    {
        return patterns.Any(p => IsMatch(path, p));
    }

    public static string MakeAbsolute(string input)
    {
        input = input ?? "/"; // We have to at least have a root slash

        if(IsAbsolute(input))
        {
            return input;
        }

        input = FixSlashes(input);

        var sb = new StringBuilder();
        sb.Append(DefaultScheme);
        sb.Append("://");
        sb.Append(GetHost());
        sb.Append(PathDelim);
        sb.Append(input.TrimStart(new[] { PathDelim }));
        input = sb.ToString();

        return input;
    }

    /// <summary>
    /// Returns only the relative path for whatever was passed in.
    /// </summary>
    /// <remarks>
    /// Uri is picky about what it parses; this is more tolerant.
    /// </remarks>
    /// <param name="input"></param>
    /// <param name="includeQuerystring"></param>
    /// <returns></returns>
    public static string GetRelativePath(string input, bool includeQuerystring = false)
    {
        // Just a file name...
        if(!IsAbsolute(input) && !IsRootRelative(input))
        {
            return input;
        }

        var builder = new SmartBuilder(input);
        return includeQuerystring ? builder.Uri.PathAndQuery : builder.Uri.LocalPath;
    }


    public static List<string> GetAncestralPaths(string input, bool inclusive = false)
    {
        input = CleanPath(input);

        var returnValue = new List<string>() { "/" };
        var accumulatedPaths = new List<string>(); 
        foreach (var segment in GetSegments(input))
        {
            accumulatedPaths.Add(segment);

            var thisPath = MakePath(accumulatedPaths);
            returnValue.Add(thisPath);
        }

        if(!inclusive)
        {
            returnValue.Remove(input);
        }

        return returnValue.Distinct().ToList(); // Do I need the distinct? Feels sloppy...
    }

    /// <summary>
    /// Returns true if the path is local to the DefaultHosts
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    public static bool IsLocal(string path)
    {
        if(!IsAbsolute(path))
        {
            return true;  // Relative URLs are always local
        }

        if (DefaultHosts == null)
        {
            throw new NullReferenceException("The DefaultHosts array must be defined.");
        }

        var builder = new SmartBuilder(path);
        return DefaultHosts.Contains(builder.Host);
    }

    #if !EXCLUDE_HTTPUTILS

    /// <summary>
    /// Adds a querystring argument and variable to 
    /// </summary>
    /// <param name="input"></param>
    /// <param name="key"></param>
    /// <param name="value"></param>
    /// <returns></returns>
    public static string AddQuerystringArg(string input, string key, object value)
    {
        var builder = new SmartBuilder(input);

        var query = HttpUtility.ParseQueryString(builder.Query);
        query[key] = value.ToString();
        builder.Query = query.ToString();

        return builder;
    }

    #endif

    /// <summary>
    /// Combines the passed-in strings to form a path
    /// </summary>
    /// <param name="segments"></param>
    /// <returns></returns>
    public static string MakePath(params string[] segments)
    {
        return MakePath(new List<string>(segments)); // I have to turn this into a list or else it recurses through this same function
    }

    /// <summary>
    /// Combines the elements of the supplied strings to form a path
    /// </summary>
    /// <param name="segments"></param>
    /// <returns></returns>

    public static string MakePath(IEnumerable<string> segments)
    {
        if(segments == null)
        {
            throw new ArgumentNullException(nameof(segments));
        }

        // In case any of the segments are combined segments (ex: they have a slash)
        segments = segments.SelectMany(s => GetSegments(s));

        // Special handling for the root path, so it doesn't end up with a double slash
        if (segments.IsEmpty())
        {
            return PathDelim.ToString();
        }

        var sb = new StringBuilder();
        sb.Append(PathDelim);
        segments.ToList().ForEach(s =>
        {
            if(s.StartsWith("."))
            {
                // We're adding an extension, so trim back the prior path delim
                sb.Remove(sb.Length - 1, 1);
            }

            sb.Append(s);

            // If this is a file segment, don't add a delim behind it
            if (!s.Contains("."))
            {
                sb.Append(PathDelim);
            }
        });

        return sb.ToString();
    }


    /// <summary>
    /// Combines the elements of the supplied strings to form a file path
    /// </summary>
    /// <param name="segments"></param>
    /// <returns></returns>
    public static string MakeFilePath(params string[] segments)
    {
        return MakeFilePath(new List<string>(segments)); // I have to turn this into a list or else it recurses through this same function
    }

    /// <summary>
    /// Combines the elements of the supplied strings to form a file path
    /// </summary>
    /// <param name="segments"></param>
    /// <returns></returns>
    public static string MakeFilePath(IEnumerable<string> segments)
    {
        // In case any of the segments are combined segments (ex: they have a slash)
        var segmentsList = segments.SelectMany(s => GetSegments(s)).ToList(); // We have to make this a list, because we might insert something below

        // The first segment needs to be a letter followed by a colon (this is simple and doesn't need regex...)
        var firstSegment = segmentsList.First();
        if(firstSegment.Length != 2 || !char.IsLetter(firstSegment[0]) || firstSegment[1] != Path.VolumeSeparatorChar)
        {
            // The "default drive" is whatever drive Windows is install on
            // I know, I know, Mono on Linux would be an issue...
            var defaultDriveLetter = Environment.GetFolderPath(Environment.SpecialFolder.System)[0];
            segmentsList.Insert(0, new string(new[] { defaultDriveLetter, Path.VolumeSeparatorChar }));
        }

        var path = MakePath(segmentsList);
        return path.Trim("/".ToCharArray()).Replace("/", @"\");
    }


    /// <summary>
    /// Splits a string into segments
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    public static IEnumerable<string> GetSegments(string path)
    {
        if (!path.HasValue())
        {
            return new List<string>();
        }
        path = FixSlashes(path);
        return path.Split(PathDelim).RemoveEmptyStrings();
    }

    /// <summary>
    /// Corrects backslashes to the path delim (which should be a forward slash)
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public static string FixSlashes(string input)
    {
        return input?.Replace('\\', PathDelim);
    }

    /// <summary>
    /// Adds a segment to the end of an existing path
    /// </summary>
    /// <param name="path"></param>
    /// <param name="newSegment"></param>
    /// <returns></returns>
    public static string AddSegments(string path, params string[] newSegments)
    {
        var segments = GetSegments(path).ToList();
        newSegments.ToList().ForEach(segments.Add);
        return MakePath(segments);
    }

    /// <summary>the last segment
    /// </summary>
    /// <param name="path"></param>
    /// <param name="newSegment"></param>
    /// <returns></returns>
    public static string RemoveLastSegment(string path)
    {
        return RemoveSegments(path, 1);
    }

    /// <summary>
    /// Removes a specified number of segments from the end of the path
    /// </summary>
    /// <param name="path"></param>
    /// <param name="newSegment"></param>
    /// <returns></returns>
    public static string RemoveSegments(string path, int segmentsToRemove)
    {
        var segments = GetSegments(path).RemoveFromEnd(segmentsToRemove);
        return MakePath(segments);
    }

    /// <summary>
    /// Removes a smaller path from the start of a larger path
    /// </summary>
    /// <remarks>
    /// The larger path MUST start with the smaller path. It will only remove the beginning segments as they match
    /// </remarks>
    /// <example>
    /// RemoveFromStart("/deane/was/here", "/deane"); // Returns "/was/here"
    /// RemoveFromStart("/deane/was/here", "/annie"); // Removes nothing, because the larger path doesn't start with "/annie/"
    /// </example>
    ///         /// <param name="sourcePath"></param>
    /// <param name="prefixPath"></param>
    /// <returns></returns>
    public static string RemoveFromStart(string sourcePath, string prefixPath)
    {
        var builder = new SmartBuilder(sourcePath);
        var localPath = builder.Path;

        var sourceSegments = GetSegments(localPath);
        var prefixSegments = GetSegments(prefixPath);

        builder.Path = MakePath(sourceSegments.RemoveMatchFromStart(prefixSegments));

        return builder;
    }
    
    /// <summary>
    /// Returns a filepath to put a file on the desktop of the current user
    /// </summary>
    /// <param name="fileName"></param>
    /// <returns></returns>
    public static string GetDesktopPath(string fileName)
    {
        var desktopFilePath = Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory);
        if(desktopFilePath == null)
        {
            throw new InvalidOperationException("Unable to locate desktop.");
        }
        return MakeFilePath(desktopFilePath, fileName);
    }
}

/// <summary>
/// Extends UriBuilder to remember if the original string was absolute or not, then returns absolute or relative based on that
/// </summary>
internal class SmartBuilder : UriBuilder
{
    public bool SourceWasAbsolute { get; }

    public SmartBuilder(string input) : base()
    {
        SourceWasAbsolute = PathUtils.IsAbsolute(input);
        if (!SourceWasAbsolute)
        {
            input = PathUtils.MakeAbsolute(input);
        };

        var uri = new Uri(input); // This should do the parsing
        Scheme = uri.Scheme;
        Host = uri.Host;
        Path = uri.LocalPath;
        Query = uri.Query?.TrimStart("?".ToCharArray()); // I don't know why Uri leaves the question mark on here...
    }

   
    public string ToValue()  // I can't override ToString because PathAndQuery apparently calls ToString, which ends up recursive
    {
        return SourceWasAbsolute ? Uri.AbsoluteUri : Uri.PathAndQuery;
    }

    public static implicit operator string(SmartBuilder sb) { return sb.ToValue(); }
}

