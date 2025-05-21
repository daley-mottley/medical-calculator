import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { toast } from "./use-toast";
import { apiClient } from "@/lib/apiClient";
import { Info, Send, Vote, Star } from "lucide-react";

export const SuggestionBox = () => {
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_CHARS = 500;

  // Restore rating modal state and handler
  const [ratingOpen, setRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);

  useEffect(() => {
    setCharCount(suggestion.length);
  }, [suggestion]);

  useEffect(() => {
    if (open && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) {
      toast({
        title: "Suggestion required",
        description: "Please enter your suggestion before submitting.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      await apiClient.post("/api/send-suggestion", {
        suggestion,
        to: "daley.mottley@hotmail.com",
      });
      toast({
        title: "Thank you!",
        description: "Your suggestion has been sent.",
      });
      setSuggestion("");
      setOpen(false);
    } catch (err) {
      toast({
        title: "Failed to send",
        description: "There was a problem sending your suggestion. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setRatingLoading(true);
    try {
      await apiClient.post("/api/send-suggestion", {
        suggestion: `App Rating: ${rating} star(s)`,
        to: "daley.mottley@hotmail.com",
      });
      toast({
        title: "Thank you!",
        description: "Your rating has been submitted.",
      });
      setRating(0);
      setRatingOpen(false);
    } catch (err) {
      toast({
        title: "Failed to send",
        description: "There was a problem submitting your rating. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setRatingLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button with Tooltip and Animation */}
      <div className="fixed z-50 bottom-6 right-6 flex flex-col items-end">
        <div className="mb-2">
          <span className="bg-[#9b87f5] text-white text-xs px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-focus-within:opacity-100 pointer-events-none select-none">
            Suggestion Box
          </span>
        </div>
        <button
          className="group relative bg-[#9b87f5] hover:bg-[#7E69AB] text-white rounded-full shadow-xl p-4 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] animate-bounce hover:animate-none"
          onClick={() => setOpen(true)}
          aria-label="Open suggestion box"
          tabIndex={0}
        >
          <Vote className="w-7 h-7" />
        </button>
      </div>
      {/* Modal Dialog */}
      <Dialog open={open} onOpenChange={o => { setOpen(o); if (o) setRatingOpen(false); }}>
        <DialogContent className="p-0 bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto border-0">
          <DialogHeader className="px-6 pt-6 pb-2 flex flex-row items-center justify-between border-b border-[#E5DEFF]">
            <div className="flex items-center gap-2">
              <Vote className="text-[#9b87f5] w-6 h-6" />
              <DialogTitle className="text-[#6E59A5] text-lg font-bold">Suggestion Box</DialogTitle>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" aria-label="Close suggestion box">
                <span className="sr-only">Close</span>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </Button>
            </DialogClose>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="px-6 pt-4 pb-6 flex flex-col gap-4">
            <DialogDescription className="flex items-center gap-2 text-[#7E69AB] mb-2">
              <Info className="w-8 h-8" />
              We value your feedback! Please share your suggestions to help us improve MedicMindAssist.
            </DialogDescription>
            <label htmlFor="suggestion-textarea" className="sr-only">Your suggestion</label>
            <Textarea
              id="suggestion-textarea"
              ref={textareaRef}
              value={suggestion}
              onChange={e => {
                if (e.target.value.length <= MAX_CHARS) setSuggestion(e.target.value);
              }}
              placeholder="Type your suggestion here..."
              className="mb-1 min-h-[100px] resize-none focus:ring-2 focus:ring-[#8B5CF6]"
              disabled={loading}
              required
              aria-required="true"
              aria-label="Your suggestion"
              maxLength={MAX_CHARS}
            />
            <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
              <span>{charCount} / {MAX_CHARS} characters</span>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button type="submit" disabled={loading || !suggestion.trim()} className="flex items-center gap-2">
                {loading ? (
                  <span className="flex items-center gap-1">
                    <svg className="animate-spin h-4 w-4 mr-1 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                    Sending...
                  </span>
                ) : (
                  <><Send className="w-4 h-4" /> Send</>
                )}
              </Button>
            </div>
          </form>
          {/* Rate It Link */}
          <div className="px-6 pb-4 flex justify-end">
            <button
              type="button"
              className="text-[#8B5CF6] hover:underline text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] rounded"
              onClick={() => { setOpen(false); setRatingOpen(true); }}
              tabIndex={0}
            >
              Rate It
            </button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Rating Modal */}
      <Dialog open={ratingOpen} onOpenChange={o => { setRatingOpen(o); if (o) setOpen(false); }}>
        <DialogContent className="p-0 bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto border-0">
          <DialogHeader className="px-6 pt-6 pb-2 flex flex-row items-center justify-between border-b border-[#E5DEFF]">
            <DialogTitle className="text-[#6E59A5] text-lg font-bold flex items-center gap-2">
              <Star className="text-[#8B5CF6] w-6 h-6" fill="#8B5CF6" />
              Rate MedicMindAssist
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" aria-label="Close rating modal">
                <span className="sr-only">Close</span>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </Button>
            </DialogClose>
          </DialogHeader>
          <form onSubmit={handleRatingSubmit} className="px-6 pt-4 pb-6 flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 mb-2" role="radiogroup" aria-label="Star rating">
                {[1,2,3,4,5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`w-12 h-12 transition-colors ${((hoverRating || rating) >= star) ? 'text-[#8B5CF6] fill-[#8B5CF6]' : 'text-[#E5DEFF] fill-[#E5DEFF]'}`}
                      fill={((hoverRating || rating) >= star) ? '#8B5CF6' : '#E5DEFF'}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button type="submit" disabled={ratingLoading || rating === 0} className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#9b87f5] text-white">
                {ratingLoading ? (
                  <span className="flex items-center gap-1">
                    <svg className="animate-spin h-4 w-4 mr-1 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                    Submitting...
                  </span>
                ) : (
                  <>Submit</>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}; 