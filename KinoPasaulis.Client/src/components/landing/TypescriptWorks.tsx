import * as React from 'react';

export default class TypescriptWorks extends React.Component<ITypescriptWorksProps, ITypescriptWorksState> {
  constructor(props: ITypescriptWorksProps) {
    super(props);

    this.state = {
      text: 'State also works!'
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        Typescript works! {this.props.title} {this.state.text}
      </div>
    );
  }
}