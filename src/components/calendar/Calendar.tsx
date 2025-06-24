"use client";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import Members from "./Members/Members";

dayjs.extend(isToday);

const Calendar = () => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [currentWeekStart, setCurrentWeekStart] = useState(dayjs("2025-10-27"));

	const generateWeekDays = (startDate: dayjs.Dayjs) => {
		const days = [];
		for (let i = 0; i < 14; i++) {
			days.push(startDate.add(i, "day"));
		}
		return days;
	};

	const navigateWeek = (direction: "prev" | "next") => {
		const newDate = currentWeekStart.add(direction === "next" ? 7 : -7, "day");
		setCurrentWeekStart(newDate);
	};

	const goToToday = () => {
		const today = dayjs().startOf("week");
		setCurrentWeekStart(today);
	};

	const scrollLeft = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
		}
	};

	const getMonthYear = () => {
		const endDate = currentWeekStart.add(13, "day");

		if (currentWeekStart.month() === endDate.month()) {
			return currentWeekStart.format("MMMM YYYY");
		} else {
			return `${currentWeekStart.format("MMM")} - ${endDate.format("MMM YYYY")}`;
		}
	};

	const weekDays = generateWeekDays(currentWeekStart);

	return (
		<div className="min-h-screen text-black">
			<div className="flex items-center justify-between p-4">
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => navigateWeek("prev")}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<span className="min-w-[200px] text-center text-sm">
						{getMonthYear()}
					</span>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => navigateWeek("next")}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
				<Button variant="ghost" size="sm" onClick={goToToday}>
					Today
				</Button>
			</div>

			<div className="flex">
				<Members />

				<div className="flex-1 overflow-hidden">
					<div className="p-2">
						<div className="flex items-center gap-2">
							<Button variant="ghost" size="sm" onClick={scrollLeft}>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button variant="ghost" size="sm" onClick={scrollRight}>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
					<div className="scrollbar-hide overflow-x-auto" ref={scrollRef}>
						<div className="sticky top-0 z-10">
							<div className="flex">
								{weekDays.map((day, index) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: Using index as key for simplicity, assuming no reordering
										key={index}
										className="w-[120px] min-w-[120px] flex-shrink-0 border-black border-r p-2 text-center last:border-r-0"
									>
										<div className="text-black text-xs">
											{day.format("ddd")} {day.format("D")}
										</div>
										<div className="text-black text-xs">
											{day.format("MMM")}
										</div>
										{day.isToday() && (
											<div className="font-semibold text-white text-xs">
												Today
											</div>
										)}
									</div>
								))}
							</div>
						</div>

						<div className="flex">
							{weekDays.map((_, dayIndex) => (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: Using dayIndex as key for simplicity, assuming no reordering
									key={dayIndex}
									className="w-[120px] min-w-[120px] flex-shrink-0 border-black border-t border-r last:border-r-0"
								>
									<div className="relative h-24 border-black border-b p-1" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calendar;
