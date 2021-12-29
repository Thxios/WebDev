import numpy as np



def vector(x, y):
  return np.array([x, y])

def square(x):
  return np.dot(x, x)


class Circle:
  def __init__(self, center, radius):
    self.p = center
    self.r = radius


def check_collision(pos, v, r):
  pp = square(pos)
  vv = square(v)
  pv = np.dot(pos, v)
  rr = r * r

  _t = (-pv - np.sqrt(pv**2 - vv*(pp - rr))) / vv

  if _t < 0 or _t > 1:
    return -1
  return _t

def circle_collision(c1, v1, c2, v2):
  rel_pos = c1.p - c2.p
  rel_v = v1 - v2
  rel_d = c1.r + c2.r

  _t = check_collision(rel_pos, rel_v, rel_d)
  return _t


a = Circle(vector(-1, 2), 1)
origin = Circle(vector(0, 0), 0)
print(circle_collision(a, vector(3, -4), origin, vector(0, 0)))

