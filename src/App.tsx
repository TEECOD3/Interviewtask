import { useMemo, useState } from "react";
import { Spinners3DotsBounce } from "./components/loader";

function App() {
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState<number>();
  const [error, setError] = useState<string | null>("");
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const numberCheckRegex = /[0-9]/;
  const uppercaseCheckRegex = /[A-Z]/;
  const FilteredUncompletedTodos = useMemo(() => {
    return todos.filter((todo) => !todo.completed);
  }, [todos]);

  console.log(FilteredUncompletedTodos);

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !password ||
      !numberCheckRegex.test(password) ||
      !uppercaseCheckRegex.test(password) ||
      password.length <= 8
    ) {
      setError("invalid input");
      return;
    }
    setError(null);
    setloading(true);

    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${number}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setloading(false));
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-zinc-20 0">
      <div className="w-[80%] mx-auto bg-yellow-100/50 shadow-xl border-[1px] border-yellow-300 min-h-[80vh] rounded-xl flex text-center flex-col lg:flex-row gap-y-4">
        <div className="w-full">
          <h1 className="font-medium text-2xl lg:text-4xl text-gray-600 mb-6 mt-20  capitalize">
            Todo filter app
          </h1>

          {error && <p className="text-red-500">{error}</p>}
          <form
            className=" w-[90%]  mx-auto flex flex-col gap-y-8"
            onSubmit={handlesubmit}
          >
            <input
              className="p-4 rounded-md bg-blue-50 placeholder:text-sm placeholder:text-muted-foreground outline-1 outline-sky-300"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="number"
              className="p-4 rounded-md bg-blue-50 placeholder:text-sm placeholder:text-muted-foreground outline-1 outline-sky-300"
              placeholder="Enter a number"
              onChange={(e) => {
                setNumber(Number(e.target.value));
              }}
            />

            <button className="p-4 bg-blue-400 text-white rounded-md">
              {loading ? "loading..." : "Submit"}
            </button>
          </form>
        </div>
        <div className="w-full py-10 flex flex-col gap-y-2 h-[80%] overflow-y-scroll px-2">
          <h2 className="text-2xl capitalize text-gray-600 tracking-wide mb-3 font-medium">
            uncompleted todos
          </h2>
          {FilteredUncompletedTodos.length === 0 ? (
            <div className="h-32 flex items-center justify-center">
              {loading ? (
                <Spinners3DotsBounce className="size-6" />
              ) : (
                <span> 👌No todos is uncompleted</span>
              )}
            </div>
          ) : (
            FilteredUncompletedTodos.map((todo) => (
              <div
                className="p-2  bg-blue-50 shadow-lg rounded-xl "
                key={todo.id}
              >
                {todo.title}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

//needs to be validated (at least 9 char , 1upp , 1 number) second iput takes a number  that represents a USERID in the endpoint procvided if the password is valid then print the uncompleted titles related to the user id in the second nput field
