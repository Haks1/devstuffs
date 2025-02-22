vec2 primeCircleFolding(vec2 z, int i, float OneUnitScale)
{
float OneUnitScalePow =float(i);
float OneUnitTarget =1.0;

vec2 cur = z;



cur = cround(cpow(z,vec2(-OneUnitScalePow,0.0)));


//vec2 cur = cround(cpow((z), vec2 (float(-i),0.0)));

/*	if (
	(z.x < 0.0 || z.y < 0.0) || (z.x > 1.0 || z.y > 1.0)
	
	|| (cur != vec2 (OneUnitTarget,0.0)
	&& cur != vec2 (-OneUnitTarget,0.0)
	&& cur != vec2 (0.0, -OneUnitTarget)
	&& cur != vec2 (0.0, OneUnitTarget)))
		return vec2(0.0,-4);
*/		

        if (cur == vec2(OneUnitTarget ,0.0))
           return vec2(5.0,1.0);
        if (cur == vec2(-(OneUnitTarget),0.0))
           return vec2(-5,-1);
        if (cur == vec2(0.0,OneUnitTarget ))
           return vec2(-1,5);
        if (cur == vec2(0.0,-(OneUnitTarget )))
           return vec2(1,-5);

/*if (cur == vec2((OneUnitTarget) ,0.0))
return (z);
    if (cur == vec2(-(OneUnitTarget),0.0))
return (z);
     if (cur == vec2(0.0,(OneUnitTarget)))
        return (z);
     if (cur == vec2(0.0,-(OneUnitTarget)))
        return (z);*/
      return (z);
}


vec2 mapping(vec2 z) {
  vec2 c = z;
  bool toggleBands = false;
  bool toggleUnitP = true;
  bool toggleUnitC = true;
  bool toggleHalf = true;
  
  bool toggleLines = true;
  bool toggleDiags = true;
  float LineScale =500.0; 
  float DiagScale =500.0; 

  bool toggleUnitMask = false;
  float OneUnitScale= 20.0;//100000000000000000000000000000000000000000.0;
  float OneUnitScalePow =-20.0; 
  float OneUnitTarget =1.0; 


/*  for (int i=67; i>0; i--) {
    z = primeCircleFolding((z),i, OneUnitScale);
    */
    for (int i=0; i<1; i++) {
    
    z = czeta(z);
    //cdiv((cdiv(czeta(z),csinh(z))),vec2(PI,0.0));
    
    if (toggleUnitP)
    {
        if (cround(cmul(z,vec2(OneUnitScale,0.0))) == vec2(OneUnitScale,0.0))
           return vec2(5.0,1.0);
        if (cround(cmul(z,vec2(OneUnitScale,0.0))) == vec2(-(OneUnitScale),0.0))
           return vec2(-5,-1);
        if (cround(cmul(z,vec2(OneUnitScale,0.0))) == vec2(0.0,OneUnitScale))
           return vec2(-1,5);
        if (cround(cmul(z,vec2(OneUnitScale,0.0))) == vec2(0.0,-(OneUnitScale)))
           return vec2(1,-5);
    }

        
  }

if (toggleHalf)
  {
      if (cround(cabs(cmul(z,vec2(128.0,0.0)))) == cmul(vec2(128.0 ,0.0), vec2(0.5 ,0.0)))
        return vec2(-22.0,-33.01);
  }

if (toggleLines)
  {
if (cround(cimag(z * LineScale)) 
 == cround(vec2(0.0, 0.0)))
 if (z.x > 0.0)
    return vec2(-100000.0,0.0);
  else
    return vec2(100000.0,0.0);
  
  if (cround(creal(z * LineScale)) 
 == cround(vec2(0.0, 0.0)))
 if (z.y > 0.0)
  return vec2(0.0,-100000.0);
  else
    return vec2(0.0,100000.0);
  }

  if (toggleDiags)
  {
        if ((cround(creal(z * DiagScale)) 
        == cround(cimag(z * DiagScale))) || (cround(creal(z * DiagScale)) 
        == cround(cimag(z * -DiagScale))))
        {
        if (cfloor(z) == vec2(0,0))
            return vec2(-1.0,0.0);
            return vec2(1.0,-1.0);
        }
        if (((z.x < 1.0 && z.y < 1.0) && (z.x > 0.9 && z.y > 0.9)))
            return vec2(0.06,-0);
    }
    
    if (toggleUnitP)
    {
        if (cround(cmul(z,vec2(OneUnitScale,0.0))) == vec2(OneUnitScale,0.0))
           return vec2(5.0,1.0);
        if (cround(cmul(z,vec2(OneUnitScale,0.0))) == vec2(-(OneUnitScale),0.0))
           return vec2(-5,-1);
        if (cround(cmul(z,vec2(OneUnitScale,0.0))) == vec2(0.0,OneUnitScale))
           return vec2(-1,5);
        if (cround(cmul(z,vec2(OneUnitScale,0.0))) == vec2(0.0,-(OneUnitScale)))
           return vec2(1,-5);
    }
    if (toggleUnitMask)
    {
        if (
        (z.x < -1.0 || z.y < -1.0) || (z.x > 1.0 || z.y > 1.0))
    return vec2(0.0,-0.00001);
    }
        
    if (toggleUnitC)
          {
          if (cround(cpow(z,vec2(OneUnitScalePow,0.0))) == vec2((OneUnitTarget) ,0.0))
        return vec2(0.06,-0.001);
    if (cround(cpow(z,vec2(OneUnitScalePow,0.0))) == vec2(-(OneUnitTarget),0.0))
        return vec2(-0.06,0.001);
     if (cround(cpow(z,vec2(OneUnitScalePow,0.0))) == vec2(0.0,(OneUnitTarget)))
        return vec2(0.001,-0.06);
     if (cround(cpow(z,vec2(OneUnitScalePow,0.0))) == vec2(0.0,-(OneUnitTarget)))
        return vec2(-0.001,0.06);
}
  if (!toggleBands)
    return z;
    
  if (((z.y <= 0.1 && z.y >= -0.1) || (z.x <= 0.1 && z.x >= -0.1)) || (z.y == 0.0 && z.x == 0.0) || (z.y >= 0.9 && z.x >= 0.9)|| (z.y <= -0.9 && z.x <= -0.9)|| (z.y >= 0.9 && z.x <= -0.9)|| (z.y <= -0.9 && z.x >= 0.9))
  {
      return (z);
  }
  else if ((z.y >= 0.9 && z.y <= 1.0) || (z.x <= -0.9 && z.x >= -1.0) || (z.y <= -0.9 && z.y >= -1.0) || (z.x >= 0.9 && z.x <= 1.0))
     return vec2(-1.0, 0.06); return vec2(-100000000,100000000);
}
