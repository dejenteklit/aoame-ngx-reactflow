import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Node, Edge, Position, Connection, MarkerType } from 'reactflow';
import ReactFlow from "react-flow-renderer";

interface BpmnElement {
  name: string;
  type: string;
  isConnectable: boolean;
  sourcePosition: string;
  targetPosition: string;
}
/*interface PaletteElement {
  name: string;
  type: string;
}*/

@Component({
  selector: 'app-palette-area',
  templateUrl: './palette-area.component.html',
  styleUrls: ['./palette-area.component.css']
})
export class PaletteAreaComponent implements OnInit {
  elements: BpmnElement[] = [
    { name: 'Non Event', type: 'nonEvent', isConnectable: true, sourcePosition: 'null', targetPosition: 'null' },
    { name: 'Task', type: 'task', isConnectable: true, sourcePosition: 'null', targetPosition: 'null' }
  ];

  showStartNode: boolean = false;
  showEndNode: boolean = false;
  showTaskOptions: boolean = false;
  lastNodePosition = { x: 0, y: 0 };
  lastNodeId: string | null = null;
  contextMenuVisible: boolean = false;
  contextMenuPosition = { x: 0, y: 0 };
  selectedNodeId: string | null = null;

  @Output() addNode = new EventEmitter<Node>();
  @Output() addEdge = new EventEmitter<Edge>();
  @Output() connect = new EventEmitter<Connection>();
  @Input() nodes: Node[] = [];
  @Input() edges: Edge[] = [];
  @Output() nodesChange = new EventEmitter<Node[]>();
  @Output() edgesChange = new EventEmitter<Edge[]>();

  constructor() {}

  ngOnInit() {}

  onHoverOverNonEvent() {
    this.showStartNode = true;
    this.showEndNode = true;
  }

  onHoverOverTask() {
    this.showTaskOptions = true;
  }

  onViewChange(event: any) {
    const selectedView = event.target.value;
    if (selectedView === 'Process Modeling View') {
      this.elements = [
        { name: '', type: 'event', isConnectable: true, sourcePosition: 'right', targetPosition: 'left' },
        { name: '', type: 'task', isConnectable: true, sourcePosition: 'right', targetPosition: 'left' }
      ];
    } else {
      this.elements = [];
    }
  }

