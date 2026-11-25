import { type CoursePart } from "./types";

interface PartProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = (props: PartProps) => {
  switch (props.coursePart.kind) {
    case "basic":
      return (
        <>
          <div>
            <b>
              {props.coursePart.name} {props.coursePart.exerciseCount}
            </b>
          </div>
          <div>{props.coursePart.description}</div>
        </>
      );
    case "background":
      return (
        <>
          <div>
            <b>
              {props.coursePart.name} {props.coursePart.exerciseCount}
            </b>
          </div>
          <div>{props.coursePart.description}</div>
          <div>read more at {props.coursePart.backgroundMaterial}</div>
        </>
      );

    case "group":
      return (
        <>
          <div>
            <b>
              {props.coursePart.name} {props.coursePart.exerciseCount}
            </b>
          </div>
          <div>project exercises {props.coursePart.groupProjectCount}</div>
        </>
      );
    case "special":
      return (
        <>
          <div>
            <b>
              {props.coursePart.name} {props.coursePart.exerciseCount}
            </b>
          </div>
          <div>{props.coursePart.description}</div>
          <div>required skills: {props.coursePart.requirements.join(", ")}</div>
        </>
      );
    default:
      return assertNever(props.coursePart);
  }
};

export default Part;
