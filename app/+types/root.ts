export interface Route {
    LinksFunction: () => Array<{
        rel: string;
        href: string;
        crossOrigin?: string;
    }>;

    ErrorBoundaryProps: {
        error: unknown;
    };

    ComponentProps: {
        loaderData?: unknown;
    };
}