  onOptionClick(element: BpmnElement, eventType: string) {
    const nodeId = `${eventType}-${Date.now()}`;
    const offset = 200;

    const newNodePosition = { x: this.lastNodePosition.x + offset, y: this.lastNodePosition.y };

    let newNode: Node;
    let newEdge: Edge | null = null;

    if (eventType === 'startEvent') {
      newNode = {
        id: nodeId,
        type: eventType,
        data: { label: '' },
        position: newNodePosition,
        sourcePosition: Position.Right,
        draggable: true,
        style: {
          border: '0.20px solid black',
          borderRadius: '50%',
          width: '58px',
          height: '58px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'url("assets/Simple_Start.png")',
          backgroundSize: 'cover',
          color: 'black',
          fontSize: '10px',
          cursor: 'pointer',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          userSelect: 'none',
          transition: 'background-color 0.3s ease',
        }
      };
    } else if (eventType === 'endEvent') {
      newNode = {
        id: nodeId,
        type: eventType,
        data: { label: '' },
        position: newNodePosition,
        draggable: true,
        targetPosition: Position.Left,
        style: {
          border: '0.10px solid red',
          borderRadius: '50%',
          width: '58px',
          height: '58px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'url("assets/Simple_End.png")',
          backgroundSize: 'cover',
          color: 'black',
          fontSize: '10px',
          cursor: 'pointer',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          userSelect: 'none',
          transition: 'background-color 0.3s ease',
        },
      };
    } else if (eventType === 'manualTask' || eventType === 'serviceTask') {
      newNode = {
        id: nodeId,
        type: eventType,
        data: { label: '' },
        position: newNodePosition,
        draggable: true,
        style: {
          border: '0.20px solid black',
          borderRadius: '13px',
          width: '103px',
          height: '58px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: eventType === 'manualTask' ? 'url("assets/Manual_Task.png")' : 'url("assets/Service_Task.png")',
          backgroundSize: 'cover',
          color: 'yellow',
          fontSize: '10px',
          cursor: 'pointer',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          userSelect: 'none',
          transition: 'background-color 0.3s ease',
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left
      };
    } else {
      throw new Error(`Unknown event type: ${eventType}`);
    }

    if (this.lastNodeId) {
      newEdge = {
        id: `e${this.lastNodeId}-${nodeId}`,
        source: this.lastNodeId,
        target: nodeId,
        sourceHandle: null,
        targetHandle: null
      };
    }

    this.lastNodePosition = newNodePosition;
    this.lastNodeId = nodeId;
    this.nodes = [...this.nodes, newNode]; // Update local nodes array
    this.nodesChange.emit(this.nodes);
    this.addNode.emit(newNode);
    if (newEdge) {
      this.edges = [...this.edges, newEdge]; // Update local edges array
      this.edgesChange.emit(this.edges);
      this.addEdge.emit(newEdge);
    }
  }

  /**
  languages = ['BPMN 2.0', 'Other Language'];
  views = ['Process Modeling View', 'Other View'];
  elements: PaletteElement[] = [];
  hoveredElement: PaletteElement | null = null;
  selectedView: string = '';
  @Input() nodes: Node[] = [];
  @Input() edges: Edge[] = [];
  @Output() addNode = new EventEmitter<Node>();
  @Output() addEdge = new EventEmitter<Edge>();
  @Output() connect = new EventEmitter<Connection>();
  @Output() nodesChange = new EventEmitter<Node[]>();
  @Output() edgesChange = new EventEmitter<Edge[]>();
  selectedSourceNodeId: string | null = null;
  selectedTargetNodeId: string | null = null;
  node: string | undefined;


  constructor() {}

  ngOnInit() {}

  onLanguageChange(event: any) {
    const selectedLanguage = event.target.value;
  }

  onViewChange(event: any) {
    this.selectedView = event.target.value;
  }

  onAddNode(node: Node) {
    this.addNode.emit(node);
  }
  onAddEdge(edge: Edge) {
    this.addEdge.emit(edge);
  }

  onSelectNode(nodeId: string) {
    if (!this.selectedSourceNodeId) {
      this.selectedSourceNodeId = nodeId;
    } else {
      this.selectedTargetNodeId = nodeId;
      this.createEdge();
    }
  }

  createEdge() {
    if (this.selectedSourceNodeId && this.selectedTargetNodeId) {
      const newEdge: Edge = {
        id: `e${this.selectedSourceNodeId}-${this.selectedTargetNodeId}`,
        source: this.selectedSourceNodeId,
        target: this.selectedTargetNodeId,
        sourceHandle: null,
        targetHandle: null
      };
      this.addEdge.emit(newEdge);
      this.resetSelection();
    }
  }

  resetSelection() {
    this.selectedSourceNodeId = null;
    this.selectedTargetNodeId = null;
  }
  onConnect(event: any) {
    const params: Connection = {
      source: event.source,
      sourceHandle: event.sourceHandle,
      target: event.target,
      targetHandle: event.targetHandle
    };
    const newEdge: Edge = {
      id: `e${event.source}-${event.target}`,
      source: event.source,
      target: event.target,
      sourceHandle: event.sourceHandle,
      targetHandle: event.targetHandle,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };
    this.edges = addEdge(newEdge, this.edges);
    this.edgesChange.emit(this.edges);
  }
*/
}

/**import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Node, Edge, Connection, Position } from 'reactflow';
interface PaletteElement {
  name: string;
  type: string;
}

@Component({
  selector: 'app-palette-area',
  templateUrl: './palette-area.component.html',
  styleUrls: ['./palette-area.component.css']
})
export class PaletteAreaComponent implements OnInit {
  languages = ['BPMN 2.0', 'Other Language'];
  views = ['Process Modeling View', 'Other View'];
  elements: PaletteElement[] = [];
  hoveredElement: PaletteElement | null = null;
  @Output() addNode = new EventEmitter<Node>();
  @Output() addEdge = new EventEmitter<Edge>();
  nodes: Node[] = [];
  edges: Edge[] = [];
  lastNodePosition = { x: 0, y: 0 };

  constructor() {}

  onDragStart(event: DragEvent, element: PaletteElement) {
    if (!event.dataTransfer) return;
    event.dataTransfer.setData('application/reactflow', JSON.stringify(element));
    event.dataTransfer.effectAllowed = 'move';
  }

  onLanguageChange(event: any) {
    const selectedLanguage = event.target.value;
  }

  onViewChange(event: any) {
    const selectedView = event.target.value;
    if (selectedView === 'Process Modeling View') {
      this.elements = [
        { name: 'Events', type: 'event' },
        { name: 'Activities', type: 'activity' }
      ];
    } else {
      this.elements = [];
    }
  }

  onHover(element: PaletteElement) {
    this.hoveredElement = element;
  }

  onLeave() {
    this.hoveredElement = null;
  }

  onOptionClick(option: string, element: PaletteElement) {
    const nodeId = `${element.type}-${option}-${Date.now()}`;
    const offset = 200; // Distance between nodes

    // Calculate the position for the new node
    const newNodePosition = { x: this.lastNodePosition.x + offset, y: this.lastNodePosition.y };

    let newNode: Node;

    if (element.type === 'event') {
      newNode = {
        id: nodeId,
        type: option === 'start' ? 'startNode' : 'endNode',
        data: {
          label: '', // Empty label
        },
        style: {
          border: option === 'start' ? '2px solid black' : (option === 'end' ? '2px solid red' : 'none'),
          borderRadius: '50%', // Circle shape
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: option === 'start' ? '#FFD700' : 'transparent',
          color: 'black',
          fontSize: '10px',
          cursor: 'pointer',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          userSelect: 'none',
          transition: 'background-color 0.3s ease',
        },

        draggable: true,
        selectable: true,
        position: newNodePosition,
      };

      if (option === 'start') {
        newNode.sourcePosition = 'right' as Position;
      } else if (option === 'end') {
        newNode.targetPosition = 'left' as Position;
      }
    } else if (element.type === 'activity') {
      newNode = {
        id: nodeId,
        type: 'activityNode',
        data: {
          label: '', // Empty label
        },
        style: {
          border: '1px solid black',
          borderRadius: '0%', // Rectangle shape
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
        position: newNodePosition,
        sourcePosition: 'right' as Position,
        targetPosition: 'left' as Position,
      };
    } else {
      throw new Error(`Unknown element type: ${element.type}`);
    }

    this.lastNodePosition = newNodePosition; // Update the last node position
    this.addNode.emit(newNode);
    this.hoveredElement = null;
  }
  onConnect(connection: Connection) {
    if (connection.source && connection.target) {
      const newEdge = {
        id: `${connection.source}-${connection.target}`, // Generate a unique ID for the edge
        source: connection.source, // Source node ID
        target: connection.target, // Target node ID
        animated: true, // Example property for animation
        type: 'smoothstep', // Example edge type
        label: 'this is an edge label' // Example edge label
      };
      this.edges.push(newEdge); // Push the new edge to the edges array
      this.addEdge.emit(newEdge); // Emit the new edge
    }
  }
  /**onConnect(connection: Connection) {
    if (connection.source && connection.target) {
      const newEdge: Edge = {
        id: `${connection.source}-${connection.target}`,
        source: connection.source,
        target: connection.target,
        label: 'this is an edge label'
      };
      this.edges.push(newEdge);
      this.addEdge.emit(newEdge);
    }
  }*/

