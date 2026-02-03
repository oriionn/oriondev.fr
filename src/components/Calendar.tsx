import { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";

export type Activity = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4; };

export function GithubCalendar({ months }: { months: string[] }) {
    const [data, setData] = useState<Activity[] | null>(null);

    useEffect(() => {
        fetch(`https://github-contributions-api.jogruber.de/v4/oriionn?y=${new Date().getFullYear()}`)
            .then((res) => res.json())
            .then((json) => setData(json.contributions));
    }, []);

    if (!data) return null;

    return (
        <ActivityCalendar
            data={data}
            maxLevel={4}
            colorScheme="light"
            className="calendar"
            showColorLegend={false}
            showTotalCount={false}
            labels={{
                months
            }}
        />
    );
}
