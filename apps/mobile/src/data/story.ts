import { DialogueLine } from '../types';

export const chapter1: DialogueLine[] = [
  {
      id: "scene1_001",
      speaker: "",
      text: "<System Matrix Compromised>",
      expression: "none",
      background: "beginner_cave"
  },
  {
      id: "scene1_002",
      speaker: "",
      text: "<System failure>",
      expression: "none",
      background: "beginner_cave"
  },
  {
      id: "scene1_003",
      speaker: "",
      text: "A rumbling noise is heard in the background, you wake up dazed and confused inside a pod. Suddenly the mechanical noise is heard from under you a click is heard and your arm and leg restraints are released.",
      expression: "none",
      background: "beginner_cave"
  },
  {
      id: "scene4_002",
      speaker: "Vaina",
      text: "Oh good you're awake!",
      expression: "Happy",
      background: "Village_Interior"
  },
  {
      id: "scene4_008",
      speaker: "",
      text: "Like Vaina said, you seemed to be alright now and you decide to go out to the Village to see what it and the strange World has to offer",
      expression: "none",
      background: "Village_Interior",
      triggerEvent: "START_FREE_TIME",
      _comment: "End of Chapter 1"
  }
];