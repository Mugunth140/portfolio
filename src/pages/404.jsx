import Link from "next/link";
import Btn from "@/components/Btn/btn";

export default function NotFound() {
  return (
    <div className="error-container">
      <h1 className="error-title">404</h1>
      <div className="error-notfound">
        <p>Congratulations! You&apos;ve discovered a page that doesn&apos;t exist.</p>
      </div>
      <div className="error-btn">
        <Link href="/">
          <Btn>
            <p>Go Back</p>
          </Btn>
        </Link>
      </div>
    </div>
  );
}
