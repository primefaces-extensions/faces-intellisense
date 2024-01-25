"use strict";

import * as vscode from "vscode";
import { Component } from "../model";

class ComponentDefinition {
    public constructor(public component: Component, public location?: vscode.Location) { }
}
export default ComponentDefinition;
