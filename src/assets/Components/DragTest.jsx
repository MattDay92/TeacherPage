import React, { useState } from 'react';

const DraggableAnywhere = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 100, y: 100 }); // Initial position

  const handleMouseDown = (event) => {
    setIsDragging(true);

    // Calculate the offset between the mouse position and the element's top-left corner
    const rect = event.target.getBoundingClientRect();
    setOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });

    // Change the cursor to indicate dragging
    event.target.style.cursor = 'grabbing';
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      // Update position while maintaining the offset
      setPosition({
        x: event.clientX - offset.x,
        y: event.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = (event) => {
    if (isDragging) {
      setIsDragging(false);

      // Reset cursor after dragging ends
      event.target.style.cursor = 'grab';
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '100px',
        height: '100px',
        backgroundColor: 'lightblue',
        cursor: 'grab',
        zIndex: 1000,
      }}
    >
      Drag me!
    </div>
  );
};

export default DraggableAnywhere;