 // ngOnInit() {}}*/

/**import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Node, Edge, Connection, Position } from 'reactflow';

interface PaletteElement {
  name: string;
  type: string;
}

@Component({
  selector: 'app-palette-area',
  templateUrl: './palette-area.component.html',
  styleUrls: ['./palette-area.component.css']
})
export class PaletteAreaComponent implements OnInit {
  languages = ['BPMN 2.0', 'Other Language'];
  views = ['Process Modeling View', 'Other View'];
  elements: PaletteElement[] = [];
  hoveredElement: PaletteElement | null = null;
  @Output() addNode = new EventEmitter<Node>();
  @Output() addEdge = new EventEmitter<Edge>();
  nodes: Node[] = [];
  edges: Edge[] = [];
  lastNodePosition = { x: 0, y: 0 };

  constructor() {}

  onDragStart(event: DragEvent, element: PaletteElement) {
    if (!event.dataTransfer) return;
    event.dataTransfer.setData('application/reactflow', JSON.stringify(element));
    event.dataTransfer.effectAllowed = 'move';
  }

  onLanguageChange(event: any) {
    const selectedLanguage = event.target.value;
  }

  onViewChange(event: any) {
    const selectedView = event.target.value;
    if (selectedView === 'Process Modeling View') {
      this.elements = [
        { name: 'Events', type: 'event' },
        { name: 'Activities', type: 'activity' }
      ];
    } else {
      this.elements = [];
    }
  }

  onHover(element: PaletteElement) {
    this.hoveredElement = element;
  }

  onLeave() {
    this.hoveredElement = null;
  }

  onOptionClick(option: string, element: PaletteElement) {
    const nodeId = `${element.type}-${option}-${Date.now()}`;
    const offset = 200; // Distance between nodes

    // Calculate the position for the new node
    const newNodePosition = { x: this.lastNodePosition.x + offset, y: this.lastNodePosition.y };

    let newNode: Node;

    if (element.type === 'event') {
      newNode = {
        id: nodeId,
        type: option === 'start' ? 'startNode' : 'endNode',
        data: {
          label: '', // Empty label
        },
        style: {
          border: option === 'start' ? '2px solid black' : (option === 'end' ? '2px solid red' : 'none'),
          borderRadius: '50%', // Circle shape
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: option === 'start' ? '#FFD700' : 'transparent',
          color: 'black',
          fontSize: '10px',
          cursor: 'pointer',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          userSelect: 'none',
          transition: 'background-color 0.3s ease',
        },
        draggable: true,
        selectable: true,
        position: newNodePosition,
      };

      if (option === 'start') {
        newNode.sourcePosition = 'right' as Position;
      } else if (option === 'end') {
        newNode.targetPosition = 'left' as Position;
      }
    } else if (element.type === 'activity') {
      newNode = {
        id: nodeId,
        type: 'activityNode',
        data: {
          label: '', // Empty label
        },
        style: {
          border: '1px solid black',
          borderRadius: '0%', // Rectangle shape
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
        position: newNodePosition,
        sourcePosition: 'right' as Position,
        targetPosition: 'left' as Position,
      };
    } else {
      throw new Error(`Unknown element type: ${element.type}`);
    }

    this.lastNodePosition = newNodePosition; // Update the last node position
    this.addNode.emit(newNode);
    this.hoveredElement = null;
  }

  onConnect(connection: Connection) {
    if (connection.source && connection.target) {
      const newEdge: Edge = {
        id: `${connection.source}-${connection.target}`,
        source: connection.source,
        target: connection.target,
        label: 'this is an edge label'
      };
      this.edges.push(newEdge);
      this.addEdge.emit(newEdge);
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.nodes = [...this.nodes];
      this.edges = [...this.edges];
    }, 4000);
  }
}
*/

/*import { Component, EventEmitter, Output, ViewChild ,OnInit, ElementRef} from '@angular/core';
import { ReactFlowComponent } from 'ngx-reactflow';
import {Node, Edge, MarkerType, Position,  Connection, addEdge, ReactFlowInstance } from 'reactflow';

interface PaletteElement {
  name: string;
  type: string;
}

@Component({
  selector: 'app-palette-area',
  templateUrl: './palette-area.component.html',
  styleUrls: ['./palette-area.component.css']
})
export class PaletteAreaComponent {
  languages = ['BPMN 2.0', 'Other Language'];
  views = ['Process Modeling View', 'Other View'];
  elements: PaletteElement[] = [];
  hoveredElement: PaletteElement | null = null;
  @Output() addNode = new EventEmitter<any>();

  nodes: Node[] = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: 'de' } }
  ];

  edges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' }
  ];

  ngOnInit() {}

  onConnect(params: Connection[]) {
    params.forEach(connection => {
      this.edges = addEdge(connection, this.edges);
    });
  }

  constructor() {}

  onDragStart(event: DragEvent, element: PaletteElement) {
    if (!event.dataTransfer) return; // Null check
    event.dataTransfer.setData('application/reactflow', JSON.stringify(element));
    event.dataTransfer.effectAllowed = 'move';
  }

  onLanguageChange(event: any) {
    const selectedLanguage = event.target.value;
    // Logic to handle language change
  }

  onViewChange(event: any) {
    const selectedView = event.target.value;
    // Logic to handle view change
    if (selectedView === 'Process Modeling View') {
      this.elements = [
        { name: 'Events', type: 'event' },
      ];
    } else {
      this.elements = [];
    }
  }

  onHover(element: PaletteElement) {
    if (element.name === 'Events') {
      this.hoveredElement = element;
    }
  }

  onLeave() {
    this.hoveredElement = null;
  }

  onOptionClick(option: string, element: PaletteElement) {
    if (option === 'start') {
      const node = {
        id: `${element.type}-${Date.now()}`,
        type: element.type,
        data: {
          label: `${element.type.charAt(0).toUpperCase() + element.type.slice(1)} Event`,
        },
        position: { x: 250, y: 150 }
      };
      this.addNode.emit(node);
      this.hoveredElement = null;
    } else if (option === 'end') {
      const node = {
        id: `${element.type}-${Date.now()}`,
        type: element.type,
        data: {
          label: `${element.type.charAt(0).toUpperCase() + element.type.slice(1)} Event`,
        },
        position: { x: 250, y: 150 }
      };
      this.addNode.emit(node);
      this.hoveredElement = null;
    }
  }*/

//import { Component, EventEmitter, Output } from '@angular/core';

/*import { MarkerType, Position } from 'reactflow';
import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
 */
/*
import { Component, EventEmitter, Output, ViewChild ,OnInit, ElementRef} from '@angular/core';
import { ReactFlowComponent } from 'ngx-reactflow';
import {Node, Edge, MarkerType, Position,  Connection, addEdge, ReactFlowInstance } from 'reactflow';


interface PaletteElement {
  name: string;
  type: string;
  imageUrl?: string; // Add the optional imageUrl property
}

@Component({
  selector: 'app-palette-area',
  templateUrl: './palette-area.component.html',
  styleUrls: ['./palette-area.component.css']
})
export class PaletteAreaComponent {
  languages = ['BPMN 2.0', 'Other Language'];
  views = ['Process Modeling View', 'Other View'];
  elements: PaletteElement[] = [];
  hoveredElement: PaletteElement | null = null;
  @Output() addNode = new EventEmitter<any>();

  nodes: Node[] = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: 'de' } }
  ];

  edges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' }
  ];

  ngOnInit() {}

  onConnect(params: Connection[]) {
    params.forEach(connection => {
      this.edges = addEdge(connection, this.edges);
    });
  }
  constructor() {}

  onDragStart(event: DragEvent, element: PaletteElement) {
    if (!event.dataTransfer) return; // Null check
    event.dataTransfer.setData('application/reactflow', JSON.stringify(element));
    event.dataTransfer.effectAllowed = 'move';
  }

  onLanguageChange(event: any) {
    const selectedLanguage = event.target.value;
    // Logic to handle language change
  }

  onViewChange(event: any) {
    const selectedView = event.target.value;
    // Logic to handle view change
    if (selectedView === 'Process Modeling View') {
      this.elements = [
        {name: 'Events', type: 'event'},
      ];
    } else {
      this.elements = [];
    }
  }

  onHover(element: PaletteElement) {
    if (element.name === 'Events') {
      this.hoveredElement = element;
    }
  }

  onLeave() {
    this.hoveredElement = null;
  }
  onOptionClick(option: string, element: PaletteElement) {
    if (option === 'start') {
      const node = {
        id: `${element.type}-${Date.now()}`,
        type: element.type,
        data: {
          label: `${element.type.charAt(0).toUpperCase() + element.type.slice(1)} Event`,
          imageUrl: 'src/assets/images/BPMN-CMMN/Event.PNG'
        },
        position: {x: 250, y: 150}
      };
      this.addNode.emit(node);
      this.hoveredElement = null;
    } else if (option === 'end') {
      const node = {
        id: `${element.type}-${Date.now()}`,
        type: element.type,
        data: {
          label: `${element.type.charAt(0).toUpperCase() + element.type.slice(1)} Event`,
          imageUrl: 'src/assets/images/BPMN-CMMN/Event.PNG'
        },
        position: {x: 250, y: 150}
      };
      this.addNode.emit(node);
      this.hoveredElement = null;
    }
  }*/
  /**//////////////////////////////////////////////////*/
  /*
   @Output() addNode = new EventEmitter<Node>();

  onLanguageChange(language: string) {
    if (language === 'BPMN 2.0') {
      const startNode: Node = {
        id: 'start-node',
        type: 'start',
        data: { label: 'Start Event' },
        position: { x: 250, y: 150 }
      };

      const endNode: Node = {
        id: 'end-node',
        type: 'end',
        data: { label: 'End Event' },
        position: { x: 250, y: 250 }
      };

      this.addNode.emit(startNode);
      this.addNode.emit(endNode);
    }
  }
  nodes = [
    {
      id: '1',
      type: 'input',
      data: {
        label: 'Input Node',
      },
      position: { x: 250, y: 0 },
    },
    {
      id: '2',
      data: {
        label: 'Default Node',
      },
      position: { x: 100, y: 100 },
    },
    {
      id: '4',
      type: 'custom',
      position: { x: 100, y: 200 },
      data: {
        selects: {
          'handle-0': 'smoothstep',
          'handle-1': 'smoothstep',
        },
      },
    },
    {
      id: '5',
      type: 'output',
      data: {
        label: 'custom style',
      },
      className: 'circle',
      style: {
        background: '#2B6CB0',
        color: 'white',
      },
      position: { x: 400, y: 200 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },

    {
      id: '7',
      type: 'default',
      className: 'annotation',
      data: {
        label: React.createElement(
          'div',
          null,
          'On the bottom left you see the ',
          React.createElement(
            'strong',
            null,
            'Controls'
          ),
          ' and the bottom right the',
          ' ',
          React.createElement(
            'strong',
            null,
            'MiniMap'
          ),
          '. This is also just a node \uD83E\uDD73'
        )
      },
      draggable: true,
      selectable: true,
      position: { x: 150, y: 400 },
    },
  ];

  edges = [
    { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
    { id: 'e1-3', source: '1', target: '3', animated: true },
    {
      id: 'e4-5',
      source: '4',
      target: '5',
      type: 'smoothstep',
      sourceHandle: 'handle-0',
      data: {
        selectIndex: 0,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: 'e4-6',
      source: '4',
      target: '6',
      type: 'smoothstep',
      sourceHandle: 'handle-1',
      data: {
        selectIndex: 1,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
  ];

  ngOnInit() {
    setTimeout(() => {

      this.nodes = [...this.nodes];
      this.edges = [...this.edges];
    }, 4000)
  }
*/

