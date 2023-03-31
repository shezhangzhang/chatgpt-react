import React, { useContext } from "react";
import { ROLES, ROLE_TYPE } from "../pages";
import User from "../public/user.svg";
import Openai from "../public/openai.svg";
import { DarkContext } from "../utils/darkContext";

interface Props {
  role: ROLE_TYPE;
}

export default function Role(props: Props) {
  const { role } = props;
  const dark = useContext(DarkContext);

  return (
    <div>
      {role === ROLES.USER ? (
        <User width={20} height={20} fill={dark ? "#ddd" : "#222"} />
      ) : (
        <Openai width={20} height={20} fill={dark ? "#ddd" : "#222"} />
      )}
    </div>
  );
}
