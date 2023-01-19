import React from "react";
import { Post } from "../../dto/Post";

function groupBy<T>(array: T[], key: keyof T, valueResolver?: (value: string) => string) {
    return array.reduce<Record<string, T[]>>((acc, item) => {
        let groupingValue = item[key] as string;
        if (valueResolver) {
            groupingValue = valueResolver(groupingValue);
        }
        acc[groupingValue] = [...(acc[groupingValue] || []), item];
        return acc;
    }, {});
}

type UserStatistics = {
    postsTotalCount: number;
    postCharactersMedian: number;
    postsPerMonth: Record<string, number>;
    longestPost: string;
};

type Props = {
    posts: Post[];
};

const Dashboard = ({ posts }: Props) => {
    const postsGroupedByUser = groupBy<Post>(posts, "from_id");
    const statisticsPerUser: Record<string, UserStatistics> = {};
    for (const userId in postsGroupedByUser) {
        postsGroupedByUser[userId].sort((a, b) => a.message.length - b.message.length);
        const postsLength = postsGroupedByUser[userId].length;
        const postsHalfLength = Math.floor(postsGroupedByUser[userId].length / 2);
        const postsGroupedByMonth = groupBy<Post>(postsGroupedByUser[userId], "created_time", (datetime) =>
            new Date(datetime).toLocaleDateString("en-US", { month: "long" }));
        const postsPerMonth: UserStatistics["postsPerMonth"] = {};
        for (const month in postsGroupedByMonth) {
            postsPerMonth[month] = postsGroupedByMonth[month].length;
        }

        statisticsPerUser[userId] = {
            postsTotalCount: postsLength,
            postCharactersMedian: postsGroupedByUser[userId][postsHalfLength].message.length,
            postsPerMonth,
            longestPost: postsGroupedByUser[userId][postsLength - 1].message,
        };
    }

    return (
        <ul>
            {Object.keys(statisticsPerUser).map(userId => (
                <li key={userId}>
                    <strong>{userId}</strong>
                    <div>postsTotalCount: <strong>{statisticsPerUser[userId].postsTotalCount}</strong></div>
                    <div>postCharactersMedian: <strong>{statisticsPerUser[userId].postCharactersMedian}</strong></div>
                    <ul>postsPerMonth: {Object.keys(statisticsPerUser[userId].postsPerMonth).map(month => (
                        <li key={month}>
                            <div>{month}: <strong>{statisticsPerUser[userId].postsPerMonth[month]}</strong></div>
                        </li>
                    ))}</ul>
                    <div>longestPost: {statisticsPerUser[userId].longestPost}</div>
                </li>
            ))}
        </ul>
    );
};

export default Dashboard;
