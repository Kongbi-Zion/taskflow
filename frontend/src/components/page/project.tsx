"use client";
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Task from "../ui/task";

interface Item {
  id: string;
  title: string;
  description: string;
  value: string;
}

interface Columns {
  [key: string]: Item[];
}

const initialData: Columns = {
  todo: [
    {
      id: "1",
      title: "Profile picture",
      description: "Today's Money",
      value: "Today",
    },
    {
      id: "2",
      title: "Invoice",
      description: "Pending Payments",
      value: "Week",
    },
  ],
  onprogress: [
    { id: "3", title: "Sales", description: "Monthly Revenue", value: "Month" },
  ],
  completed: [
    {
      id: "4",
      title: "Subscribers",
      description: "New Signups",
      value: "Year",
    },
  ],
};

const ProjectComponent: React.FC = () => {
  const [updateTask, setUpdateTask] = useState(false);
  const [currentTask, setCurretTask] = useState({});

  console.log("projectId: ");

  const [columns, setColumns] = useState<Columns>(initialData);

  const handleItemMoved = (destinationDivId: string) => {
    console.log(`Item moved to div: ${destinationDivId}`);
  };

  const handleItemReordered = (divId: string) => {
    console.log(`Items shuffled within div: ${divId}`);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceList = [...columns[source.droppableId]];
    const destList = [...columns[destination.droppableId]];

    const [movedItem] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, movedItem);

    setColumns({
      ...columns,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    });

    if (source.droppableId === destination.droppableId) {
      handleItemReordered(source.droppableId);
    } else {
      handleItemMoved(destination.droppableId);
    }
  };

  return (
    <div className="w-full h-screen pb-32 overflow-y-auto overflow-x-hidden">
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className="w-full gap-3 h-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4"
          suppressHydrationWarning
        >
          {Object.keys(columns).map((colId) => (
            <Droppable key={colId} droppableId={colId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-full p-2"
                >
                  <h4 className="capitalize text-lg font-bold mb-5 text-primary-shade-500 dark:text-primary-shade-700">
                    {colId}
                  </h4>
                  <div className="w-full">
                    {columns[colId].map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="relative flex flex-col min-w-0 mb-6 break-words bg-secondry-background dark:bg-secondry-background-dark shadow-soft-xl dark:shadow-soft-dark-xl rounded-xl bg-clip-border"
                          >
                            <div className="flex-auto p-4">
                              <div className="flex flex-wrap -mx-3">
                                <div className="flex-none w-2/3 max-w-full px-3">
                                  <div>
                                    <p className="mb-0 font-sans dark:text-gray-200 font-semibold leading-normal text-sm dark:opacity-60">
                                      {item.title}
                                    </p>
                                    <h5 className="mb-0 font-bold dark:text-white">
                                      Today
                                    </h5>
                                  </div>
                                </div>
                                <div className="w-4/12 max-w-full px-3 text-right flex-0">
                                  <div
                                    onClick={() => {
                                      setUpdateTask(true);
                                      setCurretTask(item);
                                    }}
                                    className="inline-flex cursor-pointer w-12 h-12 text-center text-white items-center justify-center rounded-lg bg-gradient-to-tl from-primary-shade-700 to-primary-shade-500 shadow-soft-2xl"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      className="h-8 w-8"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M10.96 21q-.349 0-.605-.229q-.257-.229-.319-.571l-.263-2.092q-.479-.145-1.036-.454q-.556-.31-.947-.664l-1.915.824q-.317.14-.644.03t-.504-.415L3.648 15.57q-.177-.305-.104-.638t.348-.546l1.672-1.25q-.045-.272-.073-.559q-.03-.288-.03-.559q0-.252.03-.53q.028-.278.073-.626l-1.672-1.25q-.275-.213-.338-.555t.113-.648l1.06-1.8q.177-.287.504-.406t.644.021l1.896.804q.448-.373.97-.673q.52-.3 1.013-.464l.283-2.092q.061-.342.318-.571T10.96 3h2.08q.349 0 .605.229q.257.229.319.571l.263 2.112q.575.202 1.016.463t.909.654l1.992-.804q.318-.14.645-.021t.503.406l1.06 1.819q.177.306.104.638t-.348.547L18.36 10.92q.082.31.092.569t.01.51q0 .233-.02.491q-.019.259-.088.626l1.69 1.27q.275.213.358.546t-.094.638l-1.066 1.839q-.176.306-.513.415q-.337.11-.654-.03l-1.923-.824q-.467.393-.94.673t-.985.445l-.264 2.111q-.061.342-.318.571t-.605.23zm.04-1h1.956l.369-2.708q.756-.2 1.36-.549q.606-.349 1.232-.956l2.495 1.063l.994-1.7l-2.189-1.644q.125-.427.166-.786q.04-.358.04-.72q0-.38-.04-.72t-.166-.747l2.227-1.683l-.994-1.7l-2.552 1.07q-.454-.499-1.193-.935q-.74-.435-1.4-.577L13 4h-1.994l-.312 2.689q-.756.161-1.39.52q-.633.358-1.26.985L5.55 7.15l-.994 1.7l2.169 1.62q-.125.336-.175.73t-.05.82q0 .38.05.755t.156.73l-2.15 1.645l.994 1.7l2.475-1.05q.589.594 1.222.953q.634.359 1.428.559zm.973-5.5q1.046 0 1.773-.727T14.473 12t-.727-1.773t-1.773-.727q-1.052 0-1.776.727T9.473 12t.724 1.773t1.776.727M12 12"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {updateTask && (
        <Task
          closeModal={() => setUpdateTask(false)}
          edit={true}
          currentTask={currentTask}
        />
      )}
    </div>
  );
};

export default ProjectComponent;
