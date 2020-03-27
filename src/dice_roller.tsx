//! BSD License, see https://opensource.org/licenses/BSD-3-Clause

import { Component, h, render } from "preact";
import * as $ from "jquery";

interface DiceRollerProps {
    dice_type: number,
}

interface DiceRollerState {
    dice_count: number,
    current_text: string,
}

// get random number
function get_random_num(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

// dice roller class
class DiceRoller extends Component<DiceRollerProps, DiceRollerState> {
    constructor(props: DiceRollerProps) {
        super(props);

        this.setState(() => {
            return {
                dice_count: 1,
                current_text: "",
            };
        });
    }

    handle_spin_change(event: any) {
        this.setState((state: DiceRollerState) => {
            return Object.assign({}, state, { dice_count: event.target.value });
        });
    }

    handle_submit(event: any) {
        let new_text = ": ";
        let results: number[] = []; 

        for (let i = 0; i < this.state.dice_count; i++) {
            results.push(get_random_num(this.props.dice_type) + 1);
            new_text += "" + results[i];
            if (i != this.state.dice_count - 1) {
                new_text += " + ";
            }
        }

        if (results.length > 1) {
            new_text += " = " + results.reduce((sum: number, elem: number) => { return sum + elem; });
        }

        console.log("New text is ", new_text);

        this.setState((state: DiceRollerState) => {
            return Object.assign({}, state, { current_text: new_text });
        });
    }

    render() {
        return (
            <form>
              <table>
                <tr>
                  <td>Roll </td>
                  <td><input type="number" min={1} value={this.state.dice_count} onChange={this.handle_spin_change.bind(this)} /></td>
                  <td>d{this.props.dice_type}</td>
                  <td><input type="button" value="Submit" onClick={this.handle_submit.bind(this)} /></td>
                  <td>{this.state.current_text}</td>
                </tr>
              </table>
            </form>
        );
    }
}

$(() => {
    console.log("Launching...");
    let element = document.getElementById("main");
    if (element != undefined) {
        // @ts-ignore
        render((
            <div>
                <DiceRoller dice_type={2} />
                <DiceRoller dice_type={4} />
                <DiceRoller dice_type={6} />
                <DiceRoller dice_type={8} />
                <DiceRoller dice_type={10} />
                <DiceRoller dice_type={12} />
                <DiceRoller dice_type={20} />
                <DiceRoller dice_type={100} />
            </div>
        ), element);
    }
});
