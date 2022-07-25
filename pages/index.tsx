import type { NextPage } from "next";
import { Password } from "@components/forms/password/password";
import { DateInput } from "@components/forms/date/date";

const Home: NextPage = () => {
  return (
    <div className="p-2 flex">
      <Password legendStr="Password" testId="password" />
      <div className="w-5" />
      <DateInput legendStr="Birthday" testId="birthday" />
    </div>
  );
};

export default Home;
