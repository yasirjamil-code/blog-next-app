import React, { useState } from "react";

const SubTableItem = ({ email, mongoid, date, deleteEmail }) => {
  const emailDate = new Date(date);
  return (
    <tr className=" bg-white border-b text-left">
      <th
        scope="row"
        className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {email ? email : "No Email"}
      </th>
      <td className=" px-6 py-4 hidden sm:block">{emailDate.toDateString()}</td>
      <td
        onClick={() => deleteEmail(mongoid)}
        className=" px-6 py-4 cursor-pointer"
      >
        x
      </td>
    </tr>
  );
};

export default SubTableItem;
