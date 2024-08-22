import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-zinc-200">
      <div className="w-[80%] mx-auto bg-yellow-100/50 shadow-xl border-[1px] border-yellow-300 min-h-[80vh] rounded-xl flex text-center flex-col gap-y-4">
        <h1 className="font-medium text-2xl lg:text-4xl text-gray-600 mb-6 mt-20  capitalize">
          Todo filter app
        </h1>
        <form
          className=" w-[90%] lg:w-[40%] mx-auto flex flex-col gap-y-8"
          onSubmit={handlesubmit}
        >
          <input
            className="p-4 rounded-md bg-blue-50 placeholder:text-sm placeholder:text-muted-foreground outline-1 outline-sky-300"
            placeholder="Enter your password"
          />
          <input
            className="p-4 rounded-md bg-blue-50 placeholder:text-sm placeholder:text-muted-foreground outline-1 outline-sky-300"
            placeholder="Enter a number"
          />

          <button className="p-4 bg-blue-400 text-white rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

//needs to be validated (at least 9 char , 1upp , 1 number) second iput takes a number  that represents a USERID in the endpoint procvided if the password is valid then print the uncompleted titles related to the user id in the second nput field
