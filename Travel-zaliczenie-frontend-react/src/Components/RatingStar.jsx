import { useState } from "react"

const RatingStar = ({ value=0, onChange}) => {
    const [hovered, setHovered] = useState(null)
    const stars = [1, 2, 3, 4, 5]

    const handleClick = (rating) => {
        if(onChange) {
            onChange(rating)
        }
    }

    const handleMouse = (rating) => {
        setHovered(rating)
    }

    const handleLeaveMouse = () => {
        setHovered(null)
    }
    return (
        <>
        <div className="flex flex-row">
            {stars.map((star) => (
               <svg
               key={star}
               onClick={() => handleClick(star)}
               onMouseEnter={() => handleMouse(star)}
               onMouseLeave={handleLeaveMouse}
               className="w-6 h-6 cursor-pointer transition-transform transform hover:scale-110"
               xmlns="http://www.w3.org/2000/svg"
               fill={(hovered || value) >= star ? "#facc15" : "none"}
               viewBox="0 0 24 24"
               stroke="#facc15">
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth={2}
                 d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.188c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.973c.3.921-.755 1.688-1.538 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.973a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 00.95-.69l1.286-3.973z"
               />
             </svg>
             
            ))}
        </div>
        </>
    )
}

export default RatingStar