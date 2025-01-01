import { memo } from "react";
import Icon from "../Icon/Icon";

export default memo(function OutfitRecommendationError() {
    return     <div className="bg-white p-4 rounded-md flex flex-row items-start gap-4 text-red-500">
    <div className="m-2">
      <button className="bg-black rounded-md w-[4em] h-[4em] self-start p-4">
        <Icon name="tshirt" size={32} fill="white" />
      </button>
    </div>
    <div className="m-2">Unable to load clothing recommendation</div>
  </div>
})