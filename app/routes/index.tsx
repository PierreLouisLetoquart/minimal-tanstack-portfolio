import { createFileRoute } from "@tanstack/react-router";

import { LinkButton } from "@/components/LinkButton";
import { Section, SectionList, SectionTitle } from "@/components/Section";

import d from "@/content.json";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Separator } from "@/components/Separator";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="py-32 space-y-16">
      <div>
        <h1 className="font-semibold tracking-tight">{d.name}</h1>
        <p className="font-light">{d.bio}</p>
      </div>

      <Section>
        <SectionTitle>Today</SectionTitle>
        <p className="font-light leading-7">{d.today}</p>
      </Section>

      <Section>
        <SectionTitle>Projects</SectionTitle>
        <SectionList fallback={"No projects yet."} list={d.projects} />
      </Section>

      <Section>
        <SectionTitle>Writing</SectionTitle>
        <SectionList fallback={"No articles yet."} list={d.articles} />
      </Section>

      <div className="flex items-center gap-8">
        {d.socials.map((social) => (
          <LinkButton key={200 + Math.random() * 100} href={social.url}>
            {social.title}
          </LinkButton>
        ))}
        <Separator
          className="data-[orientation=vertical]:h-4"
          orientation="vertical"
        />
        <ThemeToggle />
      </div>
    </div>
  );
}
