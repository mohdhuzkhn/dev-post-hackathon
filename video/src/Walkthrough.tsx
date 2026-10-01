import {TransitionSeries,linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {Scene1} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';
import {Scene3} from './scenes/Scene3';
import {Scene4} from './scenes/Scene4';
import {Scene5} from './scenes/Scene5';
import {Scene6} from './scenes/Scene6';
import {Scene7} from './scenes/Scene7';
import {Scene8} from './scenes/Scene8';
export const Walkthrough=()=> <TransitionSeries>
<TransitionSeries.Sequence durationInFrames={168} name="Hero Section"><Scene1 /></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:18})} />
<TransitionSeries.Sequence durationInFrames={168} name="Writing Idea"><Scene2 /></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:18})} />
<TransitionSeries.Sequence durationInFrames={168} name="Functionality Starts"><Scene3 /></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:18})} />
<TransitionSeries.Sequence durationInFrames={168} name="First 3 factors to test first"><Scene4 /></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:18})} />
<TransitionSeries.Sequence durationInFrames={168} name="Detailed Summary on Customer Demand"><Scene5 /></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:18})} />
<TransitionSeries.Sequence durationInFrames={168} name="Then on competition"><Scene6 /></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:18})} />
<TransitionSeries.Sequence durationInFrames={168} name="Discuss about pricing"><Scene7 /></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:18})} />
<TransitionSeries.Sequence durationInFrames={168} name="In the last Operations"><Scene8 /></TransitionSeries.Sequence>
</TransitionSeries>;
