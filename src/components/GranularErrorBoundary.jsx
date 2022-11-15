import React from "react";

export class GranularErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch() {
    this.props.onError?.(this.state.error);
  }

  tryAgain = () => this.setState({ error: null });

  render() {
    const fallbackProps = { error: this.state.error, tryAgain: this.tryAgain };
    const { fallback, children } = this.props;

    if (!fallback) {
      throw new Error("Granular Error Boundary requires a fallback prop");
    }

    if (this.state.error && typeof fallback === "function") {
      return fallback(fallbackProps);
    }

    return children;
  }
}
