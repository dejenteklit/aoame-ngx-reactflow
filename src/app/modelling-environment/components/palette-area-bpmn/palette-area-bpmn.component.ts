import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Node, Edge, Connection, Position } from 'reactflow';

interface BpmnElement {
  name: string;
  type: string;
}

@Component({
  selector: 'app-palette-area-bpmn',
  templateUrl: './palette-area-bpmn.component.html',
  styleUrls: ['./palette-area-bpmn.component.css']
})
export class PaletteAreaBpmnComponent implements OnInit {
  elements: BpmnElement[] = [
    { name: 'Start Event', type: 'startEvent' },
    { name: 'End Event', type: 'endEvent' },
    { name: 'Activity', type: 'activity' }
  ];

  @Output() addNode = new EventEmitter<Node>();
  @Output() addEdge = new EventEmitter<Edge>();
  lastNodePosition = { x: 0, y: 0 };

  constructor() {}

  ngOnInit() {}

  onDragStart(event: DragEvent, element: BpmnElement) {
    if (!event.dataTransfer) return;
    event.dataTransfer.setData('application/reactflow', JSON.stringify(element));
    event.dataTransfer.effectAllowed = 'move';
  }

  onOptionClick(option: string, element: BpmnElement) {
    const nodeId = `${element.type}-${option}-${Date.now()}`;
    const offset = 200;

    const newNodePosition = { x: this.lastNodePosition.x + offset, y: this.lastNodePosition.y };

    let newNode: Node;

    if (element.type === 'startEvent' || element.type === 'endEvent') {
      newNode = {
        id: nodeId,
        type: element.type,
        data: { label: element.name },
        position: newNodePosition,
        style: {
          border: element.type === 'startEvent' ? '2px solid black' : '2px solid red',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: element.type === 'startEvent' ? '#FFD700' : 'transparent',
          color: 'black',
          fontSize: '10px',
          cursor: 'pointer',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          userSelect: 'none',
          transition: 'background-color 0.3s ease',
        },
        draggable: true,
        selectable: true,
      };

      if (element.type === 'startEvent') {
        newNode.sourcePosition = 'right' as Position;
      } else if (element.type === 'endEvent') {
        newNode.targetPosition = 'left' as Position;
      }
    } else if (element.type === 'activity') {
      newNode = {
        id: nodeId,
        type: 'activity',
        data: { label: element.name },
        position: newNodePosition,
        style: {
          border: '1px solid black',
          borderRadius: '0%',
          width: '100px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFFFFF',
          color: 'black',
          fontSize: '10px',
          cursor: 'pointer',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          userSelect: 'none',
          transition: 'background-color 0.3s ease',
        },
        draggable: true,
        selectable: true,
        sourcePosition: 'right' as Position,
        targetPosition: 'left' as Position,
      };
    } else {
      throw new Error(`Unknown element type: ${element.type}`);
    }

    this.lastNodePosition = newNodePosition;
    this.addNode.emit(newNode);
  }

  onConnect(connection: Connection) {
    if (connection.source && connection.target) {
      const newEdge: Edge = {
        id: `${connection.source}-${connection.target}`,
        source: connection.source,
        target: connection.target,
        label: 'this is an edge label'
      };
      this.addEdge.emit(newEdge);
    }
  }
}
