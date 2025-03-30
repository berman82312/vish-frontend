export default function Form({ children }: { children: React.ReactNode }) {
    return (
        <form className="max-w-sm mx-auto flex flex-col gap-4" method="POST">
            {children}
        </form>
    );
}
