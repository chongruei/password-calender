import { Password } from "@components/password/password";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="p-2">
      <Password />
    </div>
  );
};

export default Home;
