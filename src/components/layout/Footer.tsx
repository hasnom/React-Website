export function Footer() {
    return (
        <footer className="relative z-10 border-t border-card-border py-8 px-[5%] text-center text-text-muted text-[13px]">
            <p className="mb-2">Hassan Noman · Product Leader, Digital Banking & Fintech</p>
            <p className="text-[12px] text-[#3a4a66]">
                © {new Date().getFullYear()} www.hassannoman.com | Re-built with React & Next.js
            </p>
        </footer>
    );
}
