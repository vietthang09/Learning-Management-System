import React from "react";

function YouMayLikeCard() {
  return (
    <div className="relative group overflow-hidden rounded-xl">
      <img
        src="https://cdn.tgdd.vn/hoi-dap/1216572/tri-tue-nhan-tao-ai-la-gi-cac-ung-dung-va-tiem-nan-11-800x450.jpg"
        alt=""
        className="h-40 object-cover rounded-xl transform group-hover:scale-105"
      />
      <img
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt=""
        className="absolute top-2 left-2 w-10 border-2 border-white rounded-full"
      />
      <span className="absolute bottom-2 left-2 text-white">Course title</span>
    </div>
  );
}

export default YouMayLikeCard;
