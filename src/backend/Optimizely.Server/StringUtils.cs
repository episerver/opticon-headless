using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Policy;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace Optimizely.Server;

public static class StringUtils
{
    public const string REGEX_NUMBER = "[0-9.,]+";


    /// <summary>
    /// Returns the substring prior to the first occurence of a specified character
    /// </summary>
    /// <param name="input"></param>
    /// <param name="delim"></param>
    /// <param name="returnInputWhenNoDelim"></param>
    /// <returns></returns>
    public static string GetBeforeFirstOccurence(this string input, char delim, bool returnInputWhenNoDelim = true)
    {
        var containsDelim = input.Contains(delim);
        var parts = input.Split(delim);

        if (containsDelim || returnInputWhenNoDelim)
        {
            return parts.First();
        }

        return null;
    }

    /// <summary>
    /// Returns the substring after the last occurence of a specified character
    /// </summary>
    /// <param name="input"></param>
    /// <param name="delim"></param>
    /// <param name="returnInputWhenNoDelim"></param>
    /// <returns></returns>
    public static string GetAfterLastOccurence(this string input, char delim, bool returnInputWhenNoDelim = true)
    {
        var containsDelim = input.Contains(delim);
        var parts = input.Split(delim);

        if (containsDelim || returnInputWhenNoDelim)
        {
            return parts.Last();
        }

        return null;
    }

    /// <summary>
    /// Removes a prefix string from the start of the input string
    /// </summary>
    /// <param name="input"></param>
    /// <param name="prefix"></param>
    /// <returns></returns>
    public static string RemoveFromStart(this string input, string prefix, bool caseSensitive = true)
    {
        if(!input.StartsWith(prefix, caseSensitive ? StringComparison.Ordinal : StringComparison.OrdinalIgnoreCase))
        {
            return input;
        }

        return input.Substring(prefix.Count());
    }

    public static string RemoveFromEnd(this string input, string suffix, bool caseSensitive = true)
    {
        input = string.Join(string.Empty, input.Reverse());
        suffix = string.Join(string.Empty, suffix.Reverse());

        input = input.RemoveFromStart(suffix, caseSensitive);

        return string.Join(string.Empty, input.Reverse());
    }

    /// <summary>
    /// Returns true is the string is non-null and non-whitespace
    /// </summary>
    /// <param name="input"></param>
    /// <param name="prefix"></param>
    /// <returns></returns>
    public static bool HasValue(this string input)
    {
        return !string.IsNullOrWhiteSpace(input);
    }

    /// <summary>
    /// Counts the number of times a character appears in a string
    /// </summary>
    /// <param name="input"></param>
    /// <param name="character"></param>
    /// <returns></returns>
    public static int CountOccurences(this string input, char character)
    {
        return input.Count(c => c == character);
    }

    /// <summary>
    /// The number of times a substring appears in a larger string
    /// </summary>
    /// <remarks>
    /// Stolen from StackOverflow.
    /// </remarks>
    /// <param name="text"></param>
    /// <param name="pattern"></param>
    /// <param name="caseSensitive"></param>
    /// <returns></returns>
    public static int CountOccurences(this string text, string pattern, bool caseSensitive = true)
    {
        if(!caseSensitive)
        {
            text = text.ToLower();
            pattern = pattern.ToLower();
        }

        var count = 0;
        var i = 0;
        while ((i = text.IndexOf(pattern, i)) != -1)
        {
            i += pattern.Length;
            count++;
        }
        return count;
    }

    /// <summary>
    /// Returns an MD5 hash for the supplied string
    /// </summary>
    /// <remarks>
    /// Stolen from StackOverflow.
    /// </remarks>
    /// <param name="input"></param>
    /// <returns></returns>
    public static string ToMD5Hash(this string input)
    {
        using (MD5 md5 = MD5.Create())
        {
            var inputBytes = Encoding.ASCII.GetBytes(input);
            var hashBytes = md5.ComputeHash(inputBytes);

            var sb = new StringBuilder();
            for (int i = 0; i < hashBytes.Length; i++)
            {
                sb.Append(hashBytes[i].ToString("X2"));
            }
            return sb.ToString();
        }
    }

    /// <summary>
    /// Returns a string safe for file naming on the host system
    /// </summary>
    /// <param name="input"></param>
    /// <param name="slashReplacement">An optional character to replace slashes (forward or back) prior to string cleaning</param>
    /// <param name="spaceReplacement">An optional character to replace spaces prior to string cleaning</param>
    /// <returns></returns>
    public static string ToSafeFilename(this string input, char slashReplacement = '.', char spaceReplacement = ' ')
    {
        input = RemoveDiacritics(input);
        input = input.Replace('/', slashReplacement);
        input = input.Replace('\\', slashReplacement);
        input = input.Replace(' ', spaceReplacement);

        return new string(input.Where(c => !Path.GetInvalidFileNameChars().Contains(c)).ToArray());
    }


