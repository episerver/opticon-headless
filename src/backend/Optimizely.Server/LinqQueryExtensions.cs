using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Optimizely.Server;

public static class LinqQueryExtensions
{
		/// <summary>
		/// Takes a small enumerable and removes everything from the start of the source that matches.
		/// </summary>
		/// <example>
		/// new[] { 1,2,3,4 }.ToList().RemoveMatchFromStart(new[] {1,2});  // Result is 3,4; 1,2 were removed from the start
		/// </example>
		/// <typeparam name="T"></typeparam>
		/// <param name="source"></param>
		/// <param name="prefix"></param>
		/// <returns></returns>
		public static IEnumerable<T> RemoveMatchFromStart<T>(this IEnumerable<T> source, IEnumerable<T> prefix)
		{
			if (prefix.Count() > source.Count())
			{
				// If the prefix is longer that the source, then it will negate ALL members by definition
				return Enumerable.Empty<T>();
			}

			if(prefix.Count() == 0)
			{
				// There's nothing to check
				return source;
			}

			var sourceList = source.ToList();
			var prefixList = prefix.ToList();

			var i = 0;
			for (; i < prefix.Count(); i++)
			{
				if (!sourceList[i].Equals(prefixList[i]))
				{
					break;
				}
			}

			return sourceList.Skip(i);
		}

		/// <summary>
		/// Removes null objects from the source
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="source"></param>
		/// <returns></returns>
		public static IEnumerable<T> RemoveNullObjects<T>(this IEnumerable<T> source)
		{
			return source.Where(i => i != null);
		}

		/// <summary>
		/// Removes empty strings from the source
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="source"></param>
		/// <returns></returns>
		public static IEnumerable<string> RemoveEmptyStrings(this IEnumerable<string> source)
		{
			return source.Where(i => !string.IsNullOrWhiteSpace(i));
		}

		/// <summary>
		/// Returns true if the enumerable has no elements
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="source"></param>
		/// <returns></returns>
		public static bool IsEmpty(this IEnumerable<object> source)
		{
			return source.Count() == 0;
		}

		/// <summary>
		/// Removes the specified number of items from the end of the enumerable
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="source"></param>
		/// <param name="count"></param>
		/// <returns></returns>
		public static IEnumerable<T> RemoveFromEnd<T>(this IEnumerable<T> source, int count)
		{
			if (count == 0)
			{
				return source;
			}
			return source.Take(source.Count() - count);
		}

	}
