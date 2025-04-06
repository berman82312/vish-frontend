export default function Form(props: React.FormHTMLAttributes<HTMLFormElement>) {
    const { children, ...rest } = props;
    return (
        <form
            className="w-full mx-auto flex flex-col gap-4"
            method="POST"
            {...rest}
        >
            {children}
        </form>
    );
}
