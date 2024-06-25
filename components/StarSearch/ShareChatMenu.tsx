import { HiOutlineShare } from "react-icons/hi";
import { BsLink45Deg, BsTwitterX } from "react-icons/bs";
import { FiLinkedin } from "react-icons/fi";
import { useRef, useState } from "react";
import { LinkIcon } from "@primer/octicons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";

interface ShareMenuProps {
  shareUrl: string | null | undefined;
  copyLinkHandler: (url: string) => Promise<void>;
  createLink?: () => void;
}

export function ShareChatMenu({ shareUrl, copyLinkHandler, createLink }: ShareMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let twitterUrl = "https://twitter.com/intent/tweet";
  let linkedInUrl = "https://www.linkedin.com/sharing/share-offsite/";

  const handleClick = async () => {
    if (!createLink) return;

    setIsLoading(true);
    try {
      await createLink();
      if (shareUrl) {
        await copyLinkHandler(shareUrl);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  if (shareUrl) {
    const twitterParams = new URLSearchParams();
    const linkedinParams = new URLSearchParams();
    twitterParams.set("text", `Here's my StarSearch prompt!\n\nTry it out for yourself. #StarSearch`);
    twitterParams.set("url", shareUrl);
    twitterUrl += `?${twitterParams}`;

    linkedinParams.set("url", shareUrl);
    linkedInUrl += `?${linkedinParams}`;
  }

  return (
    <DropdownMenu open={dropdownOpen} modal={false}>
      <DropdownMenuTrigger onClick={() => setDropdownOpen(!dropdownOpen)} aria-label="Share prompt options">
        <HiOutlineShare width={22} height={22} />
      </DropdownMenuTrigger>

      <DropdownMenuContent ref={dropdownRef} align="end" className="flex flex-col gap-1 py-2 rounded-lg">
        {createLink ? (
          <DropdownMenuItem className="pl-4 rounded-md">
            <button className="flex items-center w-full gap-1" onClick={handleClick} disabled={isLoading}>
              {isLoading ? (
                <svg
                  aria-hidden="true"
                  className="inline w-3 text-gray-200 animate-spin dark:text-gray-600 fill-red-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                <LinkIcon size={12} />
              )}
              <span> Create Share Link</span>
            </button>
          </DropdownMenuItem>
        ) : (
          <>
            {shareUrl ? (
              <>
                <DropdownMenuItem className="rounded-md">
                  <a
                    href={twitterUrl}
                    target="_blank"
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                    className="flex gap-2.5 py-1 items-center pl-3 pr-7"
                  >
                    <BsTwitterX size={22} />
                    <span>Share to Twitter/X</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md">
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                    className="flex gap-2.5 py-1 items-center pl-3 pr-7"
                  >
                    <FiLinkedin size={22} />
                    <span>Share to LinkedIn</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await copyLinkHandler(shareUrl);
                    setDropdownOpen(false);
                  }}
                  className="rounded-md"
                >
                  <div className="flex gap-2.5 py-1 items-center pl-3 pr-7 cursor-pointer">
                    <BsLink45Deg size={22} />
                    <span>Copy link</span>
                  </div>
                </DropdownMenuItem>
              </>
            ) : null}
          </>
        )}
        <p className="px-4 pt-3 ml-0 text-xs border-t text-light-slate-11">Creating a link makes this chat public</p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
