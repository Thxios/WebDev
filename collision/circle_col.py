import numpy as np




def vector(x, y):
    return np.array([x, y])

def magnitude(x):
    return np.sqrt(np.dot(x, x))

def unit(x):
    return x / magnitude(x)

def proj_matrix(x):
    _x = unit(x)
    _mat = np.array([
        [_x[0], _x[1]],
        [-_x[1], _x[0]]
    ])
    return _mat

class Circle:
    def __init__(self, center, radius):
        self.p = center
        self.r = radius

class Line:
    def __init__(self, start, end):
        self.s = start
        self.e = end
        self.vec = end - start
        self.len = magnitude(self.vec)

        self.transform = proj_matrix(self.vec)

    def projection(self, vec):
        return np.dot(self.transform, vec)
        

def check_collision(pos, v, r):
    pp = np.dot(pos, pos)
    vv = np.dot(v, v)
    pv = np.dot(pos, v)
    rr = r * r

    _t = (-pv - np.sqrt(pv ** 2 - vv * (pp - rr))) / vv

    if _t < 0 or _t > 1:
        return -1
    return _t

def c_c_collision(c1, v1, c2, v2):
    rel_pos = c1.p - c2.p
    rel_v = v1 - v2
    rel_d = c1.r + c2.r

    _t = check_collision(rel_pos, rel_v, rel_d)
    return _t

def c_l_collision(c, v, line):
    rel_pos = line.projection(c.p)
    rel_v = line.projection(v)

    



a = vector(3, 4)
mat = proj_matrix(vector(2, 1))
print(unit(vector(2, 1)))
print(a)
print(mat)
print(np.dot(mat, a))


