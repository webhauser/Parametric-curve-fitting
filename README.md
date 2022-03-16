# Parametric curve fitting

Implementation of a method for obtaining parametric equations of a smooth curve that passes through a sequence of points based on empirical data.
The parametric curve fitting method used here is superior to cubic splines interpolation in simplicity and speed, also not slicing the curve to subsegments.
The parametric representation allows walking through the whole curve as the parameter goes from 0 to 1.

#### 3 digitized curve data (2d points)
#### Drawing the whole curve once from the digitized data.
#### Animating the walk-through of the curve like drawing by hand.

PAPER: Parametric curve fitting: An alternativeto Lagrange interpolation and spline, Yilmaz Akyildiza
COMPUTERS IN PHYSICS,VOL8,NO,6,NOV/DEC 1994
