import type { NextPage } from "next";
// import { Calendar } from "@components/calendar/calendar";
import { Password } from "@components/forms/password/password";

const Home: NextPage = () => {
  return (
    <div className="p-2 flex">
      <Password />
      <div className="w-5" />
      {/* <Calendar date={}/> */}
    </div>
  );
};

export default Home;
