import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import * as myExtension from "../../extension";

suite("Extension Test Suite", () => {
  suiteSetup(() => {
    vscode.window.showInformationMessage("Starting tests!");
  });

  suiteTeardown(() => {
    vscode.window.showInformationMessage("All tests done!");
  });

  test("inAttribute returns true for attribute", () => {
    assert.equal(myExtension.inAttribute('value="'), true);
  });
  test("inAttribute returns false for element", () => {
    assert.equal(myExtension.inAttribute("p:inputText"), false);
  });
});
