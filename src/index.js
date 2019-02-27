import React, { useState } from 'react'
import { render } from 'react-dom'
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd'
import Item from './components/Item'

const getItems = count =>
  [...Array(count).keys()].map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }))

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const onDragEnd = ({ data, setData }) => event => {
  if (!event.destination) {
    return
  }

  const items = reorder(
    data,
    event.source.index,
    event.destination.index,
  )

  setData(items)
}

const App = ({ data: initialData }) => {
  const [data, setData] = useState(initialData || [])

  return (
    <div>
      <h1>Cool thing</h1>
      <DragDropContext onDragEnd={onDragEnd({ data, setData })}>
        <Droppable droppableId="col" type="lists">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              <Draggable draggableId={1} index={1}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <h3 {...provided.dragHandleProps}>
                      Grab me baby!
                    </h3>
                    <Droppable droppableId="list" type="items">
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                          <h3>Here be items</h3>
                          {data.map((item, ix) => (
                            <Item
                              key={item.id}
                              data={item}
                              draggable={true}
                              index={ix}
                            />
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <hr />
      <h4>Item thing</h4>
      <Item data={data[0]} />
    </div>
  )
}

render(
  <App data={getItems(10)} />,
  document.getElementById('app'),
)
