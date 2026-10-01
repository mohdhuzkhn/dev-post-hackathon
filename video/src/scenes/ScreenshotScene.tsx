import {AbsoluteFill, CanvasImage, Interactive, interpolate, staticFile, useCurrentFrame} from 'remotion';
export const ScreenshotScene = ({image,title}: {image:number;title:string;step?:string}) => {
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{backgroundColor:'#f4f5ef',fontFamily:'Arial, sans-serif',color:'#182e36'}}>
 <Interactive.Div name="Tagline" style={{position:'absolute',left:76,right:76,top:76,fontSize:64,fontWeight:600,opacity:interpolate(frame,[0,15],[0,1],{extrapolateRight:'clamp'})}}>{title}</Interactive.Div>
 <Interactive.Div name="Screenshot" style={{position:'absolute',left:60,top:200,width:1800,height:810,display:'flex',alignItems:'center',justifyContent:'center',scale:interpolate(frame,[0,168],[0.985,1],{extrapolateRight:'clamp'})}}>
 <CanvasImage src={staticFile(`download (${image}).png`)} style={{width:'100%',height:'100%',objectFit:'contain'}} />
 </Interactive.Div></AbsoluteFill>;
};