    /// <summary>
    /// Returns a collection of individual lines from the supplied string
    /// </summary>
    /// <param name="input"></param>
    /// <param name="removeBlank"></param>
    /// <returns></returns>
    public static IEnumerable<string> ToLines(this string input, bool removeBlank = false)
    {
        var lines = input.Split(Environment.NewLine.ToCharArray());
        return removeBlank ? lines.RemoveEmptyStrings() : lines;
    }

    /// <summary>
    /// Returns a string of the input collection joined on a new line
    /// </summary>
    /// <param name="input"></param>
    /// <param name="removeBlank"></param>
    /// <returns></returns>
    public static string CombineLines(this IEnumerable<string> input)
    {
        return string.Join(Environment.NewLine, input);
    }

    public static string Quoted(this string input)
    {
        input = input ?? string.Empty; // Ensure no nulls...
        return string.Concat("\"", input.Replace("\"", "'"), "\"");
    }

    public static string GetSortValue(this string input)
    {
        var invalidPrefixes = new[]
            {
                "the ",
                "a ",
                "an "
            };

        input = input.ToLower();

        input = RemoveDiacritics(input);

        foreach (var invalidPrefix in invalidPrefixes)
        {
            input = input.RemoveFromStart(invalidPrefix);
        }

        // Replace numbers with left-padding equivalents
        foreach (Match numericSequence in Regex.Matches(input, "[0-9]+"))
        {
            input = input.Replace(numericSequence.Value, numericSequence.Value.PadLeft(10, '0'));
        }

        // Changed 2022-6-26 to retain spaces; found a sort bug that proved spaces count
        // Big Secrets => bigsecrets
        // Bigger Secrets = biggersecrets
        // "Big Secrets should be first, because the space after "Big" should come before the second "g" in "bigger"
        // If we remove the spaces, the 3rd and 4th characters are now "gs" which sorts after "gg"
        // 3rd and 4th characters should be "g " which sorts before "gg"
        return new string(input.Where(c => c == ' ' || char.IsLetterOrDigit(c)).ToArray());
    }

    public static string ConvertToSimpleText(this string input)
    {
        input = HttpUtility.HtmlDecode(input);

        // Correct spacing around em-dashes
        input = Regex.Replace(input, @"(\S)--(\S)", "$1 -- $2");
        input = Regex.Replace(input, @" --(\S)", " -- $1");
        input = Regex.Replace(input, @"(\S)-- ", "$1 -- ");

        input = Regex.Replace(input, " {2,100}", " "); // Replace multiple spaces with one space
        input = input.Replace("–", " -- ");
        input = input.Replace("—", " -- ");
        input = input.Replace("—", " -- "); // Is this the same as above? I don't know...
        input = input.Replace("“", "\"");
        input = input.Replace("”", "\"");
        input = input.Replace("’", "'");
        input = input.Replace("‘", "'");
        input = input.Replace("> ", ">");
        input = input.Replace("…", "...");

        return input;
    }

    public static long ExtractNumberFromString(string input, int defaultValue = -1)
    {
        if (input == null)
        {
            return defaultValue;
        }

        var numbers = string.Join(string.Empty, input.Where(c => char.IsNumber(c)));
        if (numbers.Length == 0)
        {
            return defaultValue;
        }

        return long.Parse(numbers);
    }


    public static bool IsDollarAmount(this string input)
    {
        return input.Length >= 2 && input[0] == '$' && IsNumber(input.RemoveFromStart("$"));
    }

    public static bool IsHashTag(this string input)
    {
        // 1. More than 2 chars
        // 2. Contains "#"
        // 3. All characters prior to the "#" are non-letters or digits (handles leading punctutation)
        return input.Length >= 2 && input.Contains("#") && input.Substring(0, input.IndexOf('#') + 1).All(c => !char.IsLetterOrDigit(c));
    }

    public static bool IsNumber(this string input)
    {
        return decimal.TryParse(input, out decimal _);
    }

    public static bool IsHandleOrReference(this string input)
    {
        return input.Length > 0 && input[0] == '@';
    }

    public static bool IsSubredditName(this string input)
    {
        return input.ToLower().StartsWith("/r/");
    }

    // Stolen from https://stackoverflow.com/questions/249087/how-do-i-remove-diacritics-accents-from-a-string-in-net
    public static string RemoveDiacritics(this string text)
    {
        var normalizedString = text.Normalize(NormalizationForm.FormD);
        var stringBuilder = new StringBuilder(capacity: normalizedString.Length);

        for (int i = 0; i < normalizedString.Length; i++)
        {
            char c = normalizedString[i];
            var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
            if (unicodeCategory != UnicodeCategory.NonSpacingMark)
            {
                stringBuilder.Append(c);
            }
        }

        return stringBuilder
            .ToString()
            .Normalize(NormalizationForm.FormC);
    }

}
