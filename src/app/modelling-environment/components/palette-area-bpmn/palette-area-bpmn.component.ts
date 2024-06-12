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

@Component({
  selector: 'app-palette-area-bpmn',
  templateUrl: './palette-area-bpmn.component.html',
  styleUrls: ['./palette-area-bpmn.component.css']
})
export class PaletteAreaBpmnComponent implements OnInit {
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
}


/**import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Node, Edge, Position, Connection, MarkerType, addEdge } from 'reactflow';
import { ReactFlowComponent } from 'ngx-reactflow';

interface BpmnElement {
  name: string;
  type: string;
  isConnectable: boolean;
}

@Component({
  selector: 'app-palette-area-bpmn',
  templateUrl: './palette-area-bpmn.component.html',
  styleUrls: ['./palette-area-bpmn.component.css']
})
export class PaletteAreaBpmnComponent implements OnInit {
  elements: BpmnElement[] = [
    { name: 'Non Event', type: 'nonEvent', isConnectable: true },
    { name: 'Task', type: 'task', isConnectable: true }
  ];

  showStartNode: boolean = false;
  showEndNode: boolean = false;
  showTaskOptions: boolean = false;
  lastNodePosition = { x: 0, y: 0 };
  lastNodeId: string | null = null;

  @Output() addNode = new EventEmitter<Node<any, string | undefined>>();
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
        { name: '', type: 'event', isConnectable: true },
        { name: '', type: 'task', isConnectable: true }
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
        sourcePosition: Position.Right, // Only source handle on the right
        draggable: true,
        selectable: true,
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
        targetPosition: Position.Left, // Only target handle on the left
        draggable: true,
        selectable: true,
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
        }
      };
    } else if (eventType === 'manualTask' || eventType === 'serviceTask') {
      newNode = {
        id: nodeId,
        type: eventType,
        data: { label: '' },
        position: newNodePosition,
        draggable: true,
        selectable: true,
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
    this.addNode.emit(newNode);
    if (newEdge) {
      this.addEdge.emit(newEdge);
    }
  }

  onNodesChange(event: any) {
    const updatedNodes = event.nodes;
    this.nodes = updatedNodes;
    this.nodesChange.emit(updatedNodes);
  }

  onEdgesChange(event: any) {
    const updatedEdges = event.edges;
    this.edges = updatedEdges;
    this.edgesChange.emit(updatedEdges);
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
}*/
