import React from "react";
import moment from "moment";
import styled from "styled-components";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 1px;
  background-color: #4d4c4d;
`;

const CellWrapper = styled.div`
  min-height: 80px;
  min-width: 140px;
  background-color: ${(props) => (props.isWeekday ? "#27282A" : "#1E1F21")};
  color: #dddddd;
`;

const RowInCell = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
`;

const DayWrapper = styled.div`
  height: 31px;
  width: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px; ;
`;

const CurrentDay = styled("div")`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TaskDay = styled("div")`
  height: 100%;
  width: 100%;
  background: blue;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarGrid = ({ startDay, tasks }) => {
  const totalDays = 42;
  const day = startDay.clone().subtract(1, "day");
  const daysMap = [...Array(totalDays)].map(() => day.add(1, "day").clone());

  console.log(tasks);
  const isCurrentDay = (day) => moment().isSame(day, "day");
  const isTaskDay = (day) =>
    tasks
      .filter((task) => task)
      .filter((task) => {
        console.log(task);
        return moment(task).isSame(day, "day");
      }).length > 0;
  // console.log(daysMap)
  return (
    <GridWrapper>
      {daysMap.map((dayItem) => (
        <CellWrapper
          isWeekday={dayItem.day() === 6 || dayItem.day() === 0}
          key={dayItem.unix()}
        >
          <RowInCell justifyContent={"flex-end"}>
            <DayWrapper>
              {isTaskDay(dayItem) && <TaskDay>{dayItem.format("D")}</TaskDay>}
              {!isTaskDay(dayItem) &&
                !isCurrentDay(dayItem) &&
                dayItem.format("D")}
              {!isTaskDay(dayItem) && isCurrentDay(dayItem) && (
                <CurrentDay>{dayItem.format("D")}</CurrentDay>
              )}
            </DayWrapper>
          </RowInCell>
        </CellWrapper>
      ))}
    </GridWrapper>
  );
};

export { CalendarGrid };
