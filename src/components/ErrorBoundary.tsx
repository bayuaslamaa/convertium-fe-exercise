import { Component, ErrorInfo, ReactNode } from "react";
import { Link, } from "react-router-dom";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

// Function to determine if an error is related to a specific React issue
const isReactError418 = (error: Error | undefined): boolean => {
    if (!error) return false;
    return error.message.includes("Minified React error #418") ||
        error.message.includes("text") ||
        error.message.includes("args[]");
};

class ErrorBoundaryClass extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // You can log the error to an error reporting service here
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({ errorInfo });

        // Log detailed info for React error #418
        if (isReactError418(error)) {
            console.error("React Error #418 detected. This often relates to text content rendering issues.");
            console.error("Check the components that are being rendered for null/undefined text content.");
        }
    }

    render(): ReactNode {
        if (this.state.hasError) {
            const isError418 = isReactError418(this.state.error);

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h1>
                        <p className="text-gray-600 mb-6">
                            We're sorry, but there was an error loading this page.
                        </p>

                        {isError418 && (
                            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded text-yellow-800">
                                <p className="font-medium">React Error #418 Detected</p>
                                <p className="text-sm">This may be related to issues with text content or component props.</p>
                            </div>
                        )}

                        <div className="mb-6 p-4 bg-gray-100 rounded text-left overflow-auto max-h-40">
                            <pre className="text-xs text-red-600">
                                {this.state.error?.toString() || "Unknown error"}
                            </pre>
                            {this.state.errorInfo && (
                                <details className="mt-2">
                                    <summary className="text-xs text-gray-700 cursor-pointer">View component stack</summary>
                                    <pre className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">
                                        {this.state.errorInfo.componentStack}
                                    </pre>
                                </details>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                            >
                                Refresh Page
                            </button>
                            <Link
                                to="/"
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                            >
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// This wrapper ensures we can use the updated ErrorBoundary component
// without issues related to React Router hooks
const ErrorBoundary = (props: Props) => {
    return <ErrorBoundaryClass {...props} />;
};

export default ErrorBoundary; 