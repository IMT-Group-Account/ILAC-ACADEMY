import React from 'react';

interface DubaiVisualBreakProps {
  variant: 'skyline' | 'night' | 'marina';
}

export const DubaiVisualBreak: React.FC<DubaiVisualBreakProps> = ({ variant }) => {
  if (variant === 'skyline') {
    return (
      <section className="relative h-60 sm:h-72 md:h-88 w-full overflow-hidden border-y border-[#222127]">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
          alt="Dubai Downtown skyline"
          className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
          referrerPolicy="no-referrer"
        />
        {/* Seamless edge blending gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/70 via-transparent to-[#09090B]/70" />
      </section>
    );
  }

  if (variant === 'night') {
    return (
      <section className="relative h-60 sm:h-72 md:h-88 w-full overflow-hidden border-y border-[#222127]">
        <img
          src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2000&q=85"
          alt="Dubai Sheikh Zayed Road night cityscape"
          className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
          referrerPolicy="no-referrer"
        />
        {/* Seamless edge blending gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/70 via-transparent to-[#09090B]/70" />
      </section>
    );
  }

  // marina / waterfront
  return (
    <section className="relative h-60 sm:h-72 md:h-88 w-full overflow-hidden border-y border-[#222127]">
      <img
        src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=2000&q=85"
        alt="Dubai Marina & waterfront"
        className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
        referrerPolicy="no-referrer"
      />
      {/* Seamless edge blending gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/70 via-transparent to-[#09090B]/70" />
    </section>
  );
};
