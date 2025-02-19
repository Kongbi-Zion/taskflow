"use client";
import React, { useEffect, useState } from "react";
import { DashboardLayoutProps } from "@/utils/types";
import Link from "next/link";
import AddFloatingButtonWithModal from "../../components/ui/floatingbutton";
import NewProject from "../../components/ui/project";
import Task from "../../components/ui/task";
import { usePathname } from "next/navigation";
import NaveItems from "../../components/ui/navitmes";
import { useTasks } from "@/context/TaskContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { editTask, currentTask, resetCurrentTask, resetEditTask } = useTasks();
  const { user } = useAuth();
  const pathname = usePathname();
  const [newProject, setNewProject] = useState(false);
  const [newTask, setTask] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    } else {
      setIsLoading(false);
    }
  }, [router, user]);

  if (isLoading) {
    return null;
  }

  const handleNewProjectOrTask = (type: string) => {
    console.log(`${type} has been created.`);
    if (type == "New Project") {
      setNewProject(true);
    } else {
      setTask(true);
    }
  };
  const handleCloseModal = () => {
    resetCurrentTask();
    resetEditTask();
    setNewProject(false);
    setTask(false);
  };

  const projects = [
    { id: 1, title: "Project One" },
    { id: 2, title: "Project Two" },
  ];

  return (
    <main className="h-screen w-full text-black dark:text-gray-100 relative">
      <div className="w-full h-full md:flex bg-white dark:bg-dark-background transition-all ease-in-out duration-700">
        <div
          className={`bg-secondry-background overflow-hidden h-full dark:bg-secondry-background-dark p-5 transition-all ease-in-out duration-700 ${
            pathname != "/"
              ? "max-md:hidden md:w-[500px]"
              : "w-full md:w-[500px]"
          }`}
        >
          <div className="flex justify-between items-center gap-3 text-gray-300">
            <h3 className="text-gray-800 dark:text-gray-300 text-2xl font-bold">
              TaskFlow
            </h3>
            <div className=" md:hidden">
              <NaveItems />
            </div>
          </div>

          <div className="px-3 py-4 h-fit">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href="/project/all"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m12 16.102l-3.63 2.192q-.16.079-.297.064q-.136-.016-.265-.094q-.13-.08-.196-.226t-.012-.319l.966-4.11l-3.195-2.77q-.135-.11-.178-.263t.019-.293t.165-.23q.104-.087.28-.118l4.216-.368l1.644-3.892q.068-.165.196-.238T12 5.364t.288.073t.195.238l1.644 3.892l4.215.368q.177.03.281.119q.104.088.166.229q.061.14.018.293t-.178.263l-3.195 2.77l.966 4.11q.056.171-.011.318t-.197.226q-.128.08-.265.095q-.136.015-.296-.064z"
                    />
                  </svg>
                  <span className="ms-3">All</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/project/today"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m12 16.102l-3.63 2.192q-.16.079-.297.064q-.136-.016-.265-.094q-.13-.08-.196-.226t-.012-.319l.966-4.11l-3.195-2.77q-.135-.11-.178-.263t.019-.293t.165-.23q.104-.087.28-.118l4.216-.368l1.644-3.892q.068-.165.196-.238T12 5.364t.288.073t.195.238l1.644 3.892l4.215.368q.177.03.281.119q.104.088.166.229q.061.14.018.293t-.178.263l-3.195 2.77l.966 4.11q.056.171-.011.318t-.197.226q-.128.08-.265.095q-.136.015-.296-.064z"
                    />
                  </svg>
                  <span className="ms-3">Today</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/project/tomorrow"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M5.616 21q-.691 0-1.153-.462T4 19.385V6.615q0-.69.463-1.152T5.616 5h1.769V2.77h1.077V5h7.154V2.77h1V5h1.769q.69 0 1.153.463T20 6.616v12.769q0 .69-.462 1.153T18.384 21zm0-1h12.769q.23 0 .423-.192t.192-.424v-8.768H5v8.769q0 .23.192.423t.423.192"
                    />
                  </svg>
                  <span className="ms-3">Tomorrow</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/project/upcoming"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M14.885 18q-.877 0-1.496-.62t-.62-1.495t.62-1.497t1.496-.619t1.496.62t.619 1.496t-.62 1.496t-1.495.619m-9.27 3q-.69 0-1.152-.462T4 19.385V6.615q0-.69.463-1.152T5.616 5h1.769V2.77h1.077V5h7.154V2.77h1V5h1.769q.69 0 1.153.463T20 6.616v12.769q0 .69-.462 1.153T18.384 21zm0-1h12.77q.23 0 .423-.192t.192-.424v-8.768H5v8.769q0 .23.192.423t.423.192"
                    />
                  </svg>
                  <span className="ms-3">Upcoming</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="px-3 py-4 h-fit">
            <div className="flex justify-between items-center gap-3 text-gray-300">
              <h3 className="text-gray-800 dark:text-gray-300 text-xl font-bold">
                Tasks
              </h3>
            </div>
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/project/${project.id}`}
                    className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 dark:text-white group"
                  >
                    <svg
                      className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 17 20"
                    >
                      <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z" />
                    </svg>
                    <span className="ms-3">{project.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={`bg-transparent h-full overflow-hidden transition-all ease-in-out duration-700  ${
            pathname === "/" ? "w-0 md:w-full" : "w-full"
          }`}
        >
          <div className="h-16 p-4 bg-white dark:bg-dark-background flex items-center justify-between gap-3 text-gray-300">
            <h3 className="text-gray-800 dark:text-gray-300 text-lg font-bold capitalize flex items-center">
              {pathname != "/" && (
                <Link href="/" className="mr-2 md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m6.523 12.5l3.735 3.735q.146.146.153.344q.006.198-.153.363q-.166.166-.357.168t-.357-.162l-4.382-4.383q-.243-.242-.243-.565t.243-.566l4.382-4.382q.147-.146.347-.153q.201-.007.367.159q.16.165.162.353q.003.189-.162.354L6.523 11.5h12.38q.214 0 .358.143t.143.357t-.143.357t-.357.143z"
                    />
                  </svg>
                </Link>
              )}
              {pathname.split("/")[1] === "profile"
                ? pathname.split("/")
                : "Project"}
            </h3>
            <NaveItems />
          </div>

          {children}
        </div>
      </div>

      {newProject && <NewProject closeModal={handleCloseModal} />}
      {(newTask || editTask) && (
        <Task
          edit={editTask}
          currentTask={currentTask}
          closeModal={handleCloseModal}
        />
      )}

      {pathname != "/profile" && (
        <AddFloatingButtonWithModal
          onCreate={handleNewProjectOrTask}
          disabled={newProject || newTask}
        />
      )}
    </main>
  );
};

export default React.memo(DashboardLayout);
