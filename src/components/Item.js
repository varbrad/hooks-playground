import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const RawItem = ({ data, containerProps, handleProps }) => (
  <div {...containerProps} {...handleProps}>
    <span>{data.content}</span>
  </div>
)

const Item = ({ data, draggable, index }) =>
  draggable ? (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => {
        const containerProps = {
          ...provided.draggableProps,
          ref: provided.innerRef,
        }
        const handleProps = { ...provided.dragHandleProps }
        return (
          <RawItem
            data={data}
            containerProps={containerProps}
            handleProps={handleProps}
          />
        )
      }}
    </Draggable>
  ) : (
    RawItem({ data })
  )

export default Item

// {
//   (provided, snapshot) => (
//     <div
//       ref={provided.innerRef}
//       {...provided.draggableProps}
//       {...provided.dragHandleProps}
//     >
//       <span>{item.content}</span>
//     </div>
//   )
// }
