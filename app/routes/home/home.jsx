import finpilotTextureLarge from '~/assets/finpilot-app-large.jpg';
import finpilotTexturePlaceholder from '~/assets/finpilot-app-placeholder.jpg';
import finpilotTexture from '~/assets/finpilot-app.jpg';
import sliceTextureLarge from '~/assets/slice-app-large.jpg';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceTexture from '~/assets/slice-app.jpg';
import sprTextureLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from '~/assets/spr-lesson-builder-dark.jpg';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Developer + Designer',
    description: `Portfolio of ${config.name} — Full Stack Developer & AI Engineer building high-performance web applications, intelligent systems, and interactive 3D experiences.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details].filter(
      section => section && section.current
    );

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      if (section && section.current) {
        sectionObserver.observe(section.current);
      }
    });

    if (intro.current) {
      indicatorObserver.observe(intro.current);
    }

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Designing the future of travel stays"
        description="Engineering Stayria — a next-generation travel platform featuring real-time Mapbox geospatial visualization, Cloudinary media optimization, and hybrid MongoDB & MySQL database architecture."
        buttonText="View project"
        buttonLink="https://stayria.onrender.com"
        model={{
          type: 'laptop',
          alt: 'Stayria luxury travel platform',
          textures: [
            {
              srcSet: `${sprTexture} 1280w, ${sprTextureLarge} 2560w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Automating PR code intelligence"
        description="Building an AI-powered GitHub pull request code reviewer with FastAPI BackgroundTasks, Pydantic structured schemas, and SQLite commit deduplication."
        buttonText="View code"
        buttonLink="https://github.com/sanskritig007/AI-reviewer"
        model={{
          type: 'laptop',
          alt: 'AI Code Reviewer for GitHub PRs',
          textures: [
            {
              srcSet: `${sliceTexture} 800w, ${sliceTextureLarge} 1920w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Intelligent personal finance studio"
        description="Engineering FinPilot AI — a privacy-first personal finance operating system with deterministic double-entry calculations, autonomous subscription discovery, purchase stress-testing, and Gemini 2.5 Flash advisory."
        buttonText="View code"
        buttonLink="https://github.com/sanskritig007/Finpilot"
        model={{
          type: 'laptop',
          alt: 'FinPilot AI intelligent personal finance operating system',
          textures: [
            {
              srcSet: `${finpilotTexture} 800w, ${finpilotTextureLarge} 1920w`,
              placeholder: finpilotTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
