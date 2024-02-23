namespace Melodiy.Application.Common.Extensions;

public static class ListExtensions
{
    public static List<T> Shuffle<T>(this List<T>? list)
    {
        if (list == null) return new List<T>();

        for (int i = list.Count - 1; i > 0; i--)
        {
            var rnd = new Random();
            var k = rnd.Next(i + 1);
            (list[k], list[i]) = (list[i], list[k]);
        }

        return list;
    }

    public static void MoveToFirst<T>(this List<T> list, int index)
    {
        var item = list[index];
        for (int i = index; i > 0; i--)
        {
            list[i] = list[i - 1];
        }

        list[0] = item;
    }
}
