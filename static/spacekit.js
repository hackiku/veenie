var Spacekit = (() => {
	var gm = Object.create;
	var ys = Object.defineProperty;
	var vm = Object.getOwnPropertyDescriptor;
	var xm = Object.getOwnPropertyNames,
		Du = Object.getOwnPropertySymbols,
		ym = Object.getPrototypeOf,
		Ru = Object.prototype.hasOwnProperty,
		wm = Object.prototype.propertyIsEnumerable,
		Qn = Math.pow,
		Pu = (r, e, t) => e in r ? ys(r, e, {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: t
		}) : r[e] = t,
		Lu = (r, e) => {
			for (var t in e || (e = {})) Ru.call(e, t) && Pu(r, t, e[t]);
			if (Du)
				for (var t of Du(e)) wm.call(e, t) && Pu(r, t, e[t]);
			return r
		};
	var Iu = r => ys(r, "__esModule", {
		value: !0
	});
	var bm = (r, e) => () => (e || r((e = {
		exports: {}
	}).exports, e), e.exports),
		Bu = (r, e) => {
			Iu(r);
			for (var t in e) ys(r, t, {
				get: e[t],
				enumerable: !0
			})
		},
		Am = (r, e, t) => {
			if (e && typeof e == "object" || typeof e == "function")
				for (let n of xm(e)) !Ru.call(r, n) && n !== "default" && ys(r, n, {
					get: () => e[n],
					enumerable: !(t = vm(e, n)) || t.enumerable
				});
			return r
		},
		Uu = r => Am(Iu(ys(r != null ? gm(ym(r)) : {}, "default", r && r.__esModule && "default" in r ? {
			get: () => r.default,
			enumerable: !0
		} : {
			value: r,
			enumerable: !0
		})), r);
	var qt = (r, e, t) => new Promise((n, i) => {
		var s = l => {
			try {
				o(t.next(l))
			} catch (c) {
				i(c)
			}
		},
			a = l => {
				try {
					o(t.throw(l))
				} catch (c) {
					i(c)
				}
			},
			o = l => l.done ? n(l.value) : Promise.resolve(l.value).then(s, a);
		o((t = t.apply(r, e)).next())
	});
	var gu = bm((FE, ps) => {
		ps.exports = Ub;
		ps.exports.toDate = Fb;
		ps.exports.toJulianDay = Up;
		ps.exports.toMillisecondsInJulianDay = Fp;
		ps.exports.fromJulianDayAndMilliseconds = Ob;
		var fs = 864e5,
			Ip = fs / 2,
			Bp = 24405875e-1,
			Bb = 2440587;

		function Ub(r) {
			return (Up(r) + Fp(r) / fs).toFixed(6)
		}

		function Fb(r) {
			return new Date((Number(r) - Bp) * fs)
		}

		function Up(r) {
			return ~~((+r + Ip) / fs) + Bb
		}

		function Fp(r) {
			return (+r + Ip) % fs
		}

		function Ob(r, e) {
			return (r - Bp) * fs + e
		}
	});
	var dE = {};
	Bu(dE, {
		Ephem: () => Rt,
		EphemPresets: () => rn,
		EphemerisTable: () => nn,
		GM: () => ds,
		KeplerParticles: () => cr,
		NaturalSatellites: () => Qo,
		Orbit: () => jn,
		OrbitType: () => St,
		RotatingObject: () => gs,
		ShapeObject: () => $o,
		Simulation: () => cm,
		Skybox: () => el,
		SkyboxPresets: () => aE,
		SpaceObject: () => ms,
		SpaceObjectPresets: () => rE,
		SphereObject: () => tl,
		Stars: () => ma,
		StaticParticles: () => nl,
		THREE: () => hE
	});
	var lu = {};
	Bu(lu, {
		ACESFilmicToneMapping: () => ch,
		AddEquation: () => Ci,
		AddOperation: () => sh,
		AdditiveAnimationBlendMode: () => Sl,
		AdditiveBlending: () => Ti,
		AlphaFormat: () => vh,
		AlwaysDepth: () => Ku,
		AlwaysStencilFunc: () => cd,
		AmbientLight: () => cs,
		AmbientLightProbe: () => jc,
		AnimationClip: () => ss,
		AnimationLoader: () => Of,
		AnimationMixer: () => $c,
		AnimationObjectGroup: () => Kc,
		AnimationUtils: () => rt,
		ArcCurve: () => po,
		ArrayCamera: () => Za,
		ArrowHelper: () => Ap,
		Audio: () => Ho,
		AudioAnalyser: () => Qc,
		AudioContext: () => Vc,
		AudioListener: () => Jf,
		AudioLoader: () => Wc,
		AxesHelper: () => ha,
		AxisHelper: () => rb,
		BackSide: () => Qe,
		BasicDepthPacking: () => cn,
		BasicShadowMap: () => Mm,
		BinaryTextureLoader: () => cb,
		Bone: () => Zs,
		BooleanKeyframeTrack: () => gi,
		BoundingBoxHelper: () => sb,
		Box2: () => sr,
		Box3: () => Bt,
		Box3Helper: () => yp,
		BoxBufferGeometry: () => Gn,
		BoxGeometry: () => Gn,
		BoxHelper: () => au,
		BufferAttribute: () => pe,
		BufferGeometry: () => de,
		BufferGeometryLoader: () => Gc,
		ByteType: () => hh,
		Cache: () => $i,
		Camera: () => oi,
		CameraHelper: () => xp,
		CanvasRenderer: () => hb,
		CanvasTexture: () => wc,
		CatmullRomCurve3: () => go,
		CineonToneMapping: () => lh,
		CircleBufferGeometry: () => Vr,
		CircleGeometry: () => Vr,
		ClampToEdgeWrapping: () => _t,
		Clock: () => Xc,
		Color: () => $,
		ColorKeyframeTrack: () => Ro,
		CompressedTexture: () => lo,
		CompressedTextureLoader: () => Nf,
		ConeBufferGeometry: () => Wr,
		ConeGeometry: () => Wr,
		CubeCamera: () => Os,
		CubeReflectionMapping: () => Di,
		CubeRefractionMapping: () => Ri,
		CubeTexture: () => Gi,
		CubeTextureLoader: () => Bc,
		CubeUVReflectionMapping: () => dr,
		CubeUVRefractionMapping: () => Es,
		CubicBezierCurve: () => ta,
		CubicBezierCurve3: () => vo,
		CubicInterpolant: () => Pc,
		CullFaceBack: () => sl,
		CullFaceFront: () => Ou,
		CullFaceFrontBack: () => Em,
		CullFaceNone: () => Fu,
		Curve: () => Vt,
		CurvePath: () => Cc,
		CustomBlending: () => Hu,
		CustomToneMapping: () => uh,
		CylinderBufferGeometry: () => fi,
		CylinderGeometry: () => fi,
		Cylindrical: () => rp,
		DataTexture: () => Vn,
		DataTexture2DArray: () => zs,
		DataTexture3D: () => Gs,
		DataTextureLoader: () => Uc,
		DataUtils: () => Sp,
		DecrementStencilOp: () => Um,
		DecrementWrapStencilOp: () => Om,
		DefaultLoadingManager: () => Ff,
		DepthFormat: () => Jn,
		DepthStencilFormat: () => Ln,
		DepthTexture: () => ui,
		DirectionalLight: () => Bo,
		DirectionalLightHelper: () => vp,
		DiscreteInterpolant: () => Lc,
		DodecahedronBufferGeometry: () => Yr,
		DodecahedronGeometry: () => Yr,
		DoubleSide: () => Ht,
		DstAlphaFactor: () => ju,
		DstColorFactor: () => Qu,
		DynamicBufferAttribute: () => Qw,
		DynamicCopyUsage: () => Jm,
		DynamicDrawUsage: () => In,
		DynamicReadUsage: () => Qm,
		EdgesGeometry: () => fo,
		EdgesHelper: () => ab,
		EllipseCurve: () => jr,
		EqualDepth: () => eh,
		EqualStencilFunc: () => Gm,
		EquirectangularReflectionMapping: () => bs,
		EquirectangularRefractionMapping: () => As,
		Euler: () => ii,
		EventDispatcher: () => Pt,
		ExtrudeBufferGeometry: () => Sn,
		ExtrudeGeometry: () => Sn,
		FaceColors: () => Ow,
		FileLoader: () => Qt,
		FlatShading: () => ol,
		Float16BufferAttribute: () => ec,
		Float32Attribute: () => nb,
		Float32BufferAttribute: () => ce,
		Float64Attribute: () => ib,
		Float64BufferAttribute: () => tc,
		FloatType: () => ln,
		Fog: () => Or,
		FogExp2: () => Fr,
		Font: () => xb,
		FontLoader: () => vb,
		FrontSide: () => Rn,
		Frustum: () => Rr,
		GLBufferAttribute: () => tu,
		GLSL1: () => $m,
		GLSL3: () => Dl,
		GammaEncoding: () => Ea,
		GreaterDepth: () => nh,
		GreaterEqualDepth: () => th,
		GreaterEqualStencilFunc: () => Ym,
		GreaterStencilFunc: () => Vm,
		GridHelper: () => ar,
		Group: () => En,
		HalfFloatType: () => Ii,
		HemisphereLight: () => Po,
		HemisphereLightHelper: () => fp,
		HemisphereLightProbe: () => Yc,
		IcosahedronBufferGeometry: () => Zr,
		IcosahedronGeometry: () => Zr,
		ImageBitmapLoader: () => kc,
		ImageLoader: () => os,
		ImageUtils: () => Kn,
		ImmediateRenderObject: () => yb,
		IncrementStencilOp: () => Bm,
		IncrementWrapStencilOp: () => Fm,
		InstancedBufferAttribute: () => di,
		InstancedBufferGeometry: () => Oo,
		InstancedInterleavedBuffer: () => eu,
		InstancedMesh: () => io,
		Int16Attribute: () => Kw,
		Int16BufferAttribute: () => Kl,
		Int32Attribute: () => eb,
		Int32BufferAttribute: () => $l,
		Int8Attribute: () => qw,
		Int8BufferAttribute: () => ql,
		IntType: () => fh,
		InterleavedBuffer: () => hi,
		InterleavedBufferAttribute: () => kn,
		Interpolant: () => _n,
		InterpolateDiscrete: () => _s,
		InterpolateLinear: () => Ts,
		InterpolateSmooth: () => ba,
		InvertStencilOp: () => Nm,
		JSONLoader: () => db,
		KeepStencilOp: () => Sa,
		KeyframeTrack: () => $t,
		LOD: () => kr,
		LatheBufferGeometry: () => Jr,
		LatheGeometry: () => Jr,
		Layers: () => Ia,
		LensFlare: () => pb,
		LessDepth: () => $u,
		LessEqualDepth: () => va,
		LessEqualStencilFunc: () => km,
		LessStencilFunc: () => zm,
		Light: () => tn,
		LightProbe: () => us,
		Line: () => kt,
		Line3: () => iu,
		LineBasicMaterial: () => Ke,
		LineCurve: () => Xr,
		LineCurve3: () => _c,
		LineDashedMaterial: () => Co,
		LineLoop: () => so,
		LinePieces: () => Uw,
		LineSegments: () => Mt,
		LineStrip: () => Bw,
		LinearEncoding: () => ft,
		LinearFilter: () => et,
		LinearInterpolant: () => Do,
		LinearMipMapLinearFilter: () => Dm,
		LinearMipMapNearestFilter: () => Cm,
		LinearMipmapLinearFilter: () => Pi,
		LinearMipmapNearestFilter: () => pl,
		LinearToneMapping: () => ah,
		Loader: () => Dt,
		LoaderUtils: () => ca,
		LoadingManager: () => as,
		LoopOnce: () => id,
		LoopPingPong: () => sd,
		LoopRepeat: () => rd,
		LuminanceAlphaFormat: () => yh,
		LuminanceFormat: () => xh,
		MOUSE: () => Zt,
		Material: () => tt,
		MaterialLoader: () => zc,
		Math: () => fg,
		MathUtils: () => fg,
		Matrix3: () => Et,
		Matrix4: () => ge,
		MaxEquation: () => hl,
		Mesh: () => ze,
		MeshBasicMaterial: () => zt,
		MeshDepthMaterial: () => Vs,
		MeshDistanceMaterial: () => Ws,
		MeshFaceMaterial: () => Hw,
		MeshLambertMaterial: () => _o,
		MeshMatcapMaterial: () => To,
		MeshNormalMaterial: () => So,
		MeshPhongMaterial: () => ns,
		MeshPhysicalMaterial: () => Eo,
		MeshStandardMaterial: () => Ji,
		MeshToonMaterial: () => Mo,
		MinEquation: () => ul,
		MirroredRepeatWrapping: () => Ss,
		MixOperation: () => rh,
		MultiMaterial: () => zw,
		MultiplyBlending: () => cl,
		MultiplyOperation: () => ws,
		NearestFilter: () => At,
		NearestMipMapLinearFilter: () => Tm,
		NearestMipMapNearestFilter: () => _m,
		NearestMipmapLinearFilter: () => wa,
		NearestMipmapNearestFilter: () => ya,
		NeverDepth: () => Ju,
		NeverStencilFunc: () => Hm,
		NoBlending: () => xt,
		NoColors: () => Fw,
		NoToneMapping: () => qn,
		NormalAnimationBlendMode: () => Aa,
		NormalBlending: () => hr,
		NotEqualDepth: () => ih,
		NotEqualStencilFunc: () => Wm,
		NumberKeyframeTrack: () => is,
		Object3D: () => _e,
		ObjectLoader: () => Vf,
		ObjectSpaceNormalMap: () => ld,
		OctahedronBufferGeometry: () => qi,
		OctahedronGeometry: () => qi,
		OneFactor: () => Vu,
		OneMinusDstAlphaFactor: () => Xu,
		OneMinusDstColorFactor: () => qu,
		OneMinusSrcAlphaFactor: () => fl,
		OneMinusSrcColorFactor: () => Yu,
		OrthographicCamera: () => Pr,
		PCFShadowMap: () => al,
		PCFSoftShadowMap: () => Nu,
		PMREMGenerator: () => hc,
		ParametricGeometry: () => mb,
		Particle: () => kw,
		ParticleBasicMaterial: () => Yw,
		ParticleSystem: () => Vw,
		ParticleSystemMaterial: () => jw,
		Path: () => Qr,
		PerspectiveCamera: () => ct,
		Plane: () => fn,
		PlaneBufferGeometry: () => ki,
		PlaneGeometry: () => ki,
		PlaneHelper: () => wp,
		PointCloud: () => Gw,
		PointCloudMaterial: () => Ww,
		PointLight: () => ls,
		PointLightHelper: () => up,
		Points: () => Ot,
		PointsMaterial: () => Xt,
		PolarGridHelper: () => pp,
		PolyhedronBufferGeometry: () => Mn,
		PolyhedronGeometry: () => Mn,
		PositionalAudio: () => $f,
		PropertyBinding: () => Ge,
		PropertyMixer: () => qc,
		QuadraticBezierCurve: () => na,
		QuadraticBezierCurve3: () => ia,
		Quaternion: () => yt,
		QuaternionKeyframeTrack: () => Ki,
		QuaternionLinearInterpolant: () => Ic,
		REVISION: () => bn,
		RGBADepthPacking: () => od,
		RGBAFormat: () => Tt,
		RGBAIntegerFormat: () => _h,
		RGBA_ASTC_10x10_Format: () => Hh,
		RGBA_ASTC_10x5_Format: () => Fh,
		RGBA_ASTC_10x6_Format: () => Oh,
		RGBA_ASTC_10x8_Format: () => Nh,
		RGBA_ASTC_12x10_Format: () => zh,
		RGBA_ASTC_12x12_Format: () => Gh,
		RGBA_ASTC_4x4_Format: () => Ch,
		RGBA_ASTC_5x4_Format: () => Dh,
		RGBA_ASTC_5x5_Format: () => Rh,
		RGBA_ASTC_6x5_Format: () => Ph,
		RGBA_ASTC_6x6_Format: () => Lh,
		RGBA_ASTC_8x5_Format: () => Ih,
		RGBA_ASTC_8x6_Format: () => Bh,
		RGBA_ASTC_8x8_Format: () => Uh,
		RGBA_BPTC_Format: () => kh,
		RGBA_ETC2_EAC_Format: () => Ml,
		RGBA_PVRTC_2BPPV1_Format: () => Al,
		RGBA_PVRTC_4BPPV1_Format: () => bl,
		RGBA_S3TC_DXT1_Format: () => gl,
		RGBA_S3TC_DXT3_Format: () => vl,
		RGBA_S3TC_DXT5_Format: () => xl,
		RGBDEncoding: () => Cl,
		RGBEEncoding: () => Ma,
		RGBEFormat: () => wh,
		RGBFormat: () => Zn,
		RGBIntegerFormat: () => Sh,
		RGBM16Encoding: () => Tl,
		RGBM7Encoding: () => _l,
		RGB_ETC1_Format: () => Th,
		RGB_ETC2_Format: () => El,
		RGB_PVRTC_2BPPV1_Format: () => wl,
		RGB_PVRTC_4BPPV1_Format: () => yl,
		RGB_S3TC_DXT1_Format: () => ml,
		RGFormat: () => Eh,
		RGIntegerFormat: () => Mh,
		RawShaderMaterial: () => Vi,
		Ray: () => On,
		Raycaster: () => np,
		RectAreaLight: () => Uo,
		RedFormat: () => bh,
		RedIntegerFormat: () => Ah,
		ReinhardToneMapping: () => oh,
		RepeatWrapping: () => Ms,
		ReplaceStencilOp: () => Im,
		ReverseSubtractEquation: () => Gu,
		RingBufferGeometry: () => mi,
		RingGeometry: () => mi,
		SRGB8_ALPHA8_ASTC_10x10_Format: () => ed,
		SRGB8_ALPHA8_ASTC_10x5_Format: () => Jh,
		SRGB8_ALPHA8_ASTC_10x6_Format: () => Kh,
		SRGB8_ALPHA8_ASTC_10x8_Format: () => $h,
		SRGB8_ALPHA8_ASTC_12x10_Format: () => td,
		SRGB8_ALPHA8_ASTC_12x12_Format: () => nd,
		SRGB8_ALPHA8_ASTC_4x4_Format: () => Vh,
		SRGB8_ALPHA8_ASTC_5x4_Format: () => Wh,
		SRGB8_ALPHA8_ASTC_5x5_Format: () => Yh,
		SRGB8_ALPHA8_ASTC_6x5_Format: () => jh,
		SRGB8_ALPHA8_ASTC_6x6_Format: () => Xh,
		SRGB8_ALPHA8_ASTC_8x5_Format: () => Qh,
		SRGB8_ALPHA8_ASTC_8x6_Format: () => qh,
		SRGB8_ALPHA8_ASTC_8x8_Format: () => Zh,
		Scene: () => mn,
		SceneUtils: () => fb,
		ShaderChunk: () => Be,
		ShaderLib: () => pn,
		ShaderMaterial: () => Ye,
		ShadowMaterial: () => Ao,
		Shape: () => gn,
		ShapeBufferGeometry: () => Zi,
		ShapeGeometry: () => Zi,
		ShapePath: () => Ep,
		ShapeUtils: () => vn,
		ShortType: () => dh,
		Skeleton: () => Js,
		SkeletonHelper: () => su,
		SkinnedMesh: () => qs,
		SmoothShading: () => Sm,
		Sphere: () => Un,
		SphereBufferGeometry: () => Kt,
		SphereGeometry: () => Kt,
		Spherical: () => ua,
		SphericalHarmonics3: () => Fo,
		SplineCurve: () => ra,
		SpotLight: () => Io,
		SpotLightHelper: () => lp,
		Sprite: () => Qi,
		SpriteMaterial: () => Xi,
		SrcAlphaFactor: () => dl,
		SrcAlphaSaturateFactor: () => Zu,
		SrcColorFactor: () => Wu,
		StaticCopyUsage: () => Zm,
		StaticDrawUsage: () => pr,
		StaticReadUsage: () => Xm,
		StereoCamera: () => Qf,
		StreamCopyUsage: () => Km,
		StreamDrawUsage: () => jm,
		StreamReadUsage: () => qm,
		StringKeyframeTrack: () => vi,
		SubtractEquation: () => zu,
		SubtractiveBlending: () => ll,
		TOUCH: () => on,
		TangentSpaceNormalMap: () => Fi,
		TetrahedronBufferGeometry: () => Kr,
		TetrahedronGeometry: () => Kr,
		TextGeometry: () => gb,
		Texture: () => ot,
		TextureLoader: () => en,
		TorusBufferGeometry: () => $r,
		TorusGeometry: () => $r,
		TorusKnotBufferGeometry: () => es,
		TorusKnotGeometry: () => es,
		Triangle: () => pt,
		TriangleFanDrawMode: () => Pm,
		TriangleStripDrawMode: () => Rm,
		TrianglesDrawMode: () => ad,
		TubeBufferGeometry: () => ts,
		TubeGeometry: () => ts,
		UVMapping: () => xa,
		Uint16Attribute: () => $w,
		Uint16BufferAttribute: () => Bs,
		Uint32Attribute: () => tb,
		Uint32BufferAttribute: () => Us,
		Uint8Attribute: () => Zw,
		Uint8BufferAttribute: () => Zl,
		Uint8ClampedAttribute: () => Jw,
		Uint8ClampedBufferAttribute: () => Jl,
		Uniform: () => De,
		UniformsLib: () => se,
		UniformsUtils: () => Ya,
		UnsignedByteType: () => lt,
		UnsignedInt248Type: () => Pn,
		UnsignedIntType: () => Li,
		UnsignedShort4444Type: () => ph,
		UnsignedShort5551Type: () => mh,
		UnsignedShort565Type: () => gh,
		UnsignedShortType: () => fr,
		VSMShadowMap: () => ur,
		Vector2: () => O,
		Vector3: () => A,
		Vector4: () => Ve,
		VectorKeyframeTrack: () => rs,
		Vertex: () => Xw,
		VertexColors: () => Nw,
		VideoTexture: () => yc,
		WebGL1Renderer: () => Ys,
		WebGLCubeRenderTarget: () => Ns,
		WebGLMultipleRenderTargets: () => Il,
		WebGLMultisampleRenderTarget: () => Ni,
		WebGLRenderTarget: () => We,
		WebGLRenderTargetCube: () => ub,
		WebGLRenderer: () => Ze,
		WebGLUtils: () => of,
		WireframeGeometry: () => bo,
		WireframeHelper: () => ob,
		WrapAroundEnding: () => Cs,
		XHRLoader: () => lb,
		ZeroCurvatureEnding: () => Bi,
		ZeroFactor: () => ku,
		ZeroSlopeEnding: () => Ui,
		ZeroStencilOp: () => Lm,
		sRGBEncoding: () => qe
	});
	var bn = "135",
		Zt = {
			LEFT: 0,
			MIDDLE: 1,
			RIGHT: 2,
			ROTATE: 0,
			DOLLY: 1,
			PAN: 2
		},
		on = {
			ROTATE: 0,
			PAN: 1,
			DOLLY_PAN: 2,
			DOLLY_ROTATE: 3
		},
		Fu = 0,
		sl = 1,
		Ou = 2,
		Em = 3,
		Mm = 0,
		al = 1,
		Nu = 2,
		ur = 3,
		Rn = 0,
		Qe = 1,
		Ht = 2,
		ol = 1,
		Sm = 2,
		xt = 0,
		hr = 1,
		Ti = 2,
		ll = 3,
		cl = 4,
		Hu = 5,
		Ci = 100,
		zu = 101,
		Gu = 102,
		ul = 103,
		hl = 104,
		ku = 200,
		Vu = 201,
		Wu = 202,
		Yu = 203,
		dl = 204,
		fl = 205,
		ju = 206,
		Xu = 207,
		Qu = 208,
		qu = 209,
		Zu = 210,
		Ju = 0,
		Ku = 1,
		$u = 2,
		va = 3,
		eh = 4,
		th = 5,
		nh = 6,
		ih = 7,
		ws = 0,
		rh = 1,
		sh = 2,
		qn = 0,
		ah = 1,
		oh = 2,
		lh = 3,
		ch = 4,
		uh = 5,
		xa = 300,
		Di = 301,
		Ri = 302,
		bs = 303,
		As = 304,
		dr = 306,
		Es = 307,
		Ms = 1e3,
		_t = 1001,
		Ss = 1002,
		At = 1003,
		ya = 1004,
		_m = 1004,
		wa = 1005,
		Tm = 1005,
		et = 1006,
		pl = 1007,
		Cm = 1007,
		Pi = 1008,
		Dm = 1008,
		lt = 1009,
		hh = 1010,
		dh = 1011,
		fr = 1012,
		fh = 1013,
		Li = 1014,
		ln = 1015,
		Ii = 1016,
		ph = 1017,
		mh = 1018,
		gh = 1019,
		Pn = 1020,
		vh = 1021,
		Zn = 1022,
		Tt = 1023,
		xh = 1024,
		yh = 1025,
		wh = Tt,
		Jn = 1026,
		Ln = 1027,
		bh = 1028,
		Ah = 1029,
		Eh = 1030,
		Mh = 1031,
		Sh = 1032,
		_h = 1033,
		ml = 33776,
		gl = 33777,
		vl = 33778,
		xl = 33779,
		yl = 35840,
		wl = 35841,
		bl = 35842,
		Al = 35843,
		Th = 36196,
		El = 37492,
		Ml = 37496,
		Ch = 37808,
		Dh = 37809,
		Rh = 37810,
		Ph = 37811,
		Lh = 37812,
		Ih = 37813,
		Bh = 37814,
		Uh = 37815,
		Fh = 37816,
		Oh = 37817,
		Nh = 37818,
		Hh = 37819,
		zh = 37820,
		Gh = 37821,
		kh = 36492,
		Vh = 37840,
		Wh = 37841,
		Yh = 37842,
		jh = 37843,
		Xh = 37844,
		Qh = 37845,
		qh = 37846,
		Zh = 37847,
		Jh = 37848,
		Kh = 37849,
		$h = 37850,
		ed = 37851,
		td = 37852,
		nd = 37853,
		id = 2200,
		rd = 2201,
		sd = 2202,
		_s = 2300,
		Ts = 2301,
		ba = 2302,
		Bi = 2400,
		Ui = 2401,
		Cs = 2402,
		Aa = 2500,
		Sl = 2501,
		ad = 0,
		Rm = 1,
		Pm = 2,
		ft = 3e3,
		qe = 3001,
		Ea = 3007,
		Ma = 3002,
		_l = 3004,
		Tl = 3005,
		Cl = 3006,
		cn = 3200,
		od = 3201,
		Fi = 0,
		ld = 1,
		Lm = 0,
		Sa = 7680,
		Im = 7681,
		Bm = 7682,
		Um = 7683,
		Fm = 34055,
		Om = 34056,
		Nm = 5386,
		Hm = 512,
		zm = 513,
		Gm = 514,
		km = 515,
		Vm = 516,
		Wm = 517,
		Ym = 518,
		cd = 519,
		pr = 35044,
		In = 35048,
		jm = 35040,
		Xm = 35045,
		Qm = 35049,
		qm = 35041,
		Zm = 35046,
		Jm = 35050,
		Km = 35042,
		$m = "100",
		Dl = "300 es",
		Pt = class {
			addEventListener(e, t) {
				this._listeners === void 0 && (this._listeners = {});
				let n = this._listeners;
				n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t)
			}
			hasEventListener(e, t) {
				if (this._listeners === void 0) return !1;
				let n = this._listeners;
				return n[e] !== void 0 && n[e].indexOf(t) !== -1
			}
			removeEventListener(e, t) {
				if (this._listeners === void 0) return;
				let i = this._listeners[e];
				if (i !== void 0) {
					let s = i.indexOf(t);
					s !== -1 && i.splice(s, 1)
				}
			}
			dispatchEvent(e) {
				if (this._listeners === void 0) return;
				let n = this._listeners[e.type];
				if (n !== void 0) {
					e.target = this;
					let i = n.slice(0);
					for (let s = 0, a = i.length; s < a; s++) i[s].call(this, e);
					e.target = null
				}
			}
		},
		Lt = [];
	for (let r = 0; r < 256; r++) Lt[r] = (r < 16 ? "0" : "") + r.toString(16);
	var _a = 1234567,
		Oi = Math.PI / 180,
		Ds = 180 / Math.PI;

	function Wt() {
		let r = Math.random() * 4294967295 | 0,
			e = Math.random() * 4294967295 | 0,
			t = Math.random() * 4294967295 | 0,
			n = Math.random() * 4294967295 | 0;
		return (Lt[r & 255] + Lt[r >> 8 & 255] + Lt[r >> 16 & 255] + Lt[r >> 24 & 255] + "-" + Lt[e & 255] + Lt[e >> 8 & 255] + "-" + Lt[e >> 16 & 15 | 64] + Lt[e >> 24 & 255] + "-" + Lt[t & 63 | 128] + Lt[t >> 8 & 255] + "-" + Lt[t >> 16 & 255] + Lt[t >> 24 & 255] + Lt[n & 255] + Lt[n >> 8 & 255] + Lt[n >> 16 & 255] + Lt[n >> 24 & 255]).toUpperCase()
	}

	function It(r, e, t) {
		return Math.max(e, Math.min(t, r))
	}

	function Rl(r, e) {
		return (r % e + e) % e
	}

	function eg(r, e, t, n, i) {
		return n + (r - e) * (i - n) / (t - e)
	}

	function tg(r, e, t) {
		return r !== e ? (t - r) / (e - r) : 0
	}

	function Rs(r, e, t) {
		return (1 - t) * r + t * e
	}

	function ng(r, e, t, n) {
		return Rs(r, e, 1 - Math.exp(-t * n))
	}

	function ig(r, e = 1) {
		return e - Math.abs(Rl(r, e * 2) - e)
	}

	function rg(r, e, t) {
		return r <= e ? 0 : r >= t ? 1 : (r = (r - e) / (t - e), r * r * (3 - 2 * r))
	}

	function sg(r, e, t) {
		return r <= e ? 0 : r >= t ? 1 : (r = (r - e) / (t - e), r * r * r * (r * (r * 6 - 15) + 10))
	}

	function ag(r, e) {
		return r + Math.floor(Math.random() * (e - r + 1))
	}

	function og(r, e) {
		return r + Math.random() * (e - r)
	}

	function lg(r) {
		return r * (.5 - Math.random())
	}

	function cg(r) {
		return r !== void 0 && (_a = r % 2147483647), _a = _a * 16807 % 2147483647, (_a - 1) / 2147483646
	}

	function ug(r) {
		return r * Oi
	}

	function hg(r) {
		return r * Ds
	}

	function Pl(r) {
		return (r & r - 1) == 0 && r !== 0
	}

	function ud(r) {
		return Math.pow(2, Math.ceil(Math.log(r) / Math.LN2))
	}

	function hd(r) {
		return Math.pow(2, Math.floor(Math.log(r) / Math.LN2))
	}

	function dg(r, e, t, n, i) {
		let s = Math.cos,
			a = Math.sin,
			o = s(t / 2),
			l = a(t / 2),
			c = s((e + n) / 2),
			u = a((e + n) / 2),
			h = s((e - n) / 2),
			d = a((e - n) / 2),
			f = s((n - e) / 2),
			p = a((n - e) / 2);
		switch (i) {
			case "XYX":
				r.set(o * u, l * h, l * d, o * c);
				break;
			case "YZY":
				r.set(l * d, o * u, l * h, o * c);
				break;
			case "ZXZ":
				r.set(l * h, l * d, o * u, o * c);
				break;
			case "XZX":
				r.set(o * u, l * p, l * f, o * c);
				break;
			case "YXY":
				r.set(l * f, o * u, l * p, o * c);
				break;
			case "ZYZ":
				r.set(l * p, l * f, o * u, o * c);
				break;
			default:
				console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + i)
		}
	}
	var fg = Object.freeze({
		__proto__: null,
		DEG2RAD: Oi,
		RAD2DEG: Ds,
		generateUUID: Wt,
		clamp: It,
		euclideanModulo: Rl,
		mapLinear: eg,
		inverseLerp: tg,
		lerp: Rs,
		damp: ng,
		pingpong: ig,
		smoothstep: rg,
		smootherstep: sg,
		randInt: ag,
		randFloat: og,
		randFloatSpread: lg,
		seededRandom: cg,
		degToRad: ug,
		radToDeg: hg,
		isPowerOfTwo: Pl,
		ceilPowerOfTwo: ud,
		floorPowerOfTwo: hd,
		setQuaternionFromProperEuler: dg
	}),
		O = class {
			constructor(e = 0, t = 0) {
				this.x = e, this.y = t
			}
			get width() {
				return this.x
			}
			set width(e) {
				this.x = e
			}
			get height() {
				return this.y
			}
			set height(e) {
				this.y = e
			}
			set(e, t) {
				return this.x = e, this.y = t, this
			}
			setScalar(e) {
				return this.x = e, this.y = e, this
			}
			setX(e) {
				return this.x = e, this
			}
			setY(e) {
				return this.y = e, this
			}
			setComponent(e, t) {
				switch (e) {
					case 0:
						this.x = t;
						break;
					case 1:
						this.y = t;
						break;
					default:
						throw new Error("index is out of range: " + e)
				}
				return this
			}
			getComponent(e) {
				switch (e) {
					case 0:
						return this.x;
					case 1:
						return this.y;
					default:
						throw new Error("index is out of range: " + e)
				}
			}
			clone() {
				return new this.constructor(this.x, this.y)
			}
			copy(e) {
				return this.x = e.x, this.y = e.y, this
			}
			add(e, t) {
				return t !== void 0 ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this)
			}
			addScalar(e) {
				return this.x += e, this.y += e, this
			}
			addVectors(e, t) {
				return this.x = e.x + t.x, this.y = e.y + t.y, this
			}
			addScaledVector(e, t) {
				return this.x += e.x * t, this.y += e.y * t, this
			}
			sub(e, t) {
				return t !== void 0 ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this)
			}
			subScalar(e) {
				return this.x -= e, this.y -= e, this
			}
			subVectors(e, t) {
				return this.x = e.x - t.x, this.y = e.y - t.y, this
			}
			multiply(e) {
				return this.x *= e.x, this.y *= e.y, this
			}
			multiplyScalar(e) {
				return this.x *= e, this.y *= e, this
			}
			divide(e) {
				return this.x /= e.x, this.y /= e.y, this
			}
			divideScalar(e) {
				return this.multiplyScalar(1 / e)
			}
			applyMatrix3(e) {
				let t = this.x,
					n = this.y,
					i = e.elements;
				return this.x = i[0] * t + i[3] * n + i[6], this.y = i[1] * t + i[4] * n + i[7], this
			}
			min(e) {
				return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this
			}
			max(e) {
				return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this
			}
			clamp(e, t) {
				return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this
			}
			clampScalar(e, t) {
				return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this
			}
			clampLength(e, t) {
				let n = this.length();
				return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)))
			}
			floor() {
				return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
			}
			ceil() {
				return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
			}
			round() {
				return this.x = Math.round(this.x), this.y = Math.round(this.y), this
			}
			roundToZero() {
				return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this
			}
			negate() {
				return this.x = -this.x, this.y = -this.y, this
			}
			dot(e) {
				return this.x * e.x + this.y * e.y
			}
			cross(e) {
				return this.x * e.y - this.y * e.x
			}
			lengthSq() {
				return this.x * this.x + this.y * this.y
			}
			length() {
				return Math.sqrt(this.x * this.x + this.y * this.y)
			}
			manhattanLength() {
				return Math.abs(this.x) + Math.abs(this.y)
			}
			normalize() {
				return this.divideScalar(this.length() || 1)
			}
			angle() {
				return Math.atan2(-this.y, -this.x) + Math.PI
			}
			distanceTo(e) {
				return Math.sqrt(this.distanceToSquared(e))
			}
			distanceToSquared(e) {
				let t = this.x - e.x,
					n = this.y - e.y;
				return t * t + n * n
			}
			manhattanDistanceTo(e) {
				return Math.abs(this.x - e.x) + Math.abs(this.y - e.y)
			}
			setLength(e) {
				return this.normalize().multiplyScalar(e)
			}
			lerp(e, t) {
				return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this
			}
			lerpVectors(e, t, n) {
				return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this
			}
			equals(e) {
				return e.x === this.x && e.y === this.y
			}
			fromArray(e, t = 0) {
				return this.x = e[t], this.y = e[t + 1], this
			}
			toArray(e = [], t = 0) {
				return e[t] = this.x, e[t + 1] = this.y, e
			}
			fromBufferAttribute(e, t, n) {
				return n !== void 0 && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this
			}
			rotateAround(e, t) {
				let n = Math.cos(t),
					i = Math.sin(t),
					s = this.x - e.x,
					a = this.y - e.y;
				return this.x = s * n - a * i + e.x, this.y = s * i + a * n + e.y, this
			}
			random() {
				return this.x = Math.random(), this.y = Math.random(), this
			} *[Symbol.iterator]() {
				yield this.x, yield this.y
			}
		};
	O.prototype.isVector2 = !0;
	var Et = class {
		constructor() {
			this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
		}
		set(e, t, n, i, s, a, o, l, c) {
			let u = this.elements;
			return u[0] = e, u[1] = i, u[2] = o, u[3] = t, u[4] = s, u[5] = l, u[6] = n, u[7] = a, u[8] = c, this
		}
		identity() {
			return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
		}
		copy(e) {
			let t = this.elements,
				n = e.elements;
			return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this
		}
		extractBasis(e, t, n) {
			return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this
		}
		setFromMatrix4(e) {
			let t = e.elements;
			return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this
		}
		multiply(e) {
			return this.multiplyMatrices(this, e)
		}
		premultiply(e) {
			return this.multiplyMatrices(e, this)
		}
		multiplyMatrices(e, t) {
			let n = e.elements,
				i = t.elements,
				s = this.elements,
				a = n[0],
				o = n[3],
				l = n[6],
				c = n[1],
				u = n[4],
				h = n[7],
				d = n[2],
				f = n[5],
				p = n[8],
				v = i[0],
				x = i[3],
				g = i[6],
				m = i[1],
				b = i[4],
				y = i[7],
				E = i[2],
				_ = i[5],
				w = i[8];
			return s[0] = a * v + o * m + l * E, s[3] = a * x + o * b + l * _, s[6] = a * g + o * y + l * w, s[1] = c * v + u * m + h * E, s[4] = c * x + u * b + h * _, s[7] = c * g + u * y + h * w, s[2] = d * v + f * m + p * E, s[5] = d * x + f * b + p * _, s[8] = d * g + f * y + p * w, this
		}
		multiplyScalar(e) {
			let t = this.elements;
			return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this
		}
		determinant() {
			let e = this.elements,
				t = e[0],
				n = e[1],
				i = e[2],
				s = e[3],
				a = e[4],
				o = e[5],
				l = e[6],
				c = e[7],
				u = e[8];
			return t * a * u - t * o * c - n * s * u + n * o * l + i * s * c - i * a * l
		}
		invert() {
			let e = this.elements,
				t = e[0],
				n = e[1],
				i = e[2],
				s = e[3],
				a = e[4],
				o = e[5],
				l = e[6],
				c = e[7],
				u = e[8],
				h = u * a - o * c,
				d = o * l - u * s,
				f = c * s - a * l,
				p = t * h + n * d + i * f;
			if (p === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
			let v = 1 / p;
			return e[0] = h * v, e[1] = (i * c - u * n) * v, e[2] = (o * n - i * a) * v, e[3] = d * v, e[4] = (u * t - i * l) * v, e[5] = (i * s - o * t) * v, e[6] = f * v, e[7] = (n * l - c * t) * v, e[8] = (a * t - n * s) * v, this
		}
		transpose() {
			let e, t = this.elements;
			return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this
		}
		getNormalMatrix(e) {
			return this.setFromMatrix4(e).invert().transpose()
		}
		transposeIntoArray(e) {
			let t = this.elements;
			return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this
		}
		setUvTransform(e, t, n, i, s, a, o) {
			let l = Math.cos(s),
				c = Math.sin(s);
			return this.set(n * l, n * c, -n * (l * a + c * o) + a + e, -i * c, i * l, -i * (-c * a + l * o) + o + t, 0, 0, 1), this
		}
		scale(e, t) {
			let n = this.elements;
			return n[0] *= e, n[3] *= e, n[6] *= e, n[1] *= t, n[4] *= t, n[7] *= t, this
		}
		rotate(e) {
			let t = Math.cos(e),
				n = Math.sin(e),
				i = this.elements,
				s = i[0],
				a = i[3],
				o = i[6],
				l = i[1],
				c = i[4],
				u = i[7];
			return i[0] = t * s + n * l, i[3] = t * a + n * c, i[6] = t * o + n * u, i[1] = -n * s + t * l, i[4] = -n * a + t * c, i[7] = -n * o + t * u, this
		}
		translate(e, t) {
			let n = this.elements;
			return n[0] += e * n[2], n[3] += e * n[5], n[6] += e * n[8], n[1] += t * n[2], n[4] += t * n[5], n[7] += t * n[8], this
		}
		equals(e) {
			let t = this.elements,
				n = e.elements;
			for (let i = 0; i < 9; i++)
				if (t[i] !== n[i]) return !1;
			return !0
		}
		fromArray(e, t = 0) {
			for (let n = 0; n < 9; n++) this.elements[n] = e[n + t];
			return this
		}
		toArray(e = [], t = 0) {
			let n = this.elements;
			return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e
		}
		clone() {
			return new this.constructor().fromArray(this.elements)
		}
	};
	Et.prototype.isMatrix3 = !0;

	function dd(r) {
		if (r.length === 0) return -1 / 0;
		let e = r[0];
		for (let t = 1, n = r.length; t < n; ++t) r[t] > e && (e = r[t]);
		return e
	}
	var pg = {
		Int8Array,
		Uint8Array,
		Uint8ClampedArray,
		Int16Array,
		Uint16Array,
		Int32Array,
		Uint32Array,
		Float32Array,
		Float64Array
	};

	function mr(r, e) {
		return new pg[r](e)
	}

	function Ta(r) {
		return document.createElementNS("http://www.w3.org/1999/xhtml", r)
	}

	function fd(r, e = 0) {
		let t = 3735928559 ^ e,
			n = 1103547991 ^ e;
		for (let i = 0, s; i < r.length; i++) s = r.charCodeAt(i), t = Math.imul(t ^ s, 2654435761), n = Math.imul(n ^ s, 1597334677);
		return t = Math.imul(t ^ t >>> 16, 2246822507) ^ Math.imul(n ^ n >>> 13, 3266489909), n = Math.imul(n ^ n >>> 16, 2246822507) ^ Math.imul(t ^ t >>> 13, 3266489909), 4294967296 * (2097151 & n) + (t >>> 0)
	}
	var gr, Kn = class {
		static getDataURL(e) {
			if (/^data:/i.test(e.src) || typeof HTMLCanvasElement == "undefined") return e.src;
			let t;
			if (e instanceof HTMLCanvasElement) t = e;
			else {
				gr === void 0 && (gr = Ta("canvas")), gr.width = e.width, gr.height = e.height;
				let n = gr.getContext("2d");
				e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), t = gr
			}
			return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), t.toDataURL("image/jpeg", .6)) : t.toDataURL("image/png")
		}
	},
		mg = 0,
		ot = class extends Pt {
			constructor(e = ot.DEFAULT_IMAGE, t = ot.DEFAULT_MAPPING, n = _t, i = _t, s = et, a = Pi, o = Tt, l = lt, c = 1, u = ft) {
				super();
				Object.defineProperty(this, "id", {
					value: mg++
				}), this.uuid = Wt(), this.name = "", this.image = e, this.mipmaps = [], this.mapping = t, this.wrapS = n, this.wrapT = i, this.magFilter = s, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new O(0, 0), this.repeat = new O(1, 1), this.center = new O(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Et, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = u, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1
			}
			updateMatrix() {
				this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
			}
			clone() {
				return new this.constructor().copy(this)
			}
			copy(e) {
				return this.name = e.name, this.image = e.image, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.encoding = e.encoding, this.userData = JSON.parse(JSON.stringify(e.userData)), this
			}
			toJSON(e) {
				let t = e === void 0 || typeof e == "string";
				if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
				let n = {
					metadata: {
						version: 4.5,
						type: "Texture",
						generator: "Texture.toJSON"
					},
					uuid: this.uuid,
					name: this.name,
					mapping: this.mapping,
					repeat: [this.repeat.x, this.repeat.y],
					offset: [this.offset.x, this.offset.y],
					center: [this.center.x, this.center.y],
					rotation: this.rotation,
					wrap: [this.wrapS, this.wrapT],
					format: this.format,
					type: this.type,
					encoding: this.encoding,
					minFilter: this.minFilter,
					magFilter: this.magFilter,
					anisotropy: this.anisotropy,
					flipY: this.flipY,
					premultiplyAlpha: this.premultiplyAlpha,
					unpackAlignment: this.unpackAlignment
				};
				if (this.image !== void 0) {
					let i = this.image;
					if (i.uuid === void 0 && (i.uuid = Wt()), !t && e.images[i.uuid] === void 0) {
						let s;
						if (Array.isArray(i)) {
							s = [];
							for (let a = 0, o = i.length; a < o; a++) i[a].isDataTexture ? s.push(Ll(i[a].image)) : s.push(Ll(i[a]))
						} else s = Ll(i);
						e.images[i.uuid] = {
							uuid: i.uuid,
							url: s
						}
					}
					n.image = i.uuid
				}
				return JSON.stringify(this.userData) !== "{}" && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n
			}
			dispose() {
				this.dispatchEvent({
					type: "dispose"
				})
			}
			transformUv(e) {
				if (this.mapping !== xa) return e;
				if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) {
					case Ms:
						e.x = e.x - Math.floor(e.x);
						break;
					case _t:
						e.x = e.x < 0 ? 0 : 1;
						break;
					case Ss:
						Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
						break
				}
				if (e.y < 0 || e.y > 1) switch (this.wrapT) {
					case Ms:
						e.y = e.y - Math.floor(e.y);
						break;
					case _t:
						e.y = e.y < 0 ? 0 : 1;
						break;
					case Ss:
						Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
						break
				}
				return this.flipY && (e.y = 1 - e.y), e
			}
			set needsUpdate(e) {
				e === !0 && this.version++
			}
		};
	ot.DEFAULT_IMAGE = void 0;
	ot.DEFAULT_MAPPING = xa;
	ot.prototype.isTexture = !0;

	function Ll(r) {
		return typeof HTMLImageElement != "undefined" && r instanceof HTMLImageElement || typeof HTMLCanvasElement != "undefined" && r instanceof HTMLCanvasElement || typeof ImageBitmap != "undefined" && r instanceof ImageBitmap ? Kn.getDataURL(r) : r.data ? {
			data: Array.prototype.slice.call(r.data),
			width: r.width,
			height: r.height,
			type: r.data.constructor.name
		} : (console.warn("THREE.Texture: Unable to serialize Texture."), {})
	}
	var Ve = class {
		constructor(e = 0, t = 0, n = 0, i = 1) {
			this.x = e, this.y = t, this.z = n, this.w = i
		}
		get width() {
			return this.z
		}
		set width(e) {
			this.z = e
		}
		get height() {
			return this.w
		}
		set height(e) {
			this.w = e
		}
		set(e, t, n, i) {
			return this.x = e, this.y = t, this.z = n, this.w = i, this
		}
		setScalar(e) {
			return this.x = e, this.y = e, this.z = e, this.w = e, this
		}
		setX(e) {
			return this.x = e, this
		}
		setY(e) {
			return this.y = e, this
		}
		setZ(e) {
			return this.z = e, this
		}
		setW(e) {
			return this.w = e, this
		}
		setComponent(e, t) {
			switch (e) {
				case 0:
					this.x = t;
					break;
				case 1:
					this.y = t;
					break;
				case 2:
					this.z = t;
					break;
				case 3:
					this.w = t;
					break;
				default:
					throw new Error("index is out of range: " + e)
			}
			return this
		}
		getComponent(e) {
			switch (e) {
				case 0:
					return this.x;
				case 1:
					return this.y;
				case 2:
					return this.z;
				case 3:
					return this.w;
				default:
					throw new Error("index is out of range: " + e)
			}
		}
		clone() {
			return new this.constructor(this.x, this.y, this.z, this.w)
		}
		copy(e) {
			return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this
		}
		add(e, t) {
			return t !== void 0 ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this)
		}
		addScalar(e) {
			return this.x += e, this.y += e, this.z += e, this.w += e, this
		}
		addVectors(e, t) {
			return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this
		}
		addScaledVector(e, t) {
			return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this
		}
		sub(e, t) {
			return t !== void 0 ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this)
		}
		subScalar(e) {
			return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this
		}
		subVectors(e, t) {
			return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this
		}
		multiply(e) {
			return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this
		}
		multiplyScalar(e) {
			return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this
		}
		applyMatrix4(e) {
			let t = this.x,
				n = this.y,
				i = this.z,
				s = this.w,
				a = e.elements;
			return this.x = a[0] * t + a[4] * n + a[8] * i + a[12] * s, this.y = a[1] * t + a[5] * n + a[9] * i + a[13] * s, this.z = a[2] * t + a[6] * n + a[10] * i + a[14] * s, this.w = a[3] * t + a[7] * n + a[11] * i + a[15] * s, this
		}
		divideScalar(e) {
			return this.multiplyScalar(1 / e)
		}
		setAxisAngleFromQuaternion(e) {
			this.w = 2 * Math.acos(e.w);
			let t = Math.sqrt(1 - e.w * e.w);
			return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this
		}
		setAxisAngleFromRotationMatrix(e) {
			let t, n, i, s, a = .01,
				o = .1,
				l = e.elements,
				c = l[0],
				u = l[4],
				h = l[8],
				d = l[1],
				f = l[5],
				p = l[9],
				v = l[2],
				x = l[6],
				g = l[10];
			if (Math.abs(u - d) < a && Math.abs(h - v) < a && Math.abs(p - x) < a) {
				if (Math.abs(u + d) < o && Math.abs(h + v) < o && Math.abs(p + x) < o && Math.abs(c + f + g - 3) < o) return this.set(1, 0, 0, 0), this;
				t = Math.PI;
				let b = (c + 1) / 2,
					y = (f + 1) / 2,
					E = (g + 1) / 2,
					_ = (u + d) / 4,
					w = (h + v) / 4,
					D = (p + x) / 4;
				return b > y && b > E ? b < a ? (n = 0, i = .707106781, s = .707106781) : (n = Math.sqrt(b), i = _ / n, s = w / n) : y > E ? y < a ? (n = .707106781, i = 0, s = .707106781) : (i = Math.sqrt(y), n = _ / i, s = D / i) : E < a ? (n = .707106781, i = .707106781, s = 0) : (s = Math.sqrt(E), n = w / s, i = D / s), this.set(n, i, s, t), this
			}
			let m = Math.sqrt((x - p) * (x - p) + (h - v) * (h - v) + (d - u) * (d - u));
			return Math.abs(m) < .001 && (m = 1), this.x = (x - p) / m, this.y = (h - v) / m, this.z = (d - u) / m, this.w = Math.acos((c + f + g - 1) / 2), this
		}
		min(e) {
			return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this
		}
		max(e) {
			return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this
		}
		clamp(e, t) {
			return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this
		}
		clampScalar(e, t) {
			return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this
		}
		clampLength(e, t) {
			let n = this.length();
			return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)))
		}
		floor() {
			return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
		}
		ceil() {
			return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
		}
		round() {
			return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
		}
		roundToZero() {
			return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this
		}
		negate() {
			return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
		}
		dot(e) {
			return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
		}
		lengthSq() {
			return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
		}
		length() {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
		}
		manhattanLength() {
			return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
		}
		normalize() {
			return this.divideScalar(this.length() || 1)
		}
		setLength(e) {
			return this.normalize().multiplyScalar(e)
		}
		lerp(e, t) {
			return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this
		}
		lerpVectors(e, t, n) {
			return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this
		}
		equals(e) {
			return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
		}
		fromArray(e, t = 0) {
			return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this
		}
		toArray(e = [], t = 0) {
			return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e
		}
		fromBufferAttribute(e, t, n) {
			return n !== void 0 && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this
		}
		random() {
			return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this
		} *[Symbol.iterator]() {
			yield this.x, yield this.y, yield this.z, yield this.w
		}
	};
	Ve.prototype.isVector4 = !0;
	var We = class extends Pt {
		constructor(e, t, n = {}) {
			super();
			this.width = e, this.height = t, this.depth = 1, this.scissor = new Ve(0, 0, e, t), this.scissorTest = !1, this.viewport = new Ve(0, 0, e, t), this.texture = new ot(void 0, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.encoding), this.texture.isRenderTargetTexture = !0, this.texture.image = {
				width: e,
				height: t,
				depth: 1
			}, this.texture.generateMipmaps = n.generateMipmaps !== void 0 ? n.generateMipmaps : !1, this.texture.internalFormat = n.internalFormat !== void 0 ? n.internalFormat : null, this.texture.minFilter = n.minFilter !== void 0 ? n.minFilter : et, this.depthBuffer = n.depthBuffer !== void 0 ? n.depthBuffer : !0, this.stencilBuffer = n.stencilBuffer !== void 0 ? n.stencilBuffer : !1, this.depthTexture = n.depthTexture !== void 0 ? n.depthTexture : null
		}
		setTexture(e) {
			e.image = {
				width: this.width,
				height: this.height,
				depth: this.depth
			}, this.texture = e
		}
		setSize(e, t, n = 1) {
			(this.width !== e || this.height !== t || this.depth !== n) && (this.width = e, this.height = t, this.depth = n, this.texture.image.width = e, this.texture.image.height = t, this.texture.image.depth = n, this.dispose()), this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t)
		}
		clone() {
			return new this.constructor().copy(this)
		}
		copy(e) {
			return this.width = e.width, this.height = e.height, this.depth = e.depth, this.viewport.copy(e.viewport), this.texture = e.texture.clone(), this.texture.image = Lu({}, this.texture.image), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.depthTexture = e.depthTexture, this
		}
		dispose() {
			this.dispatchEvent({
				type: "dispose"
			})
		}
	};
	We.prototype.isWebGLRenderTarget = !0;
	var Il = class extends We {
		constructor(e, t, n) {
			super(e, t);
			let i = this.texture;
			this.texture = [];
			for (let s = 0; s < n; s++) this.texture[s] = i.clone()
		}
		setSize(e, t, n = 1) {
			if (this.width !== e || this.height !== t || this.depth !== n) {
				this.width = e, this.height = t, this.depth = n;
				for (let i = 0, s = this.texture.length; i < s; i++) this.texture[i].image.width = e, this.texture[i].image.height = t, this.texture[i].image.depth = n;
				this.dispose()
			}
			return this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t), this
		}
		copy(e) {
			this.dispose(), this.width = e.width, this.height = e.height, this.depth = e.depth, this.viewport.set(0, 0, this.width, this.height), this.scissor.set(0, 0, this.width, this.height), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.depthTexture = e.depthTexture, this.texture.length = 0;
			for (let t = 0, n = e.texture.length; t < n; t++) this.texture[t] = e.texture[t].clone();
			return this
		}
	};
	Il.prototype.isWebGLMultipleRenderTargets = !0;
	var Ni = class extends We {
		constructor(e, t, n = {}) {
			super(e, t, n);
			this.samples = 4, this.ignoreDepthForMultisampleCopy = n.ignoreDepth !== void 0 ? n.ignoreDepth : !0, this.useRenderToTexture = n.useRenderToTexture !== void 0 ? n.useRenderToTexture : !1, this.useRenderbuffer = this.useRenderToTexture === !1
		}
		copy(e) {
			return super.copy.call(this, e), this.samples = e.samples, this.useRenderToTexture = e.useRenderToTexture, this.useRenderbuffer = e.useRenderbuffer, this
		}
	};
	Ni.prototype.isWebGLMultisampleRenderTarget = !0;
	var yt = class {
		constructor(e = 0, t = 0, n = 0, i = 1) {
			this._x = e, this._y = t, this._z = n, this._w = i
		}
		static slerp(e, t, n, i) {
			return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."), n.slerpQuaternions(e, t, i)
		}
		static slerpFlat(e, t, n, i, s, a, o) {
			let l = n[i + 0],
				c = n[i + 1],
				u = n[i + 2],
				h = n[i + 3],
				d = s[a + 0],
				f = s[a + 1],
				p = s[a + 2],
				v = s[a + 3];
			if (o === 0) {
				e[t + 0] = l, e[t + 1] = c, e[t + 2] = u, e[t + 3] = h;
				return
			}
			if (o === 1) {
				e[t + 0] = d, e[t + 1] = f, e[t + 2] = p, e[t + 3] = v;
				return
			}
			if (h !== v || l !== d || c !== f || u !== p) {
				let x = 1 - o,
					g = l * d + c * f + u * p + h * v,
					m = g >= 0 ? 1 : -1,
					b = 1 - g * g;
				if (b > Number.EPSILON) {
					let E = Math.sqrt(b),
						_ = Math.atan2(E, g * m);
					x = Math.sin(x * _) / E, o = Math.sin(o * _) / E
				}
				let y = o * m;
				if (l = l * x + d * y, c = c * x + f * y, u = u * x + p * y, h = h * x + v * y, x === 1 - o) {
					let E = 1 / Math.sqrt(l * l + c * c + u * u + h * h);
					l *= E, c *= E, u *= E, h *= E
				}
			}
			e[t] = l, e[t + 1] = c, e[t + 2] = u, e[t + 3] = h
		}
		static multiplyQuaternionsFlat(e, t, n, i, s, a) {
			let o = n[i],
				l = n[i + 1],
				c = n[i + 2],
				u = n[i + 3],
				h = s[a],
				d = s[a + 1],
				f = s[a + 2],
				p = s[a + 3];
			return e[t] = o * p + u * h + l * f - c * d, e[t + 1] = l * p + u * d + c * h - o * f, e[t + 2] = c * p + u * f + o * d - l * h, e[t + 3] = u * p - o * h - l * d - c * f, e
		}
		get x() {
			return this._x
		}
		set x(e) {
			this._x = e, this._onChangeCallback()
		}
		get y() {
			return this._y
		}
		set y(e) {
			this._y = e, this._onChangeCallback()
		}
		get z() {
			return this._z
		}
		set z(e) {
			this._z = e, this._onChangeCallback()
		}
		get w() {
			return this._w
		}
		set w(e) {
			this._w = e, this._onChangeCallback()
		}
		set(e, t, n, i) {
			return this._x = e, this._y = t, this._z = n, this._w = i, this._onChangeCallback(), this
		}
		clone() {
			return new this.constructor(this._x, this._y, this._z, this._w)
		}
		copy(e) {
			return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this
		}
		setFromEuler(e, t) {
			if (!(e && e.isEuler)) throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
			let n = e._x,
				i = e._y,
				s = e._z,
				a = e._order,
				o = Math.cos,
				l = Math.sin,
				c = o(n / 2),
				u = o(i / 2),
				h = o(s / 2),
				d = l(n / 2),
				f = l(i / 2),
				p = l(s / 2);
			switch (a) {
				case "XYZ":
					this._x = d * u * h + c * f * p, this._y = c * f * h - d * u * p, this._z = c * u * p + d * f * h, this._w = c * u * h - d * f * p;
					break;
				case "YXZ":
					this._x = d * u * h + c * f * p, this._y = c * f * h - d * u * p, this._z = c * u * p - d * f * h, this._w = c * u * h + d * f * p;
					break;
				case "ZXY":
					this._x = d * u * h - c * f * p, this._y = c * f * h + d * u * p, this._z = c * u * p + d * f * h, this._w = c * u * h - d * f * p;
					break;
				case "ZYX":
					this._x = d * u * h - c * f * p, this._y = c * f * h + d * u * p, this._z = c * u * p - d * f * h, this._w = c * u * h + d * f * p;
					break;
				case "YZX":
					this._x = d * u * h + c * f * p, this._y = c * f * h + d * u * p, this._z = c * u * p - d * f * h, this._w = c * u * h - d * f * p;
					break;
				case "XZY":
					this._x = d * u * h - c * f * p, this._y = c * f * h - d * u * p, this._z = c * u * p + d * f * h, this._w = c * u * h + d * f * p;
					break;
				default:
					console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a)
			}
			return t !== !1 && this._onChangeCallback(), this
		}
		setFromAxisAngle(e, t) {
			let n = t / 2,
				i = Math.sin(n);
			return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(n), this._onChangeCallback(), this
		}
		setFromRotationMatrix(e) {
			let t = e.elements,
				n = t[0],
				i = t[4],
				s = t[8],
				a = t[1],
				o = t[5],
				l = t[9],
				c = t[2],
				u = t[6],
				h = t[10],
				d = n + o + h;
			if (d > 0) {
				let f = .5 / Math.sqrt(d + 1);
				this._w = .25 / f, this._x = (u - l) * f, this._y = (s - c) * f, this._z = (a - i) * f
			} else if (n > o && n > h) {
				let f = 2 * Math.sqrt(1 + n - o - h);
				this._w = (u - l) / f, this._x = .25 * f, this._y = (i + a) / f, this._z = (s + c) / f
			} else if (o > h) {
				let f = 2 * Math.sqrt(1 + o - n - h);
				this._w = (s - c) / f, this._x = (i + a) / f, this._y = .25 * f, this._z = (l + u) / f
			} else {
				let f = 2 * Math.sqrt(1 + h - n - o);
				this._w = (a - i) / f, this._x = (s + c) / f, this._y = (l + u) / f, this._z = .25 * f
			}
			return this._onChangeCallback(), this
		}
		setFromUnitVectors(e, t) {
			let n = e.dot(t) + 1;
			return n < Number.EPSILON ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize()
		}
		angleTo(e) {
			return 2 * Math.acos(Math.abs(It(this.dot(e), -1, 1)))
		}
		rotateTowards(e, t) {
			let n = this.angleTo(e);
			if (n === 0) return this;
			let i = Math.min(1, t / n);
			return this.slerp(e, i), this
		}
		identity() {
			return this.set(0, 0, 0, 1)
		}
		invert() {
			return this.conjugate()
		}
		conjugate() {
			return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this
		}
		dot(e) {
			return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
		}
		lengthSq() {
			return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
		}
		length() {
			return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
		}
		normalize() {
			let e = this.length();
			return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this
		}
		multiply(e, t) {
			return t !== void 0 ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(e, t)) : this.multiplyQuaternions(this, e)
		}
		premultiply(e) {
			return this.multiplyQuaternions(e, this)
		}
		multiplyQuaternions(e, t) {
			let n = e._x,
				i = e._y,
				s = e._z,
				a = e._w,
				o = t._x,
				l = t._y,
				c = t._z,
				u = t._w;
			return this._x = n * u + a * o + i * c - s * l, this._y = i * u + a * l + s * o - n * c, this._z = s * u + a * c + n * l - i * o, this._w = a * u - n * o - i * l - s * c, this._onChangeCallback(), this
		}
		slerp(e, t) {
			if (t === 0) return this;
			if (t === 1) return this.copy(e);
			let n = this._x,
				i = this._y,
				s = this._z,
				a = this._w,
				o = a * e._w + n * e._x + i * e._y + s * e._z;
			if (o < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, o = -o) : this.copy(e), o >= 1) return this._w = a, this._x = n, this._y = i, this._z = s, this;
			let l = 1 - o * o;
			if (l <= Number.EPSILON) {
				let f = 1 - t;
				return this._w = f * a + t * this._w, this._x = f * n + t * this._x, this._y = f * i + t * this._y, this._z = f * s + t * this._z, this.normalize(), this._onChangeCallback(), this
			}
			let c = Math.sqrt(l),
				u = Math.atan2(c, o),
				h = Math.sin((1 - t) * u) / c,
				d = Math.sin(t * u) / c;
			return this._w = a * h + this._w * d, this._x = n * h + this._x * d, this._y = i * h + this._y * d, this._z = s * h + this._z * d, this._onChangeCallback(), this
		}
		slerpQuaternions(e, t, n) {
			this.copy(e).slerp(t, n)
		}
		random() {
			let e = Math.random(),
				t = Math.sqrt(1 - e),
				n = Math.sqrt(e),
				i = 2 * Math.PI * Math.random(),
				s = 2 * Math.PI * Math.random();
			return this.set(t * Math.cos(i), n * Math.sin(s), n * Math.cos(s), t * Math.sin(i))
		}
		equals(e) {
			return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
		}
		fromArray(e, t = 0) {
			return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this
		}
		toArray(e = [], t = 0) {
			return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e
		}
		fromBufferAttribute(e, t) {
			return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this
		}
		_onChange(e) {
			return this._onChangeCallback = e, this
		}
		_onChangeCallback() { }
	};
	yt.prototype.isQuaternion = !0;
	var A = class {
		constructor(e = 0, t = 0, n = 0) {
			this.x = e, this.y = t, this.z = n
		}
		set(e, t, n) {
			return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this
		}
		setScalar(e) {
			return this.x = e, this.y = e, this.z = e, this
		}
		setX(e) {
			return this.x = e, this
		}
		setY(e) {
			return this.y = e, this
		}
		setZ(e) {
			return this.z = e, this
		}
		setComponent(e, t) {
			switch (e) {
				case 0:
					this.x = t;
					break;
				case 1:
					this.y = t;
					break;
				case 2:
					this.z = t;
					break;
				default:
					throw new Error("index is out of range: " + e)
			}
			return this
		}
		getComponent(e) {
			switch (e) {
				case 0:
					return this.x;
				case 1:
					return this.y;
				case 2:
					return this.z;
				default:
					throw new Error("index is out of range: " + e)
			}
		}
		clone() {
			return new this.constructor(this.x, this.y, this.z)
		}
		copy(e) {
			return this.x = e.x, this.y = e.y, this.z = e.z, this
		}
		add(e, t) {
			return t !== void 0 ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this)
		}
		addScalar(e) {
			return this.x += e, this.y += e, this.z += e, this
		}
		addVectors(e, t) {
			return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this
		}
		addScaledVector(e, t) {
			return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this
		}
		sub(e, t) {
			return t !== void 0 ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this)
		}
		subScalar(e) {
			return this.x -= e, this.y -= e, this.z -= e, this
		}
		subVectors(e, t) {
			return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this
		}
		multiply(e, t) {
			return t !== void 0 ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(e, t)) : (this.x *= e.x, this.y *= e.y, this.z *= e.z, this)
		}
		multiplyScalar(e) {
			return this.x *= e, this.y *= e, this.z *= e, this
		}
		multiplyVectors(e, t) {
			return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this
		}
		applyEuler(e) {
			return e && e.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), this.applyQuaternion(pd.setFromEuler(e))
		}
		applyAxisAngle(e, t) {
			return this.applyQuaternion(pd.setFromAxisAngle(e, t))
		}
		applyMatrix3(e) {
			let t = this.x,
				n = this.y,
				i = this.z,
				s = e.elements;
			return this.x = s[0] * t + s[3] * n + s[6] * i, this.y = s[1] * t + s[4] * n + s[7] * i, this.z = s[2] * t + s[5] * n + s[8] * i, this
		}
		applyNormalMatrix(e) {
			return this.applyMatrix3(e).normalize()
		}
		applyMatrix4(e) {
			let t = this.x,
				n = this.y,
				i = this.z,
				s = e.elements,
				a = 1 / (s[3] * t + s[7] * n + s[11] * i + s[15]);
			return this.x = (s[0] * t + s[4] * n + s[8] * i + s[12]) * a, this.y = (s[1] * t + s[5] * n + s[9] * i + s[13]) * a, this.z = (s[2] * t + s[6] * n + s[10] * i + s[14]) * a, this
		}
		applyQuaternion(e) {
			let t = this.x,
				n = this.y,
				i = this.z,
				s = e.x,
				a = e.y,
				o = e.z,
				l = e.w,
				c = l * t + a * i - o * n,
				u = l * n + o * t - s * i,
				h = l * i + s * n - a * t,
				d = -s * t - a * n - o * i;
			return this.x = c * l + d * -s + u * -o - h * -a, this.y = u * l + d * -a + h * -s - c * -o, this.z = h * l + d * -o + c * -a - u * -s, this
		}
		project(e) {
			return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)
		}
		unproject(e) {
			return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)
		}
		transformDirection(e) {
			let t = this.x,
				n = this.y,
				i = this.z,
				s = e.elements;
			return this.x = s[0] * t + s[4] * n + s[8] * i, this.y = s[1] * t + s[5] * n + s[9] * i, this.z = s[2] * t + s[6] * n + s[10] * i, this.normalize()
		}
		divide(e) {
			return this.x /= e.x, this.y /= e.y, this.z /= e.z, this
		}
		divideScalar(e) {
			return this.multiplyScalar(1 / e)
		}
		min(e) {
			return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this
		}
		max(e) {
			return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this
		}
		clamp(e, t) {
			return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this
		}
		clampScalar(e, t) {
			return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this
		}
		clampLength(e, t) {
			let n = this.length();
			return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)))
		}
		floor() {
			return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
		}
		ceil() {
			return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
		}
		round() {
			return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
		}
		roundToZero() {
			return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this
		}
		negate() {
			return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
		}
		dot(e) {
			return this.x * e.x + this.y * e.y + this.z * e.z
		}
		lengthSq() {
			return this.x * this.x + this.y * this.y + this.z * this.z
		}
		length() {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
		}
		manhattanLength() {
			return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
		}
		normalize() {
			return this.divideScalar(this.length() || 1)
		}
		setLength(e) {
			return this.normalize().multiplyScalar(e)
		}
		lerp(e, t) {
			return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this
		}
		lerpVectors(e, t, n) {
			return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this
		}
		cross(e, t) {
			return t !== void 0 ? (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(e, t)) : this.crossVectors(this, e)
		}
		crossVectors(e, t) {
			let n = e.x,
				i = e.y,
				s = e.z,
				a = t.x,
				o = t.y,
				l = t.z;
			return this.x = i * l - s * o, this.y = s * a - n * l, this.z = n * o - i * a, this
		}
		projectOnVector(e) {
			let t = e.lengthSq();
			if (t === 0) return this.set(0, 0, 0);
			let n = e.dot(this) / t;
			return this.copy(e).multiplyScalar(n)
		}
		projectOnPlane(e) {
			return Bl.copy(this).projectOnVector(e), this.sub(Bl)
		}
		reflect(e) {
			return this.sub(Bl.copy(e).multiplyScalar(2 * this.dot(e)))
		}
		angleTo(e) {
			let t = Math.sqrt(this.lengthSq() * e.lengthSq());
			if (t === 0) return Math.PI / 2;
			let n = this.dot(e) / t;
			return Math.acos(It(n, -1, 1))
		}
		distanceTo(e) {
			return Math.sqrt(this.distanceToSquared(e))
		}
		distanceToSquared(e) {
			let t = this.x - e.x,
				n = this.y - e.y,
				i = this.z - e.z;
			return t * t + n * n + i * i
		}
		manhattanDistanceTo(e) {
			return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z)
		}
		setFromSpherical(e) {
			return this.setFromSphericalCoords(e.radius, e.phi, e.theta)
		}
		setFromSphericalCoords(e, t, n) {
			let i = Math.sin(t) * e;
			return this.x = i * Math.sin(n), this.y = Math.cos(t) * e, this.z = i * Math.cos(n), this
		}
		setFromCylindrical(e) {
			return this.setFromCylindricalCoords(e.radius, e.theta, e.y)
		}
		setFromCylindricalCoords(e, t, n) {
			return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this
		}
		setFromMatrixPosition(e) {
			let t = e.elements;
			return this.x = t[12], this.y = t[13], this.z = t[14], this
		}
		setFromMatrixScale(e) {
			let t = this.setFromMatrixColumn(e, 0).length(),
				n = this.setFromMatrixColumn(e, 1).length(),
				i = this.setFromMatrixColumn(e, 2).length();
			return this.x = t, this.y = n, this.z = i, this
		}
		setFromMatrixColumn(e, t) {
			return this.fromArray(e.elements, t * 4)
		}
		setFromMatrix3Column(e, t) {
			return this.fromArray(e.elements, t * 3)
		}
		equals(e) {
			return e.x === this.x && e.y === this.y && e.z === this.z
		}
		fromArray(e, t = 0) {
			return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this
		}
		toArray(e = [], t = 0) {
			return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e
		}
		fromBufferAttribute(e, t, n) {
			return n !== void 0 && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this
		}
		random() {
			return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this
		}
		randomDirection() {
			let e = (Math.random() - .5) * 2,
				t = Math.random() * Math.PI * 2,
				n = Math.sqrt(1 - Qn(e, 2));
			return this.x = n * Math.cos(t), this.y = n * Math.sin(t), this.z = e, this
		} *[Symbol.iterator]() {
			yield this.x, yield this.y, yield this.z
		}
	};
	A.prototype.isVector3 = !0;
	var Bl = new A,
		pd = new yt,
		Bt = class {
			constructor(e = new A(1 / 0, 1 / 0, 1 / 0), t = new A(-1 / 0, -1 / 0, -1 / 0)) {
				this.min = e, this.max = t
			}
			set(e, t) {
				return this.min.copy(e), this.max.copy(t), this
			}
			setFromArray(e) {
				let t = 1 / 0,
					n = 1 / 0,
					i = 1 / 0,
					s = -1 / 0,
					a = -1 / 0,
					o = -1 / 0;
				for (let l = 0, c = e.length; l < c; l += 3) {
					let u = e[l],
						h = e[l + 1],
						d = e[l + 2];
					u < t && (t = u), h < n && (n = h), d < i && (i = d), u > s && (s = u), h > a && (a = h), d > o && (o = d)
				}
				return this.min.set(t, n, i), this.max.set(s, a, o), this
			}
			setFromBufferAttribute(e) {
				let t = 1 / 0,
					n = 1 / 0,
					i = 1 / 0,
					s = -1 / 0,
					a = -1 / 0,
					o = -1 / 0;
				for (let l = 0, c = e.count; l < c; l++) {
					let u = e.getX(l),
						h = e.getY(l),
						d = e.getZ(l);
					u < t && (t = u), h < n && (n = h), d < i && (i = d), u > s && (s = u), h > a && (a = h), d > o && (o = d)
				}
				return this.min.set(t, n, i), this.max.set(s, a, o), this
			}
			setFromPoints(e) {
				this.makeEmpty();
				for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
				return this
			}
			setFromCenterAndSize(e, t) {
				let n = Ps.copy(t).multiplyScalar(.5);
				return this.min.copy(e).sub(n), this.max.copy(e).add(n), this
			}
			setFromObject(e) {
				return this.makeEmpty(), this.expandByObject(e)
			}
			clone() {
				return new this.constructor().copy(this)
			}
			copy(e) {
				return this.min.copy(e.min), this.max.copy(e.max), this
			}
			makeEmpty() {
				return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this
			}
			isEmpty() {
				return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
			}
			getCenter(e) {
				return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5)
			}
			getSize(e) {
				return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min)
			}
			expandByPoint(e) {
				return this.min.min(e), this.max.max(e), this
			}
			expandByVector(e) {
				return this.min.sub(e), this.max.add(e), this
			}
			expandByScalar(e) {
				return this.min.addScalar(-e), this.max.addScalar(e), this
			}
			expandByObject(e) {
				e.updateWorldMatrix(!1, !1);
				let t = e.geometry;
				t !== void 0 && (t.boundingBox === null && t.computeBoundingBox(), Ul.copy(t.boundingBox), Ul.applyMatrix4(e.matrixWorld), this.union(Ul));
				let n = e.children;
				for (let i = 0, s = n.length; i < s; i++) this.expandByObject(n[i]);
				return this
			}
			containsPoint(e) {
				return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z)
			}
			containsBox(e) {
				return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z
			}
			getParameter(e, t) {
				return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
			}
			intersectsBox(e) {
				return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z)
			}
			intersectsSphere(e) {
				return this.clampPoint(e.center, Ps), Ps.distanceToSquared(e.center) <= e.radius * e.radius
			}
			intersectsPlane(e) {
				let t, n;
				return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant
			}
			intersectsTriangle(e) {
				if (this.isEmpty()) return !1;
				this.getCenter(Ls), Ca.subVectors(this.max, Ls), vr.subVectors(e.a, Ls), xr.subVectors(e.b, Ls), yr.subVectors(e.c, Ls), $n.subVectors(xr, vr), ei.subVectors(yr, xr), Hi.subVectors(vr, yr);
				let t = [0, -$n.z, $n.y, 0, -ei.z, ei.y, 0, -Hi.z, Hi.y, $n.z, 0, -$n.x, ei.z, 0, -ei.x, Hi.z, 0, -Hi.x, -$n.y, $n.x, 0, -ei.y, ei.x, 0, -Hi.y, Hi.x, 0];
				return !Fl(t, vr, xr, yr, Ca) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Fl(t, vr, xr, yr, Ca)) ? !1 : (Da.crossVectors($n, ei), t = [Da.x, Da.y, Da.z], Fl(t, vr, xr, yr, Ca))
			}
			clampPoint(e, t) {
				return t.copy(e).clamp(this.min, this.max)
			}
			distanceToPoint(e) {
				return Ps.copy(e).clamp(this.min, this.max).sub(e).length()
			}
			getBoundingSphere(e) {
				return this.getCenter(e.center), e.radius = this.getSize(Ps).length() * .5, e
			}
			intersect(e) {
				return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this
			}
			union(e) {
				return this.min.min(e.min), this.max.max(e.max), this
			}
			applyMatrix4(e) {
				return this.isEmpty() ? this : (Bn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Bn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Bn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Bn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Bn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Bn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Bn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Bn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Bn), this)
			}
			translate(e) {
				return this.min.add(e), this.max.add(e), this
			}
			equals(e) {
				return e.min.equals(this.min) && e.max.equals(this.max)
			}
		};
	Bt.prototype.isBox3 = !0;
	var Bn = [new A, new A, new A, new A, new A, new A, new A, new A],
		Ps = new A,
		Ul = new Bt,
		vr = new A,
		xr = new A,
		yr = new A,
		$n = new A,
		ei = new A,
		Hi = new A,
		Ls = new A,
		Ca = new A,
		Da = new A,
		zi = new A;

	function Fl(r, e, t, n, i) {
		for (let s = 0, a = r.length - 3; s <= a; s += 3) {
			zi.fromArray(r, s);
			let o = i.x * Math.abs(zi.x) + i.y * Math.abs(zi.y) + i.z * Math.abs(zi.z),
				l = e.dot(zi),
				c = t.dot(zi),
				u = n.dot(zi);
			if (Math.max(-Math.max(l, c, u), Math.min(l, c, u)) > o) return !1
		}
		return !0
	}
	var gg = new Bt,
		md = new A,
		Ol = new A,
		Nl = new A,
		Un = class {
			constructor(e = new A, t = -1) {
				this.center = e, this.radius = t
			}
			set(e, t) {
				return this.center.copy(e), this.radius = t, this
			}
			setFromPoints(e, t) {
				let n = this.center;
				t !== void 0 ? n.copy(t) : gg.setFromPoints(e).getCenter(n);
				let i = 0;
				for (let s = 0, a = e.length; s < a; s++) i = Math.max(i, n.distanceToSquared(e[s]));
				return this.radius = Math.sqrt(i), this
			}
			copy(e) {
				return this.center.copy(e.center), this.radius = e.radius, this
			}
			isEmpty() {
				return this.radius < 0
			}
			makeEmpty() {
				return this.center.set(0, 0, 0), this.radius = -1, this
			}
			containsPoint(e) {
				return e.distanceToSquared(this.center) <= this.radius * this.radius
			}
			distanceToPoint(e) {
				return e.distanceTo(this.center) - this.radius
			}
			intersectsSphere(e) {
				let t = this.radius + e.radius;
				return e.center.distanceToSquared(this.center) <= t * t
			}
			intersectsBox(e) {
				return e.intersectsSphere(this)
			}
			intersectsPlane(e) {
				return Math.abs(e.distanceToPoint(this.center)) <= this.radius
			}
			clampPoint(e, t) {
				let n = this.center.distanceToSquared(e);
				return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t
			}
			getBoundingBox(e) {
				return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e)
			}
			applyMatrix4(e) {
				return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this
			}
			translate(e) {
				return this.center.add(e), this
			}
			expandByPoint(e) {
				Nl.subVectors(e, this.center);
				let t = Nl.lengthSq();
				if (t > this.radius * this.radius) {
					let n = Math.sqrt(t),
						i = (n - this.radius) * .5;
					this.center.add(Nl.multiplyScalar(i / n)), this.radius += i
				}
				return this
			}
			union(e) {
				return Ol.subVectors(e.center, this.center).normalize().multiplyScalar(e.radius), this.expandByPoint(md.copy(e.center).add(Ol)), this.expandByPoint(md.copy(e.center).sub(Ol)), this
			}
			equals(e) {
				return e.center.equals(this.center) && e.radius === this.radius
			}
			clone() {
				return new this.constructor().copy(this)
			}
		},
		Fn = new A,
		Hl = new A,
		Ra = new A,
		ti = new A,
		zl = new A,
		Pa = new A,
		Gl = new A,
		On = class {
			constructor(e = new A, t = new A(0, 0, -1)) {
				this.origin = e, this.direction = t
			}
			set(e, t) {
				return this.origin.copy(e), this.direction.copy(t), this
			}
			copy(e) {
				return this.origin.copy(e.origin), this.direction.copy(e.direction), this
			}
			at(e, t) {
				return t.copy(this.direction).multiplyScalar(e).add(this.origin)
			}
			lookAt(e) {
				return this.direction.copy(e).sub(this.origin).normalize(), this
			}
			recast(e) {
				return this.origin.copy(this.at(e, Fn)), this
			}
			closestPointToPoint(e, t) {
				t.subVectors(e, this.origin);
				let n = t.dot(this.direction);
				return n < 0 ? t.copy(this.origin) : t.copy(this.direction).multiplyScalar(n).add(this.origin)
			}
			distanceToPoint(e) {
				return Math.sqrt(this.distanceSqToPoint(e))
			}
			distanceSqToPoint(e) {
				let t = Fn.subVectors(e, this.origin).dot(this.direction);
				return t < 0 ? this.origin.distanceToSquared(e) : (Fn.copy(this.direction).multiplyScalar(t).add(this.origin), Fn.distanceToSquared(e))
			}
			distanceSqToSegment(e, t, n, i) {
				Hl.copy(e).add(t).multiplyScalar(.5), Ra.copy(t).sub(e).normalize(), ti.copy(this.origin).sub(Hl);
				let s = e.distanceTo(t) * .5,
					a = -this.direction.dot(Ra),
					o = ti.dot(this.direction),
					l = -ti.dot(Ra),
					c = ti.lengthSq(),
					u = Math.abs(1 - a * a),
					h, d, f, p;
				if (u > 0)
					if (h = a * l - o, d = a * o - l, p = s * u, h >= 0)
						if (d >= -p)
							if (d <= p) {
								let v = 1 / u;
								h *= v, d *= v, f = h * (h + a * d + 2 * o) + d * (a * h + d + 2 * l) + c
							} else d = s, h = Math.max(0, -(a * d + o)), f = -h * h + d * (d + 2 * l) + c;
						else d = -s, h = Math.max(0, -(a * d + o)), f = -h * h + d * (d + 2 * l) + c;
					else d <= -p ? (h = Math.max(0, -(-a * s + o)), d = h > 0 ? -s : Math.min(Math.max(-s, -l), s), f = -h * h + d * (d + 2 * l) + c) : d <= p ? (h = 0, d = Math.min(Math.max(-s, -l), s), f = d * (d + 2 * l) + c) : (h = Math.max(0, -(a * s + o)), d = h > 0 ? s : Math.min(Math.max(-s, -l), s), f = -h * h + d * (d + 2 * l) + c);
				else d = a > 0 ? -s : s, h = Math.max(0, -(a * d + o)), f = -h * h + d * (d + 2 * l) + c;
				return n && n.copy(this.direction).multiplyScalar(h).add(this.origin), i && i.copy(Ra).multiplyScalar(d).add(Hl), f
			}
			intersectSphere(e, t) {
				Fn.subVectors(e.center, this.origin);
				let n = Fn.dot(this.direction),
					i = Fn.dot(Fn) - n * n,
					s = e.radius * e.radius;
				if (i > s) return null;
				let a = Math.sqrt(s - i),
					o = n - a,
					l = n + a;
				return o < 0 && l < 0 ? null : o < 0 ? this.at(l, t) : this.at(o, t)
			}
			intersectsSphere(e) {
				return this.distanceSqToPoint(e.center) <= e.radius * e.radius
			}
			distanceToPlane(e) {
				let t = e.normal.dot(this.direction);
				if (t === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null;
				let n = -(this.origin.dot(e.normal) + e.constant) / t;
				return n >= 0 ? n : null
			}
			intersectPlane(e, t) {
				let n = this.distanceToPlane(e);
				return n === null ? null : this.at(n, t)
			}
			intersectsPlane(e) {
				let t = e.distanceToPoint(this.origin);
				return t === 0 || e.normal.dot(this.direction) * t < 0
			}
			intersectBox(e, t) {
				let n, i, s, a, o, l, c = 1 / this.direction.x,
					u = 1 / this.direction.y,
					h = 1 / this.direction.z,
					d = this.origin;
				return c >= 0 ? (n = (e.min.x - d.x) * c, i = (e.max.x - d.x) * c) : (n = (e.max.x - d.x) * c, i = (e.min.x - d.x) * c), u >= 0 ? (s = (e.min.y - d.y) * u, a = (e.max.y - d.y) * u) : (s = (e.max.y - d.y) * u, a = (e.min.y - d.y) * u), n > a || s > i || ((s > n || n !== n) && (n = s), (a < i || i !== i) && (i = a), h >= 0 ? (o = (e.min.z - d.z) * h, l = (e.max.z - d.z) * h) : (o = (e.max.z - d.z) * h, l = (e.min.z - d.z) * h), n > l || o > i) || ((o > n || n !== n) && (n = o), (l < i || i !== i) && (i = l), i < 0) ? null : this.at(n >= 0 ? n : i, t)
			}
			intersectsBox(e) {
				return this.intersectBox(e, Fn) !== null
			}
			intersectTriangle(e, t, n, i, s) {
				zl.subVectors(t, e), Pa.subVectors(n, e), Gl.crossVectors(zl, Pa);
				let a = this.direction.dot(Gl),
					o;
				if (a > 0) {
					if (i) return null;
					o = 1
				} else if (a < 0) o = -1, a = -a;
				else return null;
				ti.subVectors(this.origin, e);
				let l = o * this.direction.dot(Pa.crossVectors(ti, Pa));
				if (l < 0) return null;
				let c = o * this.direction.dot(zl.cross(ti));
				if (c < 0 || l + c > a) return null;
				let u = -o * ti.dot(Gl);
				return u < 0 ? null : this.at(u / a, s)
			}
			applyMatrix4(e) {
				return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this
			}
			equals(e) {
				return e.origin.equals(this.origin) && e.direction.equals(this.direction)
			}
			clone() {
				return new this.constructor().copy(this)
			}
		},
		ge = class {
			constructor() {
				this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
			}
			set(e, t, n, i, s, a, o, l, c, u, h, d, f, p, v, x) {
				let g = this.elements;
				return g[0] = e, g[4] = t, g[8] = n, g[12] = i, g[1] = s, g[5] = a, g[9] = o, g[13] = l, g[2] = c, g[6] = u, g[10] = h, g[14] = d, g[3] = f, g[7] = p, g[11] = v, g[15] = x, this
			}
			identity() {
				return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
			}
			clone() {
				return new ge().fromArray(this.elements)
			}
			copy(e) {
				let t = this.elements,
					n = e.elements;
				return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this
			}
			copyPosition(e) {
				let t = this.elements,
					n = e.elements;
				return t[12] = n[12], t[13] = n[13], t[14] = n[14], this
			}
			setFromMatrix3(e) {
				let t = e.elements;
				return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this
			}
			extractBasis(e, t, n) {
				return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this
			}
			makeBasis(e, t, n) {
				return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this
			}
			extractRotation(e) {
				let t = this.elements,
					n = e.elements,
					i = 1 / wr.setFromMatrixColumn(e, 0).length(),
					s = 1 / wr.setFromMatrixColumn(e, 1).length(),
					a = 1 / wr.setFromMatrixColumn(e, 2).length();
				return t[0] = n[0] * i, t[1] = n[1] * i, t[2] = n[2] * i, t[3] = 0, t[4] = n[4] * s, t[5] = n[5] * s, t[6] = n[6] * s, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
			}
			makeRotationFromEuler(e) {
				e && e.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
				let t = this.elements,
					n = e.x,
					i = e.y,
					s = e.z,
					a = Math.cos(n),
					o = Math.sin(n),
					l = Math.cos(i),
					c = Math.sin(i),
					u = Math.cos(s),
					h = Math.sin(s);
				if (e.order === "XYZ") {
					let d = a * u,
						f = a * h,
						p = o * u,
						v = o * h;
					t[0] = l * u, t[4] = -l * h, t[8] = c, t[1] = f + p * c, t[5] = d - v * c, t[9] = -o * l, t[2] = v - d * c, t[6] = p + f * c, t[10] = a * l
				} else if (e.order === "YXZ") {
					let d = l * u,
						f = l * h,
						p = c * u,
						v = c * h;
					t[0] = d + v * o, t[4] = p * o - f, t[8] = a * c, t[1] = a * h, t[5] = a * u, t[9] = -o, t[2] = f * o - p, t[6] = v + d * o, t[10] = a * l
				} else if (e.order === "ZXY") {
					let d = l * u,
						f = l * h,
						p = c * u,
						v = c * h;
					t[0] = d - v * o, t[4] = -a * h, t[8] = p + f * o, t[1] = f + p * o, t[5] = a * u, t[9] = v - d * o, t[2] = -a * c, t[6] = o, t[10] = a * l
				} else if (e.order === "ZYX") {
					let d = a * u,
						f = a * h,
						p = o * u,
						v = o * h;
					t[0] = l * u, t[4] = p * c - f, t[8] = d * c + v, t[1] = l * h, t[5] = v * c + d, t[9] = f * c - p, t[2] = -c, t[6] = o * l, t[10] = a * l
				} else if (e.order === "YZX") {
					let d = a * l,
						f = a * c,
						p = o * l,
						v = o * c;
					t[0] = l * u, t[4] = v - d * h, t[8] = p * h + f, t[1] = h, t[5] = a * u, t[9] = -o * u, t[2] = -c * u, t[6] = f * h + p, t[10] = d - v * h
				} else if (e.order === "XZY") {
					let d = a * l,
						f = a * c,
						p = o * l,
						v = o * c;
					t[0] = l * u, t[4] = -h, t[8] = c * u, t[1] = d * h + v, t[5] = a * u, t[9] = f * h - p, t[2] = p * h - f, t[6] = o * u, t[10] = v * h + d
				}
				return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
			}
			makeRotationFromQuaternion(e) {
				return this.compose(vg, e, xg)
			}
			lookAt(e, t, n) {
				let i = this.elements;
				return Yt.subVectors(e, t), Yt.lengthSq() === 0 && (Yt.z = 1), Yt.normalize(), ni.crossVectors(n, Yt), ni.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Yt.x += 1e-4 : Yt.z += 1e-4, Yt.normalize(), ni.crossVectors(n, Yt)), ni.normalize(), La.crossVectors(Yt, ni), i[0] = ni.x, i[4] = La.x, i[8] = Yt.x, i[1] = ni.y, i[5] = La.y, i[9] = Yt.y, i[2] = ni.z, i[6] = La.z, i[10] = Yt.z, this
			}
			multiply(e, t) {
				return t !== void 0 ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(e, t)) : this.multiplyMatrices(this, e)
			}
			premultiply(e) {
				return this.multiplyMatrices(e, this)
			}
			multiplyMatrices(e, t) {
				let n = e.elements,
					i = t.elements,
					s = this.elements,
					a = n[0],
					o = n[4],
					l = n[8],
					c = n[12],
					u = n[1],
					h = n[5],
					d = n[9],
					f = n[13],
					p = n[2],
					v = n[6],
					x = n[10],
					g = n[14],
					m = n[3],
					b = n[7],
					y = n[11],
					E = n[15],
					_ = i[0],
					w = i[4],
					D = i[8],
					I = i[12],
					L = i[1],
					R = i[5],
					Z = i[9],
					F = i[13],
					U = i[2],
					z = i[6],
					N = i[10],
					G = i[14],
					ne = i[3],
					fe = i[7],
					Y = i[11],
					j = i[15];
				return s[0] = a * _ + o * L + l * U + c * ne, s[4] = a * w + o * R + l * z + c * fe, s[8] = a * D + o * Z + l * N + c * Y, s[12] = a * I + o * F + l * G + c * j, s[1] = u * _ + h * L + d * U + f * ne, s[5] = u * w + h * R + d * z + f * fe, s[9] = u * D + h * Z + d * N + f * Y, s[13] = u * I + h * F + d * G + f * j, s[2] = p * _ + v * L + x * U + g * ne, s[6] = p * w + v * R + x * z + g * fe, s[10] = p * D + v * Z + x * N + g * Y, s[14] = p * I + v * F + x * G + g * j, s[3] = m * _ + b * L + y * U + E * ne, s[7] = m * w + b * R + y * z + E * fe, s[11] = m * D + b * Z + y * N + E * Y, s[15] = m * I + b * F + y * G + E * j, this
			}
			multiplyScalar(e) {
				let t = this.elements;
				return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this
			}
			determinant() {
				let e = this.elements,
					t = e[0],
					n = e[4],
					i = e[8],
					s = e[12],
					a = e[1],
					o = e[5],
					l = e[9],
					c = e[13],
					u = e[2],
					h = e[6],
					d = e[10],
					f = e[14],
					p = e[3],
					v = e[7],
					x = e[11],
					g = e[15];
				return p * (+s * l * h - i * c * h - s * o * d + n * c * d + i * o * f - n * l * f) + v * (+t * l * f - t * c * d + s * a * d - i * a * f + i * c * u - s * l * u) + x * (+t * c * h - t * o * f - s * a * h + n * a * f + s * o * u - n * c * u) + g * (-i * o * u - t * l * h + t * o * d + i * a * h - n * a * d + n * l * u)
			}
			transpose() {
				let e = this.elements,
					t;
				return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this
			}
			setPosition(e, t, n) {
				let i = this.elements;
				return e.isVector3 ? (i[12] = e.x, i[13] = e.y, i[14] = e.z) : (i[12] = e, i[13] = t, i[14] = n), this
			}
			invert() {
				let e = this.elements,
					t = e[0],
					n = e[1],
					i = e[2],
					s = e[3],
					a = e[4],
					o = e[5],
					l = e[6],
					c = e[7],
					u = e[8],
					h = e[9],
					d = e[10],
					f = e[11],
					p = e[12],
					v = e[13],
					x = e[14],
					g = e[15],
					m = h * x * c - v * d * c + v * l * f - o * x * f - h * l * g + o * d * g,
					b = p * d * c - u * x * c - p * l * f + a * x * f + u * l * g - a * d * g,
					y = u * v * c - p * h * c + p * o * f - a * v * f - u * o * g + a * h * g,
					E = p * h * l - u * v * l - p * o * d + a * v * d + u * o * x - a * h * x,
					_ = t * m + n * b + i * y + s * E;
				if (_ === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				let w = 1 / _;
				return e[0] = m * w, e[1] = (v * d * s - h * x * s - v * i * f + n * x * f + h * i * g - n * d * g) * w, e[2] = (o * x * s - v * l * s + v * i * c - n * x * c - o * i * g + n * l * g) * w, e[3] = (h * l * s - o * d * s - h * i * c + n * d * c + o * i * f - n * l * f) * w, e[4] = b * w, e[5] = (u * x * s - p * d * s + p * i * f - t * x * f - u * i * g + t * d * g) * w, e[6] = (p * l * s - a * x * s - p * i * c + t * x * c + a * i * g - t * l * g) * w, e[7] = (a * d * s - u * l * s + u * i * c - t * d * c - a * i * f + t * l * f) * w, e[8] = y * w, e[9] = (p * h * s - u * v * s - p * n * f + t * v * f + u * n * g - t * h * g) * w, e[10] = (a * v * s - p * o * s + p * n * c - t * v * c - a * n * g + t * o * g) * w, e[11] = (u * o * s - a * h * s - u * n * c + t * h * c + a * n * f - t * o * f) * w, e[12] = E * w, e[13] = (u * v * i - p * h * i + p * n * d - t * v * d - u * n * x + t * h * x) * w, e[14] = (p * o * i - a * v * i - p * n * l + t * v * l + a * n * x - t * o * x) * w, e[15] = (a * h * i - u * o * i + u * n * l - t * h * l - a * n * d + t * o * d) * w, this
			}
			scale(e) {
				let t = this.elements,
					n = e.x,
					i = e.y,
					s = e.z;
				return t[0] *= n, t[4] *= i, t[8] *= s, t[1] *= n, t[5] *= i, t[9] *= s, t[2] *= n, t[6] *= i, t[10] *= s, t[3] *= n, t[7] *= i, t[11] *= s, this
			}
			getMaxScaleOnAxis() {
				let e = this.elements,
					t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
					n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
					i = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
				return Math.sqrt(Math.max(t, n, i))
			}
			makeTranslation(e, t, n) {
				return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this
			}
			makeRotationX(e) {
				let t = Math.cos(e),
					n = Math.sin(e);
				return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this
			}
			makeRotationY(e) {
				let t = Math.cos(e),
					n = Math.sin(e);
				return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this
			}
			makeRotationZ(e) {
				let t = Math.cos(e),
					n = Math.sin(e);
				return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
			}
			makeRotationAxis(e, t) {
				let n = Math.cos(t),
					i = Math.sin(t),
					s = 1 - n,
					a = e.x,
					o = e.y,
					l = e.z,
					c = s * a,
					u = s * o;
				return this.set(c * a + n, c * o - i * l, c * l + i * o, 0, c * o + i * l, u * o + n, u * l - i * a, 0, c * l - i * o, u * l + i * a, s * l * l + n, 0, 0, 0, 0, 1), this
			}
			makeScale(e, t, n) {
				return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this
			}
			makeShear(e, t, n, i, s, a) {
				return this.set(1, n, s, 0, e, 1, a, 0, t, i, 1, 0, 0, 0, 0, 1), this
			}
			compose(e, t, n) {
				let i = this.elements,
					s = t._x,
					a = t._y,
					o = t._z,
					l = t._w,
					c = s + s,
					u = a + a,
					h = o + o,
					d = s * c,
					f = s * u,
					p = s * h,
					v = a * u,
					x = a * h,
					g = o * h,
					m = l * c,
					b = l * u,
					y = l * h,
					E = n.x,
					_ = n.y,
					w = n.z;
				return i[0] = (1 - (v + g)) * E, i[1] = (f + y) * E, i[2] = (p - b) * E, i[3] = 0, i[4] = (f - y) * _, i[5] = (1 - (d + g)) * _, i[6] = (x + m) * _, i[7] = 0, i[8] = (p + b) * w, i[9] = (x - m) * w, i[10] = (1 - (d + v)) * w, i[11] = 0, i[12] = e.x, i[13] = e.y, i[14] = e.z, i[15] = 1, this
			}
			decompose(e, t, n) {
				let i = this.elements,
					s = wr.set(i[0], i[1], i[2]).length(),
					a = wr.set(i[4], i[5], i[6]).length(),
					o = wr.set(i[8], i[9], i[10]).length();
				this.determinant() < 0 && (s = -s), e.x = i[12], e.y = i[13], e.z = i[14], un.copy(this);
				let c = 1 / s,
					u = 1 / a,
					h = 1 / o;
				return un.elements[0] *= c, un.elements[1] *= c, un.elements[2] *= c, un.elements[4] *= u, un.elements[5] *= u, un.elements[6] *= u, un.elements[8] *= h, un.elements[9] *= h, un.elements[10] *= h, t.setFromRotationMatrix(un), n.x = s, n.y = a, n.z = o, this
			}
			makePerspective(e, t, n, i, s, a) {
				a === void 0 && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
				let o = this.elements,
					l = 2 * s / (t - e),
					c = 2 * s / (n - i),
					u = (t + e) / (t - e),
					h = (n + i) / (n - i),
					d = -(a + s) / (a - s),
					f = -2 * a * s / (a - s);
				return o[0] = l, o[4] = 0, o[8] = u, o[12] = 0, o[1] = 0, o[5] = c, o[9] = h, o[13] = 0, o[2] = 0, o[6] = 0, o[10] = d, o[14] = f, o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, this
			}
			makeOrthographic(e, t, n, i, s, a) {
				let o = this.elements,
					l = 1 / (t - e),
					c = 1 / (n - i),
					u = 1 / (a - s),
					h = (t + e) * l,
					d = (n + i) * c,
					f = (a + s) * u;
				return o[0] = 2 * l, o[4] = 0, o[8] = 0, o[12] = -h, o[1] = 0, o[5] = 2 * c, o[9] = 0, o[13] = -d, o[2] = 0, o[6] = 0, o[10] = -2 * u, o[14] = -f, o[3] = 0, o[7] = 0, o[11] = 0, o[15] = 1, this
			}
			equals(e) {
				let t = this.elements,
					n = e.elements;
				for (let i = 0; i < 16; i++)
					if (t[i] !== n[i]) return !1;
				return !0
			}
			fromArray(e, t = 0) {
				for (let n = 0; n < 16; n++) this.elements[n] = e[n + t];
				return this
			}
			toArray(e = [], t = 0) {
				let n = this.elements;
				return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e
			}
		};
	ge.prototype.isMatrix4 = !0;
	var wr = new A,
		un = new ge,
		vg = new A(0, 0, 0),
		xg = new A(1, 1, 1),
		ni = new A,
		La = new A,
		Yt = new A,
		gd = new ge,
		vd = new yt,
		ii = class {
			constructor(e = 0, t = 0, n = 0, i = ii.DefaultOrder) {
				this._x = e, this._y = t, this._z = n, this._order = i
			}
			get x() {
				return this._x
			}
			set x(e) {
				this._x = e, this._onChangeCallback()
			}
			get y() {
				return this._y
			}
			set y(e) {
				this._y = e, this._onChangeCallback()
			}
			get z() {
				return this._z
			}
			set z(e) {
				this._z = e, this._onChangeCallback()
			}
			get order() {
				return this._order
			}
			set order(e) {
				this._order = e, this._onChangeCallback()
			}
			set(e, t, n, i = this._order) {
				return this._x = e, this._y = t, this._z = n, this._order = i, this._onChangeCallback(), this
			}
			clone() {
				return new this.constructor(this._x, this._y, this._z, this._order)
			}
			copy(e) {
				return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this
			}
			setFromRotationMatrix(e, t = this._order, n = !0) {
				let i = e.elements,
					s = i[0],
					a = i[4],
					o = i[8],
					l = i[1],
					c = i[5],
					u = i[9],
					h = i[2],
					d = i[6],
					f = i[10];
				switch (t) {
					case "XYZ":
						this._y = Math.asin(It(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-u, f), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(d, c), this._z = 0);
						break;
					case "YXZ":
						this._x = Math.asin(-It(u, -1, 1)), Math.abs(u) < .9999999 ? (this._y = Math.atan2(o, f), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-h, s), this._z = 0);
						break;
					case "ZXY":
						this._x = Math.asin(It(d, -1, 1)), Math.abs(d) < .9999999 ? (this._y = Math.atan2(-h, f), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, s));
						break;
					case "ZYX":
						this._y = Math.asin(-It(h, -1, 1)), Math.abs(h) < .9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-a, c));
						break;
					case "YZX":
						this._z = Math.asin(It(l, -1, 1)), Math.abs(l) < .9999999 ? (this._x = Math.atan2(-u, c), this._y = Math.atan2(-h, s)) : (this._x = 0, this._y = Math.atan2(o, f));
						break;
					case "XZY":
						this._z = Math.asin(-It(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-u, f), this._y = 0);
						break;
					default:
						console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t)
				}
				return this._order = t, n === !0 && this._onChangeCallback(), this
			}
			setFromQuaternion(e, t, n) {
				return gd.makeRotationFromQuaternion(e), this.setFromRotationMatrix(gd, t, n)
			}
			setFromVector3(e, t = this._order) {
				return this.set(e.x, e.y, e.z, t)
			}
			reorder(e) {
				return vd.setFromEuler(this), this.setFromQuaternion(vd, e)
			}
			equals(e) {
				return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
			}
			fromArray(e) {
				return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this
			}
			toArray(e = [], t = 0) {
				return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e
			}
			toVector3(e) {
				return e ? e.set(this._x, this._y, this._z) : new A(this._x, this._y, this._z)
			}
			_onChange(e) {
				return this._onChangeCallback = e, this
			}
			_onChangeCallback() { }
		};
	ii.prototype.isEuler = !0;
	ii.DefaultOrder = "XYZ";
	ii.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"];
	var Ia = class {
		constructor() {
			this.mask = 1 | 0
		}
		set(e) {
			this.mask = (1 << e | 0) >>> 0
		}
		enable(e) {
			this.mask |= 1 << e | 0
		}
		enableAll() {
			this.mask = 4294967295 | 0
		}
		toggle(e) {
			this.mask ^= 1 << e | 0
		}
		disable(e) {
			this.mask &= ~(1 << e | 0)
		}
		disableAll() {
			this.mask = 0
		}
		test(e) {
			return (this.mask & e.mask) != 0
		}
		isEnabled(e) {
			return (this.mask & (1 << e | 0)) != 0
		}
	},
		yg = 0,
		xd = new A,
		br = new yt,
		Nn = new ge,
		Ba = new A,
		Is = new A,
		wg = new A,
		bg = new yt,
		yd = new A(1, 0, 0),
		wd = new A(0, 1, 0),
		bd = new A(0, 0, 1),
		Ag = {
			type: "added"
		},
		Ad = {
			type: "removed"
		},
		_e = class extends Pt {
			constructor() {
				super();
				Object.defineProperty(this, "id", {
					value: yg++
				}), this.uuid = Wt(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = _e.DefaultUp.clone();
				let e = new A,
					t = new ii,
					n = new yt,
					i = new A(1, 1, 1);

				function s() {
					n.setFromEuler(t, !1)
				}

				function a() {
					t.setFromQuaternion(n, void 0, !1)
				}
				t._onChange(s), n._onChange(a), Object.defineProperties(this, {
					position: {
						configurable: !0,
						enumerable: !0,
						value: e
					},
					rotation: {
						configurable: !0,
						enumerable: !0,
						value: t
					},
					quaternion: {
						configurable: !0,
						enumerable: !0,
						value: n
					},
					scale: {
						configurable: !0,
						enumerable: !0,
						value: i
					},
					modelViewMatrix: {
						value: new ge
					},
					normalMatrix: {
						value: new Et
					}
				}), this.matrix = new ge, this.matrixWorld = new ge, this.matrixAutoUpdate = _e.DefaultMatrixAutoUpdate, this.matrixWorldNeedsUpdate = !1, this.layers = new Ia, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {}
			}
			onBeforeRender() { }
			onAfterRender() { }
			applyMatrix4(e) {
				this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale)
			}
			applyQuaternion(e) {
				return this.quaternion.premultiply(e), this
			}
			setRotationFromAxisAngle(e, t) {
				this.quaternion.setFromAxisAngle(e, t)
			}
			setRotationFromEuler(e) {
				this.quaternion.setFromEuler(e, !0)
			}
			setRotationFromMatrix(e) {
				this.quaternion.setFromRotationMatrix(e)
			}
			setRotationFromQuaternion(e) {
				this.quaternion.copy(e)
			}
			rotateOnAxis(e, t) {
				return br.setFromAxisAngle(e, t), this.quaternion.multiply(br), this
			}
			rotateOnWorldAxis(e, t) {
				return br.setFromAxisAngle(e, t), this.quaternion.premultiply(br), this
			}
			rotateX(e) {
				return this.rotateOnAxis(yd, e)
			}
			rotateY(e) {
				return this.rotateOnAxis(wd, e)
			}
			rotateZ(e) {
				return this.rotateOnAxis(bd, e)
			}
			translateOnAxis(e, t) {
				return xd.copy(e).applyQuaternion(this.quaternion), this.position.add(xd.multiplyScalar(t)), this
			}
			translateX(e) {
				return this.translateOnAxis(yd, e)
			}
			translateY(e) {
				return this.translateOnAxis(wd, e)
			}
			translateZ(e) {
				return this.translateOnAxis(bd, e)
			}
			localToWorld(e) {
				return e.applyMatrix4(this.matrixWorld)
			}
			worldToLocal(e) {
				return e.applyMatrix4(Nn.copy(this.matrixWorld).invert())
			}
			lookAt(e, t, n) {
				e.isVector3 ? Ba.copy(e) : Ba.set(e, t, n);
				let i = this.parent;
				this.updateWorldMatrix(!0, !1), Is.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Nn.lookAt(Is, Ba, this.up) : Nn.lookAt(Ba, Is, this.up), this.quaternion.setFromRotationMatrix(Nn), i && (Nn.extractRotation(i.matrixWorld), br.setFromRotationMatrix(Nn), this.quaternion.premultiply(br.invert()))
			}
			add(e) {
				if (arguments.length > 1) {
					for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);
					return this
				}
				return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.parent !== null && e.parent.remove(e), e.parent = this, this.children.push(e), e.dispatchEvent(Ag)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this)
			}
			remove(e) {
				if (arguments.length > 1) {
					for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
					return this
				}
				let t = this.children.indexOf(e);
				return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Ad)), this
			}
			removeFromParent() {
				let e = this.parent;
				return e !== null && e.remove(this), this
			}
			clear() {
				for (let e = 0; e < this.children.length; e++) {
					let t = this.children[e];
					t.parent = null, t.dispatchEvent(Ad)
				}
				return this.children.length = 0, this
			}
			attach(e) {
				return this.updateWorldMatrix(!0, !1), Nn.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), Nn.multiply(e.parent.matrixWorld)), e.applyMatrix4(Nn), this.add(e), e.updateWorldMatrix(!1, !0), this
			}
			getObjectById(e) {
				return this.getObjectByProperty("id", e)
			}
			getObjectByName(e) {
				return this.getObjectByProperty("name", e)
			}
			getObjectByProperty(e, t) {
				if (this[e] === t) return this;
				for (let n = 0, i = this.children.length; n < i; n++) {
					let a = this.children[n].getObjectByProperty(e, t);
					if (a !== void 0) return a
				}
			}
			getWorldPosition(e) {
				return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld)
			}
			getWorldQuaternion(e) {
				return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Is, e, wg), e
			}
			getWorldScale(e) {
				return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Is, bg, e), e
			}
			getWorldDirection(e) {
				this.updateWorldMatrix(!0, !1);
				let t = this.matrixWorld.elements;
				return e.set(t[8], t[9], t[10]).normalize()
			}
			raycast() { }
			traverse(e) {
				e(this);
				let t = this.children;
				for (let n = 0, i = t.length; n < i; n++) t[n].traverse(e)
			}
			traverseVisible(e) {
				if (this.visible === !1) return;
				e(this);
				let t = this.children;
				for (let n = 0, i = t.length; n < i; n++) t[n].traverseVisible(e)
			}
			traverseAncestors(e) {
				let t = this.parent;
				t !== null && (e(t), t.traverseAncestors(e))
			}
			updateMatrix() {
				this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
			}
			updateMatrixWorld(e) {
				this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
				let t = this.children;
				for (let n = 0, i = t.length; n < i; n++) t[n].updateMatrixWorld(e)
			}
			updateWorldMatrix(e, t) {
				let n = this.parent;
				if (e === !0 && n !== null && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), t === !0) {
					let i = this.children;
					for (let s = 0, a = i.length; s < a; s++) i[s].updateWorldMatrix(!1, !0)
				}
			}
			toJSON(e) {
				let t = e === void 0 || typeof e == "string",
					n = {};
				t && (e = {
					geometries: {},
					materials: {},
					textures: {},
					images: {},
					shapes: {},
					skeletons: {},
					animations: {}
				}, n.metadata = {
					version: 4.5,
					type: "Object",
					generator: "Object3D.toJSON"
				});
				let i = {};
				i.uuid = this.uuid, i.type = this.type, this.name !== "" && (i.name = this.name), this.castShadow === !0 && (i.castShadow = !0), this.receiveShadow === !0 && (i.receiveShadow = !0), this.visible === !1 && (i.visible = !1), this.frustumCulled === !1 && (i.frustumCulled = !1), this.renderOrder !== 0 && (i.renderOrder = this.renderOrder), JSON.stringify(this.userData) !== "{}" && (i.userData = this.userData), i.layers = this.layers.mask, i.matrix = this.matrix.toArray(), this.matrixAutoUpdate === !1 && (i.matrixAutoUpdate = !1), this.isInstancedMesh && (i.type = "InstancedMesh", i.count = this.count, i.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (i.instanceColor = this.instanceColor.toJSON()));

				function s(o, l) {
					return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(e)), l.uuid
				}
				if (this.isScene) this.background && (this.background.isColor ? i.background = this.background.toJSON() : this.background.isTexture && (i.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && (i.environment = this.environment.toJSON(e).uuid);
				else if (this.isMesh || this.isLine || this.isPoints) {
					i.geometry = s(e.geometries, this.geometry);
					let o = this.geometry.parameters;
					if (o !== void 0 && o.shapes !== void 0) {
						let l = o.shapes;
						if (Array.isArray(l))
							for (let c = 0, u = l.length; c < u; c++) {
								let h = l[c];
								s(e.shapes, h)
							} else s(e.shapes, l)
					}
				}
				if (this.isSkinnedMesh && (i.bindMode = this.bindMode, i.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(e.skeletons, this.skeleton), i.skeleton = this.skeleton.uuid)), this.material !== void 0)
					if (Array.isArray(this.material)) {
						let o = [];
						for (let l = 0, c = this.material.length; l < c; l++) o.push(s(e.materials, this.material[l]));
						i.material = o
					} else i.material = s(e.materials, this.material);
				if (this.children.length > 0) {
					i.children = [];
					for (let o = 0; o < this.children.length; o++) i.children.push(this.children[o].toJSON(e).object)
				}
				if (this.animations.length > 0) {
					i.animations = [];
					for (let o = 0; o < this.animations.length; o++) {
						let l = this.animations[o];
						i.animations.push(s(e.animations, l))
					}
				}
				if (t) {
					let o = a(e.geometries),
						l = a(e.materials),
						c = a(e.textures),
						u = a(e.images),
						h = a(e.shapes),
						d = a(e.skeletons),
						f = a(e.animations);
					o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), u.length > 0 && (n.images = u), h.length > 0 && (n.shapes = h), d.length > 0 && (n.skeletons = d), f.length > 0 && (n.animations = f)
				}
				return n.object = i, n;

				function a(o) {
					let l = [];
					for (let c in o) {
						let u = o[c];
						delete u.metadata, l.push(u)
					}
					return l
				}
			}
			clone(e) {
				return new this.constructor().copy(this, e)
			}
			copy(e, t = !0) {
				if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
					for (let n = 0; n < e.children.length; n++) {
						let i = e.children[n];
						this.add(i.clone())
					}
				return this
			}
		};
	_e.DefaultUp = new A(0, 1, 0);
	_e.DefaultMatrixAutoUpdate = !0;
	_e.prototype.isObject3D = !0;
	var hn = new A,
		Hn = new A,
		kl = new A,
		zn = new A,
		Ar = new A,
		Er = new A,
		Ed = new A,
		Vl = new A,
		Wl = new A,
		Yl = new A,
		pt = class {
			constructor(e = new A, t = new A, n = new A) {
				this.a = e, this.b = t, this.c = n
			}
			static getNormal(e, t, n, i) {
				i.subVectors(n, t), hn.subVectors(e, t), i.cross(hn);
				let s = i.lengthSq();
				return s > 0 ? i.multiplyScalar(1 / Math.sqrt(s)) : i.set(0, 0, 0)
			}
			static getBarycoord(e, t, n, i, s) {
				hn.subVectors(i, t), Hn.subVectors(n, t), kl.subVectors(e, t);
				let a = hn.dot(hn),
					o = hn.dot(Hn),
					l = hn.dot(kl),
					c = Hn.dot(Hn),
					u = Hn.dot(kl),
					h = a * c - o * o;
				if (h === 0) return s.set(-2, -1, -1);
				let d = 1 / h,
					f = (c * l - o * u) * d,
					p = (a * u - o * l) * d;
				return s.set(1 - f - p, p, f)
			}
			static containsPoint(e, t, n, i) {
				return this.getBarycoord(e, t, n, i, zn), zn.x >= 0 && zn.y >= 0 && zn.x + zn.y <= 1
			}
			static getUV(e, t, n, i, s, a, o, l) {
				return this.getBarycoord(e, t, n, i, zn), l.set(0, 0), l.addScaledVector(s, zn.x), l.addScaledVector(a, zn.y), l.addScaledVector(o, zn.z), l
			}
			static isFrontFacing(e, t, n, i) {
				return hn.subVectors(n, t), Hn.subVectors(e, t), hn.cross(Hn).dot(i) < 0
			}
			set(e, t, n) {
				return this.a.copy(e), this.b.copy(t), this.c.copy(n), this
			}
			setFromPointsAndIndices(e, t, n, i) {
				return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[i]), this
			}
			setFromAttributeAndIndices(e, t, n, i) {
				return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, i), this
			}
			clone() {
				return new this.constructor().copy(this)
			}
			copy(e) {
				return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this
			}
			getArea() {
				return hn.subVectors(this.c, this.b), Hn.subVectors(this.a, this.b), hn.cross(Hn).length() * .5
			}
			getMidpoint(e) {
				return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
			}
			getNormal(e) {
				return pt.getNormal(this.a, this.b, this.c, e)
			}
			getPlane(e) {
				return e.setFromCoplanarPoints(this.a, this.b, this.c)
			}
			getBarycoord(e, t) {
				return pt.getBarycoord(e, this.a, this.b, this.c, t)
			}
			getUV(e, t, n, i, s) {
				return pt.getUV(e, this.a, this.b, this.c, t, n, i, s)
			}
			containsPoint(e) {
				return pt.containsPoint(e, this.a, this.b, this.c)
			}
			isFrontFacing(e) {
				return pt.isFrontFacing(this.a, this.b, this.c, e)
			}
			intersectsBox(e) {
				return e.intersectsTriangle(this)
			}
			closestPointToPoint(e, t) {
				let n = this.a,
					i = this.b,
					s = this.c,
					a, o;
				Ar.subVectors(i, n), Er.subVectors(s, n), Vl.subVectors(e, n);
				let l = Ar.dot(Vl),
					c = Er.dot(Vl);
				if (l <= 0 && c <= 0) return t.copy(n);
				Wl.subVectors(e, i);
				let u = Ar.dot(Wl),
					h = Er.dot(Wl);
				if (u >= 0 && h <= u) return t.copy(i);
				let d = l * h - u * c;
				if (d <= 0 && l >= 0 && u <= 0) return a = l / (l - u), t.copy(n).addScaledVector(Ar, a);
				Yl.subVectors(e, s);
				let f = Ar.dot(Yl),
					p = Er.dot(Yl);
				if (p >= 0 && f <= p) return t.copy(s);
				let v = f * c - l * p;
				if (v <= 0 && c >= 0 && p <= 0) return o = c / (c - p), t.copy(n).addScaledVector(Er, o);
				let x = u * p - f * h;
				if (x <= 0 && h - u >= 0 && f - p >= 0) return Ed.subVectors(s, i), o = (h - u) / (h - u + (f - p)), t.copy(i).addScaledVector(Ed, o);
				let g = 1 / (x + v + d);
				return a = v * g, o = d * g, t.copy(n).addScaledVector(Ar, a).addScaledVector(Er, o)
			}
			equals(e) {
				return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
			}
		},
		Eg = 0,
		tt = class extends Pt {
			constructor() {
				super();
				Object.defineProperty(this, "id", {
					value: Eg++
				}), this.uuid = Wt(), this.name = "", this.type = "Material", this.fog = !0, this.blending = hr, this.side = Rn, this.vertexColors = !1, this.opacity = 1, this.format = Tt, this.transparent = !1, this.blendSrc = dl, this.blendDst = fl, this.blendEquation = Ci, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = va, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = cd, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Sa, this.stencilZFail = Sa, this.stencilZPass = Sa, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0
			}
			get alphaTest() {
				return this._alphaTest
			}
			set alphaTest(e) {
				this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e
			}
			onBuild() { }
			onBeforeRender() { }
			onBeforeCompile() { }
			customProgramCacheKey() {
				return this.onBeforeCompile.toString()
			}
			setValues(e) {
				if (e !== void 0)
					for (let t in e) {
						let n = e[t];
						if (n === void 0) {
							console.warn("THREE.Material: '" + t + "' parameter is undefined.");
							continue
						}
						if (t === "shading") {
							console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = n === ol;
							continue
						}
						let i = this[t];
						if (i === void 0) {
							console.warn("THREE." + this.type + ": '" + t + "' is not a property of this material.");
							continue
						}
						i && i.isColor ? i.set(n) : i && i.isVector3 && n && n.isVector3 ? i.copy(n) : this[t] = n
					}
			}
			toJSON(e) {
				let t = e === void 0 || typeof e == "string";
				t && (e = {
					textures: {},
					images: {}
				});
				let n = {
					metadata: {
						version: 4.5,
						type: "Material",
						generator: "Material.toJSON"
					}
				};
				n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== hr && (n.blending = this.blending), this.side !== Rn && (n.side = this.side), this.vertexColors && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.format !== Tt && (n.format = this.format), this.transparent === !0 && (n.transparent = this.transparent), n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, n.colorWrite = this.colorWrite, n.stencilWrite = this.stencilWrite, n.stencilWriteMask = this.stencilWriteMask, n.stencilFunc = this.stencilFunc, n.stencilRef = this.stencilRef, n.stencilFuncMask = this.stencilFuncMask, n.stencilFail = this.stencilFail, n.stencilZFail = this.stencilZFail, n.stencilZPass = this.stencilZPass, this.rotation && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaToCoverage === !0 && (n.alphaToCoverage = this.alphaToCoverage), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = this.premultipliedAlpha), this.wireframe === !0 && (n.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = this.flatShading), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), JSON.stringify(this.userData) !== "{}" && (n.userData = this.userData);

				function i(s) {
					let a = [];
					for (let o in s) {
						let l = s[o];
						delete l.metadata, a.push(l)
					}
					return a
				}
				if (t) {
					let s = i(e.textures),
						a = i(e.images);
					s.length > 0 && (n.textures = s), a.length > 0 && (n.images = a)
				}
				return n
			}
			clone() {
				return new this.constructor().copy(this)
			}
			copy(e) {
				this.name = e.name, this.fog = e.fog, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.format = e.format, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
				let t = e.clippingPlanes,
					n = null;
				if (t !== null) {
					let i = t.length;
					n = new Array(i);
					for (let s = 0; s !== i; ++s) n[s] = t[s].clone()
				}
				return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this
			}
			dispose() {
				this.dispatchEvent({
					type: "dispose"
				})
			}
			set needsUpdate(e) {
				e === !0 && this.version++
			}
		};
	tt.prototype.isMaterial = !0;
	var Md = {
		aliceblue: 15792383,
		antiquewhite: 16444375,
		aqua: 65535,
		aquamarine: 8388564,
		azure: 15794175,
		beige: 16119260,
		bisque: 16770244,
		black: 0,
		blanchedalmond: 16772045,
		blue: 255,
		blueviolet: 9055202,
		brown: 10824234,
		burlywood: 14596231,
		cadetblue: 6266528,
		chartreuse: 8388352,
		chocolate: 13789470,
		coral: 16744272,
		cornflowerblue: 6591981,
		cornsilk: 16775388,
		crimson: 14423100,
		cyan: 65535,
		darkblue: 139,
		darkcyan: 35723,
		darkgoldenrod: 12092939,
		darkgray: 11119017,
		darkgreen: 25600,
		darkgrey: 11119017,
		darkkhaki: 12433259,
		darkmagenta: 9109643,
		darkolivegreen: 5597999,
		darkorange: 16747520,
		darkorchid: 10040012,
		darkred: 9109504,
		darksalmon: 15308410,
		darkseagreen: 9419919,
		darkslateblue: 4734347,
		darkslategray: 3100495,
		darkslategrey: 3100495,
		darkturquoise: 52945,
		darkviolet: 9699539,
		deeppink: 16716947,
		deepskyblue: 49151,
		dimgray: 6908265,
		dimgrey: 6908265,
		dodgerblue: 2003199,
		firebrick: 11674146,
		floralwhite: 16775920,
		forestgreen: 2263842,
		fuchsia: 16711935,
		gainsboro: 14474460,
		ghostwhite: 16316671,
		gold: 16766720,
		goldenrod: 14329120,
		gray: 8421504,
		green: 32768,
		greenyellow: 11403055,
		grey: 8421504,
		honeydew: 15794160,
		hotpink: 16738740,
		indianred: 13458524,
		indigo: 4915330,
		ivory: 16777200,
		khaki: 15787660,
		lavender: 15132410,
		lavenderblush: 16773365,
		lawngreen: 8190976,
		lemonchiffon: 16775885,
		lightblue: 11393254,
		lightcoral: 15761536,
		lightcyan: 14745599,
		lightgoldenrodyellow: 16448210,
		lightgray: 13882323,
		lightgreen: 9498256,
		lightgrey: 13882323,
		lightpink: 16758465,
		lightsalmon: 16752762,
		lightseagreen: 2142890,
		lightskyblue: 8900346,
		lightslategray: 7833753,
		lightslategrey: 7833753,
		lightsteelblue: 11584734,
		lightyellow: 16777184,
		lime: 65280,
		limegreen: 3329330,
		linen: 16445670,
		magenta: 16711935,
		maroon: 8388608,
		mediumaquamarine: 6737322,
		mediumblue: 205,
		mediumorchid: 12211667,
		mediumpurple: 9662683,
		mediumseagreen: 3978097,
		mediumslateblue: 8087790,
		mediumspringgreen: 64154,
		mediumturquoise: 4772300,
		mediumvioletred: 13047173,
		midnightblue: 1644912,
		mintcream: 16121850,
		mistyrose: 16770273,
		moccasin: 16770229,
		navajowhite: 16768685,
		navy: 128,
		oldlace: 16643558,
		olive: 8421376,
		olivedrab: 7048739,
		orange: 16753920,
		orangered: 16729344,
		orchid: 14315734,
		palegoldenrod: 15657130,
		palegreen: 10025880,
		paleturquoise: 11529966,
		palevioletred: 14381203,
		papayawhip: 16773077,
		peachpuff: 16767673,
		peru: 13468991,
		pink: 16761035,
		plum: 14524637,
		powderblue: 11591910,
		purple: 8388736,
		rebeccapurple: 6697881,
		red: 16711680,
		rosybrown: 12357519,
		royalblue: 4286945,
		saddlebrown: 9127187,
		salmon: 16416882,
		sandybrown: 16032864,
		seagreen: 3050327,
		seashell: 16774638,
		sienna: 10506797,
		silver: 12632256,
		skyblue: 8900331,
		slateblue: 6970061,
		slategray: 7372944,
		slategrey: 7372944,
		snow: 16775930,
		springgreen: 65407,
		steelblue: 4620980,
		tan: 13808780,
		teal: 32896,
		thistle: 14204888,
		tomato: 16737095,
		turquoise: 4251856,
		violet: 15631086,
		wheat: 16113331,
		white: 16777215,
		whitesmoke: 16119285,
		yellow: 16776960,
		yellowgreen: 10145074
	},
		dn = {
			h: 0,
			s: 0,
			l: 0
		},
		Ua = {
			h: 0,
			s: 0,
			l: 0
		};

	function jl(r, e, t) {
		return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? r + (e - r) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? r + (e - r) * 6 * (2 / 3 - t) : r
	}

	function Xl(r) {
		return r < .04045 ? r * .0773993808 : Math.pow(r * .9478672986 + .0521327014, 2.4)
	}

	function Ql(r) {
		return r < .0031308 ? r * 12.92 : 1.055 * Math.pow(r, .41666) - .055
	}
	var $ = class {
		constructor(e, t, n) {
			return t === void 0 && n === void 0 ? this.set(e) : this.setRGB(e, t, n)
		}
		set(e) {
			return e && e.isColor ? this.copy(e) : typeof e == "number" ? this.setHex(e) : typeof e == "string" && this.setStyle(e), this
		}
		setScalar(e) {
			return this.r = e, this.g = e, this.b = e, this
		}
		setHex(e) {
			return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, this
		}
		setRGB(e, t, n) {
			return this.r = e, this.g = t, this.b = n, this
		}
		setHSL(e, t, n) {
			if (e = Rl(e, 1), t = It(t, 0, 1), n = It(n, 0, 1), t === 0) this.r = this.g = this.b = n;
			else {
				let i = n <= .5 ? n * (1 + t) : n + t - n * t,
					s = 2 * n - i;
				this.r = jl(s, i, e + 1 / 3), this.g = jl(s, i, e), this.b = jl(s, i, e - 1 / 3)
			}
			return this
		}
		setStyle(e) {
			function t(i) {
				i !== void 0 && parseFloat(i) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.")
			}
			let n;
			if (n = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)) {
				let i, s = n[1],
					a = n[2];
				switch (s) {
					case "rgb":
					case "rgba":
						if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)) return this.r = Math.min(255, parseInt(i[1], 10)) / 255, this.g = Math.min(255, parseInt(i[2], 10)) / 255, this.b = Math.min(255, parseInt(i[3], 10)) / 255, t(i[4]), this;
						if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)) return this.r = Math.min(100, parseInt(i[1], 10)) / 100, this.g = Math.min(100, parseInt(i[2], 10)) / 100, this.b = Math.min(100, parseInt(i[3], 10)) / 100, t(i[4]), this;
						break;
					case "hsl":
					case "hsla":
						if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)) {
							let o = parseFloat(i[1]) / 360,
								l = parseInt(i[2], 10) / 100,
								c = parseInt(i[3], 10) / 100;
							return t(i[4]), this.setHSL(o, l, c)
						}
						break
				}
			} else if (n = /^\#([A-Fa-f\d]+)$/.exec(e)) {
				let i = n[1],
					s = i.length;
				if (s === 3) return this.r = parseInt(i.charAt(0) + i.charAt(0), 16) / 255, this.g = parseInt(i.charAt(1) + i.charAt(1), 16) / 255, this.b = parseInt(i.charAt(2) + i.charAt(2), 16) / 255, this;
				if (s === 6) return this.r = parseInt(i.charAt(0) + i.charAt(1), 16) / 255, this.g = parseInt(i.charAt(2) + i.charAt(3), 16) / 255, this.b = parseInt(i.charAt(4) + i.charAt(5), 16) / 255, this
			}
			return e && e.length > 0 ? this.setColorName(e) : this
		}
		setColorName(e) {
			let t = Md[e.toLowerCase()];
			return t !== void 0 ? this.setHex(t) : console.warn("THREE.Color: Unknown color " + e), this
		}
		clone() {
			return new this.constructor(this.r, this.g, this.b)
		}
		copy(e) {
			return this.r = e.r, this.g = e.g, this.b = e.b, this
		}
		copyGammaToLinear(e, t = 2) {
			return this.r = Math.pow(e.r, t), this.g = Math.pow(e.g, t), this.b = Math.pow(e.b, t), this
		}
		copyLinearToGamma(e, t = 2) {
			let n = t > 0 ? 1 / t : 1;
			return this.r = Math.pow(e.r, n), this.g = Math.pow(e.g, n), this.b = Math.pow(e.b, n), this
		}
		convertGammaToLinear(e) {
			return this.copyGammaToLinear(this, e), this
		}
		convertLinearToGamma(e) {
			return this.copyLinearToGamma(this, e), this
		}
		copySRGBToLinear(e) {
			return this.r = Xl(e.r), this.g = Xl(e.g), this.b = Xl(e.b), this
		}
		copyLinearToSRGB(e) {
			return this.r = Ql(e.r), this.g = Ql(e.g), this.b = Ql(e.b), this
		}
		convertSRGBToLinear() {
			return this.copySRGBToLinear(this), this
		}
		convertLinearToSRGB() {
			return this.copyLinearToSRGB(this), this
		}
		getHex() {
			return this.r * 255 << 16 ^ this.g * 255 << 8 ^ this.b * 255 << 0
		}
		getHexString() {
			return ("000000" + this.getHex().toString(16)).slice(-6)
		}
		getHSL(e) {
			let t = this.r,
				n = this.g,
				i = this.b,
				s = Math.max(t, n, i),
				a = Math.min(t, n, i),
				o, l, c = (a + s) / 2;
			if (a === s) o = 0, l = 0;
			else {
				let u = s - a;
				switch (l = c <= .5 ? u / (s + a) : u / (2 - s - a), s) {
					case t:
						o = (n - i) / u + (n < i ? 6 : 0);
						break;
					case n:
						o = (i - t) / u + 2;
						break;
					case i:
						o = (t - n) / u + 4;
						break
				}
				o /= 6
			}
			return e.h = o, e.s = l, e.l = c, e
		}
		getStyle() {
			return "rgb(" + (this.r * 255 | 0) + "," + (this.g * 255 | 0) + "," + (this.b * 255 | 0) + ")"
		}
		offsetHSL(e, t, n) {
			return this.getHSL(dn), dn.h += e, dn.s += t, dn.l += n, this.setHSL(dn.h, dn.s, dn.l), this
		}
		add(e) {
			return this.r += e.r, this.g += e.g, this.b += e.b, this
		}
		addColors(e, t) {
			return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this
		}
		addScalar(e) {
			return this.r += e, this.g += e, this.b += e, this
		}
		sub(e) {
			return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this
		}
		multiply(e) {
			return this.r *= e.r, this.g *= e.g, this.b *= e.b, this
		}
		multiplyScalar(e) {
			return this.r *= e, this.g *= e, this.b *= e, this
		}
		lerp(e, t) {
			return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this
		}
		lerpColors(e, t, n) {
			return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this
		}
		lerpHSL(e, t) {
			this.getHSL(dn), e.getHSL(Ua);
			let n = Rs(dn.h, Ua.h, t),
				i = Rs(dn.s, Ua.s, t),
				s = Rs(dn.l, Ua.l, t);
			return this.setHSL(n, i, s), this
		}
		equals(e) {
			return e.r === this.r && e.g === this.g && e.b === this.b
		}
		fromArray(e, t = 0) {
			return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this
		}
		toArray(e = [], t = 0) {
			return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e
		}
		fromBufferAttribute(e, t) {
			return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), e.normalized === !0 && (this.r /= 255, this.g /= 255, this.b /= 255), this
		}
		toJSON() {
			return this.getHex()
		}
	};
	$.NAMES = Md;
	$.prototype.isColor = !0;
	$.prototype.r = 1;
	$.prototype.g = 1;
	$.prototype.b = 1;
	var zt = class extends tt {
		constructor(e) {
			super();
			this.type = "MeshBasicMaterial", this.color = new $(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = ws, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.setValues(e)
		}
		copy(e) {
			return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this
		}
	};
	zt.prototype.isMeshBasicMaterial = !0;
	var nt = new A,
		Fa = new O,
		pe = class {
			constructor(e, t, n) {
				if (Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
				this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n === !0, this.usage = pr, this.updateRange = {
					offset: 0,
					count: -1
				}, this.version = 0
			}
			onUploadCallback() { }
			set needsUpdate(e) {
				e === !0 && this.version++
			}
			setUsage(e) {
				return this.usage = e, this
			}
			copy(e) {
				return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this
			}
			copyAt(e, t, n) {
				e *= this.itemSize, n *= t.itemSize;
				for (let i = 0, s = this.itemSize; i < s; i++) this.array[e + i] = t.array[n + i];
				return this
			}
			copyArray(e) {
				return this.array.set(e), this
			}
			copyColorsArray(e) {
				let t = this.array,
					n = 0;
				for (let i = 0, s = e.length; i < s; i++) {
					let a = e[i];
					a === void 0 && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", i), a = new $), t[n++] = a.r, t[n++] = a.g, t[n++] = a.b
				}
				return this
			}
			copyVector2sArray(e) {
				let t = this.array,
					n = 0;
				for (let i = 0, s = e.length; i < s; i++) {
					let a = e[i];
					a === void 0 && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", i), a = new O), t[n++] = a.x, t[n++] = a.y
				}
				return this
			}
			copyVector3sArray(e) {
				let t = this.array,
					n = 0;
				for (let i = 0, s = e.length; i < s; i++) {
					let a = e[i];
					a === void 0 && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", i), a = new A), t[n++] = a.x, t[n++] = a.y, t[n++] = a.z
				}
				return this
			}
			copyVector4sArray(e) {
				let t = this.array,
					n = 0;
				for (let i = 0, s = e.length; i < s; i++) {
					let a = e[i];
					a === void 0 && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", i), a = new Ve), t[n++] = a.x, t[n++] = a.y, t[n++] = a.z, t[n++] = a.w
				}
				return this
			}
			applyMatrix3(e) {
				if (this.itemSize === 2)
					for (let t = 0, n = this.count; t < n; t++) Fa.fromBufferAttribute(this, t), Fa.applyMatrix3(e), this.setXY(t, Fa.x, Fa.y);
				else if (this.itemSize === 3)
					for (let t = 0, n = this.count; t < n; t++) nt.fromBufferAttribute(this, t), nt.applyMatrix3(e), this.setXYZ(t, nt.x, nt.y, nt.z);
				return this
			}
			applyMatrix4(e) {
				for (let t = 0, n = this.count; t < n; t++) nt.x = this.getX(t), nt.y = this.getY(t), nt.z = this.getZ(t), nt.applyMatrix4(e), this.setXYZ(t, nt.x, nt.y, nt.z);
				return this
			}
			applyNormalMatrix(e) {
				for (let t = 0, n = this.count; t < n; t++) nt.x = this.getX(t), nt.y = this.getY(t), nt.z = this.getZ(t), nt.applyNormalMatrix(e), this.setXYZ(t, nt.x, nt.y, nt.z);
				return this
			}
			transformDirection(e) {
				for (let t = 0, n = this.count; t < n; t++) nt.x = this.getX(t), nt.y = this.getY(t), nt.z = this.getZ(t), nt.transformDirection(e), this.setXYZ(t, nt.x, nt.y, nt.z);
				return this
			}
			set(e, t = 0) {
				return this.array.set(e, t), this
			}
			getX(e) {
				return this.array[e * this.itemSize]
			}
			setX(e, t) {
				return this.array[e * this.itemSize] = t, this
			}
			getY(e) {
				return this.array[e * this.itemSize + 1]
			}
			setY(e, t) {
				return this.array[e * this.itemSize + 1] = t, this
			}
			getZ(e) {
				return this.array[e * this.itemSize + 2]
			}
			setZ(e, t) {
				return this.array[e * this.itemSize + 2] = t, this
			}
			getW(e) {
				return this.array[e * this.itemSize + 3]
			}
			setW(e, t) {
				return this.array[e * this.itemSize + 3] = t, this
			}
			setXY(e, t, n) {
				return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = n, this
			}
			setXYZ(e, t, n, i) {
				return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this
			}
			setXYZW(e, t, n, i, s) {
				return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this.array[e + 3] = s, this
			}
			onUpload(e) {
				return this.onUploadCallback = e, this
			}
			clone() {
				return new this.constructor(this.array, this.itemSize).copy(this)
			}
			toJSON() {
				let e = {
					itemSize: this.itemSize,
					type: this.array.constructor.name,
					array: Array.prototype.slice.call(this.array),
					normalized: this.normalized
				};
				return this.name !== "" && (e.name = this.name), this.usage !== pr && (e.usage = this.usage), (this.updateRange.offset !== 0 || this.updateRange.count !== -1) && (e.updateRange = this.updateRange), e
			}
		};
	pe.prototype.isBufferAttribute = !0;
	var ql = class extends pe {
		constructor(e, t, n) {
			super(new Int8Array(e), t, n)
		}
	},
		Zl = class extends pe {
			constructor(e, t, n) {
				super(new Uint8Array(e), t, n)
			}
		},
		Jl = class extends pe {
			constructor(e, t, n) {
				super(new Uint8ClampedArray(e), t, n)
			}
		},
		Kl = class extends pe {
			constructor(e, t, n) {
				super(new Int16Array(e), t, n)
			}
		},
		Bs = class extends pe {
			constructor(e, t, n) {
				super(new Uint16Array(e), t, n)
			}
		},
		$l = class extends pe {
			constructor(e, t, n) {
				super(new Int32Array(e), t, n)
			}
		},
		Us = class extends pe {
			constructor(e, t, n) {
				super(new Uint32Array(e), t, n)
			}
		},
		ec = class extends pe {
			constructor(e, t, n) {
				super(new Uint16Array(e), t, n)
			}
		};
	ec.prototype.isFloat16BufferAttribute = !0;
	var ce = class extends pe {
		constructor(e, t, n) {
			super(new Float32Array(e), t, n)
		}
	},
		tc = class extends pe {
			constructor(e, t, n) {
				super(new Float64Array(e), t, n)
			}
		},
		Mg = 0,
		Jt = new ge,
		nc = new _e,
		Mr = new A,
		jt = new Bt,
		Fs = new Bt,
		Ct = new A,
		de = class extends Pt {
			constructor() {
				super();
				Object.defineProperty(this, "id", {
					value: Mg++
				}), this.uuid = Wt(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
					start: 0,
					count: 1 / 0
				}, this.userData = {}
			}
			getIndex() {
				return this.index
			}
			setIndex(e) {
				return Array.isArray(e) ? this.index = new (dd(e) > 65535 ? Us : Bs)(e, 1) : this.index = e, this
			}
			getAttribute(e) {
				return this.attributes[e]
			}
			setAttribute(e, t) {
				return this.attributes[e] = t, this
			}
			deleteAttribute(e) {
				return delete this.attributes[e], this
			}
			hasAttribute(e) {
				return this.attributes[e] !== void 0
			}
			addGroup(e, t, n = 0) {
				this.groups.push({
					start: e,
					count: t,
					materialIndex: n
				})
			}
			clearGroups() {
				this.groups = []
			}
			setDrawRange(e, t) {
				this.drawRange.start = e, this.drawRange.count = t
			}
			applyMatrix4(e) {
				let t = this.attributes.position;
				t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
				let n = this.attributes.normal;
				if (n !== void 0) {
					let s = new Et().getNormalMatrix(e);
					n.applyNormalMatrix(s), n.needsUpdate = !0
				}
				let i = this.attributes.tangent;
				return i !== void 0 && (i.transformDirection(e), i.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this
			}
			applyQuaternion(e) {
				return Jt.makeRotationFromQuaternion(e), this.applyMatrix4(Jt), this
			}
			rotateX(e) {
				return Jt.makeRotationX(e), this.applyMatrix4(Jt), this
			}
			rotateY(e) {
				return Jt.makeRotationY(e), this.applyMatrix4(Jt), this
			}
			rotateZ(e) {
				return Jt.makeRotationZ(e), this.applyMatrix4(Jt), this
			}
			translate(e, t, n) {
				return Jt.makeTranslation(e, t, n), this.applyMatrix4(Jt), this
			}
			scale(e, t, n) {
				return Jt.makeScale(e, t, n), this.applyMatrix4(Jt), this
			}
			lookAt(e) {
				return nc.lookAt(e), nc.updateMatrix(), this.applyMatrix4(nc.matrix), this
			}
			center() {
				return this.computeBoundingBox(), this.boundingBox.getCenter(Mr).negate(), this.translate(Mr.x, Mr.y, Mr.z), this
			}
			setFromPoints(e) {
				let t = [];
				for (let n = 0, i = e.length; n < i; n++) {
					let s = e[n];
					t.push(s.x, s.y, s.z || 0)
				}
				return this.setAttribute("position", new ce(t, 3)), this
			}
			computeBoundingBox() {
				this.boundingBox === null && (this.boundingBox = new Bt);
				let e = this.attributes.position,
					t = this.morphAttributes.position;
				if (e && e.isGLBufferAttribute) {
					console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingBox.set(new A(-1 / 0, -1 / 0, -1 / 0), new A(1 / 0, 1 / 0, 1 / 0));
					return
				}
				if (e !== void 0) {
					if (this.boundingBox.setFromBufferAttribute(e), t)
						for (let n = 0, i = t.length; n < i; n++) {
							let s = t[n];
							jt.setFromBufferAttribute(s), this.morphTargetsRelative ? (Ct.addVectors(this.boundingBox.min, jt.min), this.boundingBox.expandByPoint(Ct), Ct.addVectors(this.boundingBox.max, jt.max), this.boundingBox.expandByPoint(Ct)) : (this.boundingBox.expandByPoint(jt.min), this.boundingBox.expandByPoint(jt.max))
						}
				} else this.boundingBox.makeEmpty();
				(isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
			}
			computeBoundingSphere() {
				this.boundingSphere === null && (this.boundingSphere = new Un);
				let e = this.attributes.position,
					t = this.morphAttributes.position;
				if (e && e.isGLBufferAttribute) {
					console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingSphere.set(new A, 1 / 0);
					return
				}
				if (e) {
					let n = this.boundingSphere.center;
					if (jt.setFromBufferAttribute(e), t)
						for (let s = 0, a = t.length; s < a; s++) {
							let o = t[s];
							Fs.setFromBufferAttribute(o), this.morphTargetsRelative ? (Ct.addVectors(jt.min, Fs.min), jt.expandByPoint(Ct), Ct.addVectors(jt.max, Fs.max), jt.expandByPoint(Ct)) : (jt.expandByPoint(Fs.min), jt.expandByPoint(Fs.max))
						}
					jt.getCenter(n);
					let i = 0;
					for (let s = 0, a = e.count; s < a; s++) Ct.fromBufferAttribute(e, s), i = Math.max(i, n.distanceToSquared(Ct));
					if (t)
						for (let s = 0, a = t.length; s < a; s++) {
							let o = t[s],
								l = this.morphTargetsRelative;
							for (let c = 0, u = o.count; c < u; c++) Ct.fromBufferAttribute(o, c), l && (Mr.fromBufferAttribute(e, c), Ct.add(Mr)), i = Math.max(i, n.distanceToSquared(Ct))
						}
					this.boundingSphere.radius = Math.sqrt(i), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
				}
			}
			computeTangents() {
				let e = this.index,
					t = this.attributes;
				if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
					console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
					return
				}
				let n = e.array,
					i = t.position.array,
					s = t.normal.array,
					a = t.uv.array,
					o = i.length / 3;
				t.tangent === void 0 && this.setAttribute("tangent", new pe(new Float32Array(4 * o), 4));
				let l = t.tangent.array,
					c = [],
					u = [];
				for (let L = 0; L < o; L++) c[L] = new A, u[L] = new A;
				let h = new A,
					d = new A,
					f = new A,
					p = new O,
					v = new O,
					x = new O,
					g = new A,
					m = new A;

				function b(L, R, Z) {
					h.fromArray(i, L * 3), d.fromArray(i, R * 3), f.fromArray(i, Z * 3), p.fromArray(a, L * 2), v.fromArray(a, R * 2), x.fromArray(a, Z * 2), d.sub(h), f.sub(h), v.sub(p), x.sub(p);
					let F = 1 / (v.x * x.y - x.x * v.y);
					!isFinite(F) || (g.copy(d).multiplyScalar(x.y).addScaledVector(f, -v.y).multiplyScalar(F), m.copy(f).multiplyScalar(v.x).addScaledVector(d, -x.x).multiplyScalar(F), c[L].add(g), c[R].add(g), c[Z].add(g), u[L].add(m), u[R].add(m), u[Z].add(m))
				}
				let y = this.groups;
				y.length === 0 && (y = [{
					start: 0,
					count: n.length
				}]);
				for (let L = 0, R = y.length; L < R; ++L) {
					let Z = y[L],
						F = Z.start,
						U = Z.count;
					for (let z = F, N = F + U; z < N; z += 3) b(n[z + 0], n[z + 1], n[z + 2])
				}
				let E = new A,
					_ = new A,
					w = new A,
					D = new A;

				function I(L) {
					w.fromArray(s, L * 3), D.copy(w);
					let R = c[L];
					E.copy(R), E.sub(w.multiplyScalar(w.dot(R))).normalize(), _.crossVectors(D, R);
					let F = _.dot(u[L]) < 0 ? -1 : 1;
					l[L * 4] = E.x, l[L * 4 + 1] = E.y, l[L * 4 + 2] = E.z, l[L * 4 + 3] = F
				}
				for (let L = 0, R = y.length; L < R; ++L) {
					let Z = y[L],
						F = Z.start,
						U = Z.count;
					for (let z = F, N = F + U; z < N; z += 3) I(n[z + 0]), I(n[z + 1]), I(n[z + 2])
				}
			}
			computeVertexNormals() {
				let e = this.index,
					t = this.getAttribute("position");
				if (t !== void 0) {
					let n = this.getAttribute("normal");
					if (n === void 0) n = new pe(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
					else
						for (let d = 0, f = n.count; d < f; d++) n.setXYZ(d, 0, 0, 0);
					let i = new A,
						s = new A,
						a = new A,
						o = new A,
						l = new A,
						c = new A,
						u = new A,
						h = new A;
					if (e)
						for (let d = 0, f = e.count; d < f; d += 3) {
							let p = e.getX(d + 0),
								v = e.getX(d + 1),
								x = e.getX(d + 2);
							i.fromBufferAttribute(t, p), s.fromBufferAttribute(t, v), a.fromBufferAttribute(t, x), u.subVectors(a, s), h.subVectors(i, s), u.cross(h), o.fromBufferAttribute(n, p), l.fromBufferAttribute(n, v), c.fromBufferAttribute(n, x), o.add(u), l.add(u), c.add(u), n.setXYZ(p, o.x, o.y, o.z), n.setXYZ(v, l.x, l.y, l.z), n.setXYZ(x, c.x, c.y, c.z)
						} else
						for (let d = 0, f = t.count; d < f; d += 3) i.fromBufferAttribute(t, d + 0), s.fromBufferAttribute(t, d + 1), a.fromBufferAttribute(t, d + 2), u.subVectors(a, s), h.subVectors(i, s), u.cross(h), n.setXYZ(d + 0, u.x, u.y, u.z), n.setXYZ(d + 1, u.x, u.y, u.z), n.setXYZ(d + 2, u.x, u.y, u.z);
					this.normalizeNormals(), n.needsUpdate = !0
				}
			}
			merge(e, t) {
				if (!(e && e.isBufferGeometry)) {
					console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", e);
					return
				}
				t === void 0 && (t = 0, console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
				let n = this.attributes;
				for (let i in n) {
					if (e.attributes[i] === void 0) continue;
					let a = n[i].array,
						o = e.attributes[i],
						l = o.array,
						c = o.itemSize * t,
						u = Math.min(l.length, a.length - c);
					for (let h = 0, d = c; h < u; h++, d++) a[d] = l[h]
				}
				return this
			}
			normalizeNormals() {
				let e = this.attributes.normal;
				for (let t = 0, n = e.count; t < n; t++) Ct.fromBufferAttribute(e, t), Ct.normalize(), e.setXYZ(t, Ct.x, Ct.y, Ct.z)
			}
			toNonIndexed() {
				function e(o, l) {
					let c = o.array,
						u = o.itemSize,
						h = o.normalized,
						d = new c.constructor(l.length * u),
						f = 0,
						p = 0;
					for (let v = 0, x = l.length; v < x; v++) {
						o.isInterleavedBufferAttribute ? f = l[v] * o.data.stride + o.offset : f = l[v] * u;
						for (let g = 0; g < u; g++) d[p++] = c[f++]
					}
					return new pe(d, u, h)
				}
				if (this.index === null) return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
				let t = new de,
					n = this.index.array,
					i = this.attributes;
				for (let o in i) {
					let l = i[o],
						c = e(l, n);
					t.setAttribute(o, c)
				}
				let s = this.morphAttributes;
				for (let o in s) {
					let l = [],
						c = s[o];
					for (let u = 0, h = c.length; u < h; u++) {
						let d = c[u],
							f = e(d, n);
						l.push(f)
					}
					t.morphAttributes[o] = l
				}
				t.morphTargetsRelative = this.morphTargetsRelative;
				let a = this.groups;
				for (let o = 0, l = a.length; o < l; o++) {
					let c = a[o];
					t.addGroup(c.start, c.count, c.materialIndex)
				}
				return t
			}
			toJSON() {
				let e = {
					metadata: {
						version: 4.5,
						type: "BufferGeometry",
						generator: "BufferGeometry.toJSON"
					}
				};
				if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
					let l = this.parameters;
					for (let c in l) l[c] !== void 0 && (e[c] = l[c]);
					return e
				}
				e.data = {
					attributes: {}
				};
				let t = this.index;
				t !== null && (e.data.index = {
					type: t.array.constructor.name,
					array: Array.prototype.slice.call(t.array)
				});
				let n = this.attributes;
				for (let l in n) {
					let c = n[l];
					e.data.attributes[l] = c.toJSON(e.data)
				}
				let i = {},
					s = !1;
				for (let l in this.morphAttributes) {
					let c = this.morphAttributes[l],
						u = [];
					for (let h = 0, d = c.length; h < d; h++) {
						let f = c[h];
						u.push(f.toJSON(e.data))
					}
					u.length > 0 && (i[l] = u, s = !0)
				}
				s && (e.data.morphAttributes = i, e.data.morphTargetsRelative = this.morphTargetsRelative);
				let a = this.groups;
				a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
				let o = this.boundingSphere;
				return o !== null && (e.data.boundingSphere = {
					center: o.center.toArray(),
					radius: o.radius
				}), e
			}
			clone() {
				return new this.constructor().copy(this)
			}
			copy(e) {
				this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
				let t = {};
				this.name = e.name;
				let n = e.index;
				n !== null && this.setIndex(n.clone(t));
				let i = e.attributes;
				for (let c in i) {
					let u = i[c];
					this.setAttribute(c, u.clone(t))
				}
				let s = e.morphAttributes;
				for (let c in s) {
					let u = [],
						h = s[c];
					for (let d = 0, f = h.length; d < f; d++) u.push(h[d].clone(t));
					this.morphAttributes[c] = u
				}
				this.morphTargetsRelative = e.morphTargetsRelative;
				let a = e.groups;
				for (let c = 0, u = a.length; c < u; c++) {
					let h = a[c];
					this.addGroup(h.start, h.count, h.materialIndex)
				}
				let o = e.boundingBox;
				o !== null && (this.boundingBox = o.clone());
				let l = e.boundingSphere;
				return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, e.parameters !== void 0 && (this.parameters = Object.assign({}, e.parameters)), this
			}
			dispose() {
				this.dispatchEvent({
					type: "dispose"
				})
			}
		};
	de.prototype.isBufferGeometry = !0;
	var Sd = new ge,
		Sr = new On,
		ic = new Un,
		ri = new A,
		si = new A,
		ai = new A,
		rc = new A,
		sc = new A,
		ac = new A,
		Oa = new A,
		Na = new A,
		Ha = new A,
		za = new O,
		Ga = new O,
		ka = new O,
		oc = new A,
		Va = new A,
		ze = class extends _e {
			constructor(e = new de, t = new zt) {
				super();
				this.type = "Mesh", this.geometry = e, this.material = t, this.updateMorphTargets()
			}
			copy(e) {
				return super.copy(e), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = e.material, this.geometry = e.geometry, this
			}
			updateMorphTargets() {
				let e = this.geometry;
				if (e.isBufferGeometry) {
					let t = e.morphAttributes,
						n = Object.keys(t);
					if (n.length > 0) {
						let i = t[n[0]];
						if (i !== void 0) {
							this.morphTargetInfluences = [], this.morphTargetDictionary = {};
							for (let s = 0, a = i.length; s < a; s++) {
								let o = i[s].name || String(s);
								this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s
							}
						}
					}
				} else {
					let t = e.morphTargets;
					t !== void 0 && t.length > 0 && console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")
				}
			}
			raycast(e, t) {
				let n = this.geometry,
					i = this.material,
					s = this.matrixWorld;
				if (i === void 0 || (n.boundingSphere === null && n.computeBoundingSphere(), ic.copy(n.boundingSphere), ic.applyMatrix4(s), e.ray.intersectsSphere(ic) === !1) || (Sd.copy(s).invert(), Sr.copy(e.ray).applyMatrix4(Sd), n.boundingBox !== null && Sr.intersectsBox(n.boundingBox) === !1)) return;
				let a;
				if (n.isBufferGeometry) {
					let o = n.index,
						l = n.attributes.position,
						c = n.morphAttributes.position,
						u = n.morphTargetsRelative,
						h = n.attributes.uv,
						d = n.attributes.uv2,
						f = n.groups,
						p = n.drawRange;
					if (o !== null)
						if (Array.isArray(i))
							for (let v = 0, x = f.length; v < x; v++) {
								let g = f[v],
									m = i[g.materialIndex],
									b = Math.max(g.start, p.start),
									y = Math.min(o.count, Math.min(g.start + g.count, p.start + p.count));
								for (let E = b, _ = y; E < _; E += 3) {
									let w = o.getX(E),
										D = o.getX(E + 1),
										I = o.getX(E + 2);
									a = Wa(this, m, e, Sr, l, c, u, h, d, w, D, I), a && (a.faceIndex = Math.floor(E / 3), a.face.materialIndex = g.materialIndex, t.push(a))
								}
							} else {
							let v = Math.max(0, p.start),
								x = Math.min(o.count, p.start + p.count);
							for (let g = v, m = x; g < m; g += 3) {
								let b = o.getX(g),
									y = o.getX(g + 1),
									E = o.getX(g + 2);
								a = Wa(this, i, e, Sr, l, c, u, h, d, b, y, E), a && (a.faceIndex = Math.floor(g / 3), t.push(a))
							}
						} else if (l !== void 0)
						if (Array.isArray(i))
							for (let v = 0, x = f.length; v < x; v++) {
								let g = f[v],
									m = i[g.materialIndex],
									b = Math.max(g.start, p.start),
									y = Math.min(l.count, Math.min(g.start + g.count, p.start + p.count));
								for (let E = b, _ = y; E < _; E += 3) {
									let w = E,
										D = E + 1,
										I = E + 2;
									a = Wa(this, m, e, Sr, l, c, u, h, d, w, D, I), a && (a.faceIndex = Math.floor(E / 3), a.face.materialIndex = g.materialIndex, t.push(a))
								}
							} else {
							let v = Math.max(0, p.start),
								x = Math.min(l.count, p.start + p.count);
							for (let g = v, m = x; g < m; g += 3) {
								let b = g,
									y = g + 1,
									E = g + 2;
								a = Wa(this, i, e, Sr, l, c, u, h, d, b, y, E), a && (a.faceIndex = Math.floor(g / 3), t.push(a))
							}
						}
				} else n.isGeometry && console.error("THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")
			}
		};
	ze.prototype.isMesh = !0;

	function Sg(r, e, t, n, i, s, a, o) {
		let l;
		if (e.side === Qe ? l = n.intersectTriangle(a, s, i, !0, o) : l = n.intersectTriangle(i, s, a, e.side !== Ht, o), l === null) return null;
		Va.copy(o), Va.applyMatrix4(r.matrixWorld);
		let c = t.ray.origin.distanceTo(Va);
		return c < t.near || c > t.far ? null : {
			distance: c,
			point: Va.clone(),
			object: r
		}
	}

	function Wa(r, e, t, n, i, s, a, o, l, c, u, h) {
		ri.fromBufferAttribute(i, c), si.fromBufferAttribute(i, u), ai.fromBufferAttribute(i, h);
		let d = r.morphTargetInfluences;
		if (s && d) {
			Oa.set(0, 0, 0), Na.set(0, 0, 0), Ha.set(0, 0, 0);
			for (let p = 0, v = s.length; p < v; p++) {
				let x = d[p],
					g = s[p];
				x !== 0 && (rc.fromBufferAttribute(g, c), sc.fromBufferAttribute(g, u), ac.fromBufferAttribute(g, h), a ? (Oa.addScaledVector(rc, x), Na.addScaledVector(sc, x), Ha.addScaledVector(ac, x)) : (Oa.addScaledVector(rc.sub(ri), x), Na.addScaledVector(sc.sub(si), x), Ha.addScaledVector(ac.sub(ai), x)))
			}
			ri.add(Oa), si.add(Na), ai.add(Ha)
		}
		r.isSkinnedMesh && (r.boneTransform(c, ri), r.boneTransform(u, si), r.boneTransform(h, ai));
		let f = Sg(r, e, t, n, ri, si, ai, oc);
		if (f) {
			o && (za.fromBufferAttribute(o, c), Ga.fromBufferAttribute(o, u), ka.fromBufferAttribute(o, h), f.uv = pt.getUV(oc, ri, si, ai, za, Ga, ka, new O)), l && (za.fromBufferAttribute(l, c), Ga.fromBufferAttribute(l, u), ka.fromBufferAttribute(l, h), f.uv2 = pt.getUV(oc, ri, si, ai, za, Ga, ka, new O));
			let p = {
				a: c,
				b: u,
				c: h,
				normal: new A,
				materialIndex: 0
			};
			pt.getNormal(ri, si, ai, p.normal), f.face = p
		}
		return f
	}
	var Gn = class extends de {
		constructor(e = 1, t = 1, n = 1, i = 1, s = 1, a = 1) {
			super();
			this.type = "BoxGeometry", this.parameters = {
				width: e,
				height: t,
				depth: n,
				widthSegments: i,
				heightSegments: s,
				depthSegments: a
			};
			let o = this;
			i = Math.floor(i), s = Math.floor(s), a = Math.floor(a);
			let l = [],
				c = [],
				u = [],
				h = [],
				d = 0,
				f = 0;
			p("z", "y", "x", -1, -1, n, t, e, a, s, 0), p("z", "y", "x", 1, -1, n, t, -e, a, s, 1), p("x", "z", "y", 1, 1, e, n, t, i, a, 2), p("x", "z", "y", 1, -1, e, n, -t, i, a, 3), p("x", "y", "z", 1, -1, e, t, n, i, s, 4), p("x", "y", "z", -1, -1, e, t, -n, i, s, 5), this.setIndex(l), this.setAttribute("position", new ce(c, 3)), this.setAttribute("normal", new ce(u, 3)), this.setAttribute("uv", new ce(h, 2));

			function p(v, x, g, m, b, y, E, _, w, D, I) {
				let L = y / w,
					R = E / D,
					Z = y / 2,
					F = E / 2,
					U = _ / 2,
					z = w + 1,
					N = D + 1,
					G = 0,
					ne = 0,
					fe = new A;
				for (let Y = 0; Y < N; Y++) {
					let j = Y * R - F;
					for (let ue = 0; ue < z; ue++) {
						let oe = ue * L - Z;
						fe[v] = oe * m, fe[x] = j * b, fe[g] = U, c.push(fe.x, fe.y, fe.z), fe[v] = 0, fe[x] = 0, fe[g] = _ > 0 ? 1 : -1, u.push(fe.x, fe.y, fe.z), h.push(ue / w), h.push(1 - Y / D), G += 1
					}
				}
				for (let Y = 0; Y < D; Y++)
					for (let j = 0; j < w; j++) {
						let ue = d + j + z * Y,
							oe = d + j + z * (Y + 1),
							ve = d + (j + 1) + z * (Y + 1),
							Oe = d + (j + 1) + z * Y;
						l.push(ue, oe, Oe), l.push(oe, ve, Oe), ne += 6
					}
				o.addGroup(f, ne, I), f += ne, d += G
			}
		}
		static fromJSON(e) {
			return new Gn(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments)
		}
	};

	function _r(r) {
		let e = {};
		for (let t in r) {
			e[t] = {};
			for (let n in r[t]) {
				let i = r[t][n];
				i && (i.isColor || i.isMatrix3 || i.isMatrix4 || i.isVector2 || i.isVector3 || i.isVector4 || i.isTexture || i.isQuaternion) ? e[t][n] = i.clone() : Array.isArray(i) ? e[t][n] = i.slice() : e[t][n] = i
			}
		}
		return e
	}

	function Ut(r) {
		let e = {};
		for (let t = 0; t < r.length; t++) {
			let n = _r(r[t]);
			for (let i in n) e[i] = n[i]
		}
		return e
	}
	var Ya = {
		clone: _r,
		merge: Ut
	},
		_g = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
		Tg = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,
		Ye = class extends tt {
			constructor(e) {
				super();
				this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.vertexShader = _g, this.fragmentShader = Tg, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.extensions = {
					derivatives: !1,
					fragDepth: !1,
					drawBuffers: !1,
					shaderTextureLOD: !1
				}, this.defaultAttributeValues = {
					color: [1, 1, 1],
					uv: [0, 0],
					uv2: [0, 0]
				}, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && (e.attributes !== void 0 && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(e))
			}
			copy(e) {
				return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = _r(e.uniforms), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this
			}
			toJSON(e) {
				let t = super.toJSON(e);
				t.glslVersion = this.glslVersion, t.uniforms = {};
				for (let i in this.uniforms) {
					let a = this.uniforms[i].value;
					a && a.isTexture ? t.uniforms[i] = {
						type: "t",
						value: a.toJSON(e).uuid
					} : a && a.isColor ? t.uniforms[i] = {
						type: "c",
						value: a.getHex()
					} : a && a.isVector2 ? t.uniforms[i] = {
						type: "v2",
						value: a.toArray()
					} : a && a.isVector3 ? t.uniforms[i] = {
						type: "v3",
						value: a.toArray()
					} : a && a.isVector4 ? t.uniforms[i] = {
						type: "v4",
						value: a.toArray()
					} : a && a.isMatrix3 ? t.uniforms[i] = {
						type: "m3",
						value: a.toArray()
					} : a && a.isMatrix4 ? t.uniforms[i] = {
						type: "m4",
						value: a.toArray()
					} : t.uniforms[i] = {
						value: a
					}
				}
				Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader;
				let n = {};
				for (let i in this.extensions) this.extensions[i] === !0 && (n[i] = !0);
				return Object.keys(n).length > 0 && (t.extensions = n), t
			}
		};
	Ye.prototype.isShaderMaterial = !0;
	var oi = class extends _e {
		constructor() {
			super();
			this.type = "Camera", this.matrixWorldInverse = new ge, this.projectionMatrix = new ge, this.projectionMatrixInverse = new ge
		}
		copy(e, t) {
			return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this
		}
		getWorldDirection(e) {
			this.updateWorldMatrix(!0, !1);
			let t = this.matrixWorld.elements;
			return e.set(-t[8], -t[9], -t[10]).normalize()
		}
		updateMatrixWorld(e) {
			super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert()
		}
		updateWorldMatrix(e, t) {
			super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert()
		}
		clone() {
			return new this.constructor().copy(this)
		}
	};
	oi.prototype.isCamera = !0;
	var ct = class extends oi {
		constructor(e = 50, t = 1, n = .1, i = 2e3) {
			super();
			this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = i, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix()
		}
		copy(e, t) {
			return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this
		}
		setFocalLength(e) {
			let t = .5 * this.getFilmHeight() / e;
			this.fov = Ds * 2 * Math.atan(t), this.updateProjectionMatrix()
		}
		getFocalLength() {
			let e = Math.tan(Oi * .5 * this.fov);
			return .5 * this.getFilmHeight() / e
		}
		getEffectiveFOV() {
			return Ds * 2 * Math.atan(Math.tan(Oi * .5 * this.fov) / this.zoom)
		}
		getFilmWidth() {
			return this.filmGauge * Math.min(this.aspect, 1)
		}
		getFilmHeight() {
			return this.filmGauge / Math.max(this.aspect, 1)
		}
		setViewOffset(e, t, n, i, s, a) {
			this.aspect = e / t, this.view === null && (this.view = {
				enabled: !0,
				fullWidth: 1,
				fullHeight: 1,
				offsetX: 0,
				offsetY: 0,
				width: 1,
				height: 1
			}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = s, this.view.height = a, this.updateProjectionMatrix()
		}
		clearViewOffset() {
			this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix()
		}
		updateProjectionMatrix() {
			let e = this.near,
				t = e * Math.tan(Oi * .5 * this.fov) / this.zoom,
				n = 2 * t,
				i = this.aspect * n,
				s = -.5 * i,
				a = this.view;
			if (this.view !== null && this.view.enabled) {
				let l = a.fullWidth,
					c = a.fullHeight;
				s += a.offsetX * i / l, t -= a.offsetY * n / c, i *= a.width / l, n *= a.height / c
			}
			let o = this.filmOffset;
			o !== 0 && (s += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + i, t, t - n, e, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
		}
		toJSON(e) {
			let t = super.toJSON(e);
			return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t
		}
	};
	ct.prototype.isPerspectiveCamera = !0;
	var Tr = 90,
		Cr = 1,
		Os = class extends _e {
			constructor(e, t, n) {
				super();
				if (this.type = "CubeCamera", n.isWebGLCubeRenderTarget !== !0) {
					console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");
					return
				}
				this.renderTarget = n;
				let i = new ct(Tr, Cr, e, t);
				i.layers = this.layers, i.up.set(0, -1, 0), i.lookAt(new A(1, 0, 0)), this.add(i);
				let s = new ct(Tr, Cr, e, t);
				s.layers = this.layers, s.up.set(0, -1, 0), s.lookAt(new A(-1, 0, 0)), this.add(s);
				let a = new ct(Tr, Cr, e, t);
				a.layers = this.layers, a.up.set(0, 0, 1), a.lookAt(new A(0, 1, 0)), this.add(a);
				let o = new ct(Tr, Cr, e, t);
				o.layers = this.layers, o.up.set(0, 0, -1), o.lookAt(new A(0, -1, 0)), this.add(o);
				let l = new ct(Tr, Cr, e, t);
				l.layers = this.layers, l.up.set(0, -1, 0), l.lookAt(new A(0, 0, 1)), this.add(l);
				let c = new ct(Tr, Cr, e, t);
				c.layers = this.layers, c.up.set(0, -1, 0), c.lookAt(new A(0, 0, -1)), this.add(c)
			}
			update(e, t) {
				this.parent === null && this.updateMatrixWorld();
				let n = this.renderTarget,
					[i, s, a, o, l, c] = this.children,
					u = e.xr.enabled,
					h = e.getRenderTarget();
				e.xr.enabled = !1;
				let d = n.texture.generateMipmaps;
				n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0), e.render(t, i), e.setRenderTarget(n, 1), e.render(t, s), e.setRenderTarget(n, 2), e.render(t, a), e.setRenderTarget(n, 3), e.render(t, o), e.setRenderTarget(n, 4), e.render(t, l), n.texture.generateMipmaps = d, e.setRenderTarget(n, 5), e.render(t, c), e.setRenderTarget(h), e.xr.enabled = u
			}
		},
		Gi = class extends ot {
			constructor(e, t, n, i, s, a, o, l, c, u) {
				e = e !== void 0 ? e : [], t = t !== void 0 ? t : Di;
				super(e, t, n, i, s, a, o, l, c, u);
				this.flipY = !1
			}
			get images() {
				return this.image
			}
			set images(e) {
				this.image = e
			}
		};
	Gi.prototype.isCubeTexture = !0;
	var Ns = class extends We {
		constructor(e, t, n) {
			Number.isInteger(t) && (console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"), t = n);
			super(e, e, t);
			t = t || {}, this.texture = new Gi(void 0, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.encoding), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1, this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : et, this.texture._needsFlipEnvMap = !1
		}
		fromEquirectangularTexture(e, t) {
			this.texture.type = t.type, this.texture.format = Tt, this.texture.encoding = t.encoding, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
			let n = {
				uniforms: {
					tEquirect: {
						value: null
					}
				},
				vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
				fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
			},
				i = new Gn(5, 5, 5),
				s = new Ye({
					name: "CubemapFromEquirect",
					uniforms: _r(n.uniforms),
					vertexShader: n.vertexShader,
					fragmentShader: n.fragmentShader,
					side: Qe,
					blending: xt
				});
			s.uniforms.tEquirect.value = t;
			let a = new ze(i, s),
				o = t.minFilter;
			return t.minFilter === Pi && (t.minFilter = et), new Os(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this
		}
		clear(e, t, n, i) {
			let s = e.getRenderTarget();
			for (let a = 0; a < 6; a++) e.setRenderTarget(this, a), e.clear(t, n, i);
			e.setRenderTarget(s)
		}
	};
	Ns.prototype.isWebGLCubeRenderTarget = !0;
	var lc = new A,
		Cg = new A,
		Dg = new Et,
		fn = class {
			constructor(e = new A(1, 0, 0), t = 0) {
				this.normal = e, this.constant = t
			}
			set(e, t) {
				return this.normal.copy(e), this.constant = t, this
			}
			setComponents(e, t, n, i) {
				return this.normal.set(e, t, n), this.constant = i, this
			}
			setFromNormalAndCoplanarPoint(e, t) {
				return this.normal.copy(e), this.constant = -t.dot(this.normal), this
			}
			setFromCoplanarPoints(e, t, n) {
				let i = lc.subVectors(n, t).cross(Cg.subVectors(e, t)).normalize();
				return this.setFromNormalAndCoplanarPoint(i, e), this
			}
			copy(e) {
				return this.normal.copy(e.normal), this.constant = e.constant, this
			}
			normalize() {
				let e = 1 / this.normal.length();
				return this.normal.multiplyScalar(e), this.constant *= e, this
			}
			negate() {
				return this.constant *= -1, this.normal.negate(), this
			}
			distanceToPoint(e) {
				return this.normal.dot(e) + this.constant
			}
			distanceToSphere(e) {
				return this.distanceToPoint(e.center) - e.radius
			}
			projectPoint(e, t) {
				return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)
			}
			intersectLine(e, t) {
				let n = e.delta(lc),
					i = this.normal.dot(n);
				if (i === 0) return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
				let s = -(e.start.dot(this.normal) + this.constant) / i;
				return s < 0 || s > 1 ? null : t.copy(n).multiplyScalar(s).add(e.start)
			}
			intersectsLine(e) {
				let t = this.distanceToPoint(e.start),
					n = this.distanceToPoint(e.end);
				return t < 0 && n > 0 || n < 0 && t > 0
			}
			intersectsBox(e) {
				return e.intersectsPlane(this)
			}
			intersectsSphere(e) {
				return e.intersectsPlane(this)
			}
			coplanarPoint(e) {
				return e.copy(this.normal).multiplyScalar(-this.constant)
			}
			applyMatrix4(e, t) {
				let n = t || Dg.getNormalMatrix(e),
					i = this.coplanarPoint(lc).applyMatrix4(e),
					s = this.normal.applyMatrix3(n).normalize();
				return this.constant = -i.dot(s), this
			}
			translate(e) {
				return this.constant -= e.dot(this.normal), this
			}
			equals(e) {
				return e.normal.equals(this.normal) && e.constant === this.constant
			}
			clone() {
				return new this.constructor().copy(this)
			}
		};
	fn.prototype.isPlane = !0;
	var Dr = new Un,
		ja = new A,
		Rr = class {
			constructor(e = new fn, t = new fn, n = new fn, i = new fn, s = new fn, a = new fn) {
				this.planes = [e, t, n, i, s, a]
			}
			set(e, t, n, i, s, a) {
				let o = this.planes;
				return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(i), o[4].copy(s), o[5].copy(a), this
			}
			copy(e) {
				let t = this.planes;
				for (let n = 0; n < 6; n++) t[n].copy(e.planes[n]);
				return this
			}
			setFromProjectionMatrix(e) {
				let t = this.planes,
					n = e.elements,
					i = n[0],
					s = n[1],
					a = n[2],
					o = n[3],
					l = n[4],
					c = n[5],
					u = n[6],
					h = n[7],
					d = n[8],
					f = n[9],
					p = n[10],
					v = n[11],
					x = n[12],
					g = n[13],
					m = n[14],
					b = n[15];
				return t[0].setComponents(o - i, h - l, v - d, b - x).normalize(), t[1].setComponents(o + i, h + l, v + d, b + x).normalize(), t[2].setComponents(o + s, h + c, v + f, b + g).normalize(), t[3].setComponents(o - s, h - c, v - f, b - g).normalize(), t[4].setComponents(o - a, h - u, v - p, b - m).normalize(), t[5].setComponents(o + a, h + u, v + p, b + m).normalize(), this
			}
			intersectsObject(e) {
				let t = e.geometry;
				return t.boundingSphere === null && t.computeBoundingSphere(), Dr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld), this.intersectsSphere(Dr)
			}
			intersectsSprite(e) {
				return Dr.center.set(0, 0, 0), Dr.radius = .7071067811865476, Dr.applyMatrix4(e.matrixWorld), this.intersectsSphere(Dr)
			}
			intersectsSphere(e) {
				let t = this.planes,
					n = e.center,
					i = -e.radius;
				for (let s = 0; s < 6; s++)
					if (t[s].distanceToPoint(n) < i) return !1;
				return !0
			}
			intersectsBox(e) {
				let t = this.planes;
				for (let n = 0; n < 6; n++) {
					let i = t[n];
					if (ja.x = i.normal.x > 0 ? e.max.x : e.min.x, ja.y = i.normal.y > 0 ? e.max.y : e.min.y, ja.z = i.normal.z > 0 ? e.max.z : e.min.z, i.distanceToPoint(ja) < 0) return !1
				}
				return !0
			}
			containsPoint(e) {
				let t = this.planes;
				for (let n = 0; n < 6; n++)
					if (t[n].distanceToPoint(e) < 0) return !1;
				return !0
			}
			clone() {
				return new this.constructor().copy(this)
			}
		};

	function _d() {
		let r = null,
			e = !1,
			t = null,
			n = null;

		function i(s, a) {
			t(s, a), n = r.requestAnimationFrame(i)
		}
		return {
			start: function () {
				e !== !0 && t !== null && (n = r.requestAnimationFrame(i), e = !0)
			},
			stop: function () {
				r.cancelAnimationFrame(n), e = !1
			},
			setAnimationLoop: function (s) {
				t = s
			},
			setContext: function (s) {
				r = s
			}
		}
	}

	function Rg(r, e) {
		let t = e.isWebGL2,
			n = new WeakMap;

		function i(c, u) {
			let h = c.array,
				d = c.usage,
				f = r.createBuffer();
			r.bindBuffer(u, f), r.bufferData(u, h, d), c.onUploadCallback();
			let p = 5126;
			return h instanceof Float32Array ? p = 5126 : h instanceof Float64Array ? console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.") : h instanceof Uint16Array ? c.isFloat16BufferAttribute ? t ? p = 5131 : console.warn("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.") : p = 5123 : h instanceof Int16Array ? p = 5122 : h instanceof Uint32Array ? p = 5125 : h instanceof Int32Array ? p = 5124 : h instanceof Int8Array ? p = 5120 : (h instanceof Uint8Array || h instanceof Uint8ClampedArray) && (p = 5121), {
				buffer: f,
				type: p,
				bytesPerElement: h.BYTES_PER_ELEMENT,
				version: c.version
			}
		}

		function s(c, u, h) {
			let d = u.array,
				f = u.updateRange;
			r.bindBuffer(h, c), f.count === -1 ? r.bufferSubData(h, 0, d) : (t ? r.bufferSubData(h, f.offset * d.BYTES_PER_ELEMENT, d, f.offset, f.count) : r.bufferSubData(h, f.offset * d.BYTES_PER_ELEMENT, d.subarray(f.offset, f.offset + f.count)), f.count = -1)
		}

		function a(c) {
			return c.isInterleavedBufferAttribute && (c = c.data), n.get(c)
		}

		function o(c) {
			c.isInterleavedBufferAttribute && (c = c.data);
			let u = n.get(c);
			u && (r.deleteBuffer(u.buffer), n.delete(c))
		}

		function l(c, u) {
			if (c.isGLBufferAttribute) {
				let d = n.get(c);
				(!d || d.version < c.version) && n.set(c, {
					buffer: c.buffer,
					type: c.type,
					bytesPerElement: c.elementSize,
					version: c.version
				});
				return
			}
			c.isInterleavedBufferAttribute && (c = c.data);
			let h = n.get(c);
			h === void 0 ? n.set(c, i(c, u)) : h.version < c.version && (s(h.buffer, c, u), h.version = c.version)
		}
		return {
			get: a,
			remove: o,
			update: l
		}
	}
	var ki = class extends de {
		constructor(e = 1, t = 1, n = 1, i = 1) {
			super();
			this.type = "PlaneGeometry", this.parameters = {
				width: e,
				height: t,
				widthSegments: n,
				heightSegments: i
			};
			let s = e / 2,
				a = t / 2,
				o = Math.floor(n),
				l = Math.floor(i),
				c = o + 1,
				u = l + 1,
				h = e / o,
				d = t / l,
				f = [],
				p = [],
				v = [],
				x = [];
			for (let g = 0; g < u; g++) {
				let m = g * d - a;
				for (let b = 0; b < c; b++) {
					let y = b * h - s;
					p.push(y, -m, 0), v.push(0, 0, 1), x.push(b / o), x.push(1 - g / l)
				}
			}
			for (let g = 0; g < l; g++)
				for (let m = 0; m < o; m++) {
					let b = m + c * g,
						y = m + c * (g + 1),
						E = m + 1 + c * (g + 1),
						_ = m + 1 + c * g;
					f.push(b, y, _), f.push(y, E, _)
				}
			this.setIndex(f), this.setAttribute("position", new ce(p, 3)), this.setAttribute("normal", new ce(v, 3)), this.setAttribute("uv", new ce(x, 2))
		}
		static fromJSON(e) {
			return new ki(e.width, e.height, e.widthSegments, e.heightSegments)
		}
	},
		Pg = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,
		Lg = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
		Ig = `#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,
		Bg = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
		Ug = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
		Fg = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
		Og = "vec3 transformed = vec3( position );",
		Ng = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
		Hg = `vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,
		zg = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
		Gg = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,
		kg = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
		Vg = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
		Wg = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
		Yg = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,
		jg = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,
		Xg = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,
		Qg = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,
		qg = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
	return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,
		Zg = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_maxMipLevel 8.0
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_maxTileSize 256.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		float texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );
		vec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );
		vec2 f = fract( uv );
		uv += 0.5 - f;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		if ( mipInt < cubeUV_maxMipLevel ) {
			uv.y += 2.0 * cubeUV_maxTileSize;
		}
		uv.y += filterInt * 2.0 * cubeUV_minTileSize;
		uv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );
		uv *= texelSize;
		vec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.x += texelSize;
		vec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.y += texelSize;
		vec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.x -= texelSize;
		vec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		vec3 tm = mix( tl, tr, f.x );
		vec3 bm = mix( bl, br, f.x );
		return mix( tm, bm, f.y );
	}
	#define r0 1.0
	#define v0 0.339
	#define m0 - 2.0
	#define r1 0.8
	#define v1 0.276
	#define m1 - 1.0
	#define r4 0.4
	#define v4 0.046
	#define m4 2.0
	#define r5 0.305
	#define v5 0.016
	#define m5 3.0
	#define r6 0.21
	#define v6 0.0038
	#define m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= r1 ) {
			mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;
		} else if ( roughness >= r4 ) {
			mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;
		} else if ( roughness >= r5 ) {
			mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;
		} else if ( roughness >= r6 ) {
			mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
		Jg = `vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,
		Kg = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
		$g = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,
		ev = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	emissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
		tv = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
		nv = "gl_FragColor = linearToOutputTexel( gl_FragColor );",
		iv = `
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );
}
vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );
}
vec4 sRGBToLinear( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 RGBEToLinear( in vec4 value ) {
	return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );
}
vec4 LinearToRGBE( in vec4 value ) {
	float maxComponent = max( max( value.r, value.g ), value.b );
	float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );
	return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );
}
vec4 RGBMToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * value.a * maxRange, 1.0 );
}
vec4 LinearToRGBM( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float M = clamp( maxRGB / maxRange, 0.0, 1.0 );
	M = ceil( M * 255.0 ) / 255.0;
	return vec4( value.rgb / ( M * maxRange ), M );
}
vec4 RGBDToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );
}
vec4 LinearToRGBD( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float D = max( maxRange / maxRGB, 1.0 );
	D = clamp( floor( D ) / 255.0, 0.0, 1.0 );
	return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );
}`,
		rv = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		envColor = envMapTexelToLinear( envColor );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,
		sv = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,
		av = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
		ov = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
		lv = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
		cv = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
		uv = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
		hv = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
		dv = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
		fv = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return texture2D( gradientMap, coord ).rgb;
	#else
		return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );
	#endif
}`,
		pv = `#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		lightMapIrradiance *= PI;
	#endif
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,
		mv = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
		gv = `vec3 diffuse = vec3( 1.0 );
GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );
GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;
vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );
#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif
IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;
vIndirectFront += getAmbientLightIrradiance( ambientLightColor );
vIndirectFront += getLightProbeIrradiance( lightProbe, geometry.normal );
#ifdef DOUBLE_SIDED
	vIndirectBack += getAmbientLightIrradiance( ambientLightColor );
	vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry.normal );
#endif
#if NUM_POINT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		getPointLightInfo( pointLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		getSpotLightInfo( spotLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_DIR_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		getDirectionalLightInfo( directionalLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_HEMI_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		#ifdef DOUBLE_SIDED
			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry.normal );
		#endif
	}
	#pragma unroll_loop_end
#endif`,
		vv = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,
		xv = `#if defined( USE_ENVMAP )
	#ifdef ENVMAP_MODE_REFRACTION
		uniform float refractionRatio;
	#endif
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec;
			#ifdef ENVMAP_MODE_REFLECTION
				reflectVec = reflect( - viewDir, normal );
				reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			#else
				reflectVec = refract( - viewDir, normal, refractionRatio );
			#endif
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,
		yv = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
		wv = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,
		bv = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
		Av = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,
		Ev = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= specularColorMapTexelToLinear( texture2D( specularColorMap, vUv ) ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( ior - 1.0 ) / ( ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= sheenColorMapTexelToLinear( texture2D( sheenColorMap, vUv ) ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,
		Mv = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	vec3 FssEss = specularColor * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		reflectedLight.directSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	vec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
		Sv = `
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
		_v = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			lightMapIrradiance *= PI;
		#endif
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
		Tv = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,
		Cv = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
		Dv = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
		Rv = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,
		Pv = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,
		Lv = `#ifdef USE_MAP
	vec4 texelColor = texture2D( map, vUv );
	texelColor = mapTexelToLinear( texelColor );
	diffuseColor *= texelColor;
#endif`,
		Iv = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
		Bv = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	vec4 mapTexel = texture2D( map, uv );
	diffuseColor *= mapTexelToLinear( mapTexel );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
		Uv = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
		Fv = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
		Ov = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
		Nv = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] > 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1, 2 ) * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,
		Hv = `#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform vec2 morphTargetsTextureSize;
		vec3 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset, const in int stride ) {
			float texelIndex = float( vertexIndex * stride + offset );
			float y = floor( texelIndex / morphTargetsTextureSize.x );
			float x = texelIndex - y * morphTargetsTextureSize.x;
			vec3 morphUV = vec3( ( x + 0.5 ) / morphTargetsTextureSize.x, y / morphTargetsTextureSize.y, morphTargetIndex );
			return texture( morphTargetsTexture, morphUV ).xyz;
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,
		zv = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			#ifndef USE_MORPHNORMALS
				if ( morphTargetInfluences[ i ] > 0.0 ) transformed += getMorph( gl_VertexID, i, 0, 1 ) * morphTargetInfluences[ i ];
			#else
				if ( morphTargetInfluences[ i ] > 0.0 ) transformed += getMorph( gl_VertexID, i, 0, 2 ) * morphTargetInfluences[ i ];
			#endif
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,
		Gv = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,
		kv = `#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
		Vv = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
		Wv = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
		Yv = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,
		jv = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
		vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,
		Xv = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,
		Qv = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,
		qv = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,
		Zv = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
		Jv = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,
		Kv = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
		$v = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
		e0 = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
		t0 = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
		n0 = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
		i0 = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
		r0 = `#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,
		s0 = `#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
		a0 = `#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,
		o0 = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
		l0 = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
		c0 = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	#ifdef BONE_TEXTURE
		uniform highp sampler2D boneTexture;
		uniform int boneTextureSize;
		mat4 getBoneMatrix( const in float i ) {
			float j = i * 4.0;
			float x = mod( j, float( boneTextureSize ) );
			float y = floor( j / float( boneTextureSize ) );
			float dx = 1.0 / float( boneTextureSize );
			float dy = 1.0 / float( boneTextureSize );
			y = dy * ( y + 0.5 );
			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
			mat4 bone = mat4( v1, v2, v3, v4 );
			return bone;
		}
	#else
		uniform mat4 boneMatrices[ MAX_BONES ];
		mat4 getBoneMatrix( const in float i ) {
			mat4 bone = boneMatrices[ int(i) ];
			return bone;
		}
	#endif
#endif`,
		u0 = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
		h0 = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
		d0 = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
		f0 = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
		p0 = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
		m0 = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
		g0 = `#ifdef USE_TRANSMISSION
	float transmissionAlpha = 1.0;
	float transmissionFactor = transmission;
	float thicknessFactor = thickness;
	#ifdef USE_TRANSMISSIONMAP
		transmissionFactor *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		thicknessFactor *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, roughnessFactor, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, ior, thicknessFactor,
		attenuationColor, attenuationDistance );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, transmissionFactor );
	transmissionAlpha = mix( transmissionAlpha, transmission.a, transmissionFactor );
#endif`,
		v0 = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( vec3 n, vec3 v, float thickness, float ior, mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( float roughness, float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( vec2 fragCoord, float roughness, float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef TEXTURE_LOD_EXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( vec3 radiance, float transmissionDistance, vec3 attenuationColor, float attenuationDistance ) {
		if ( attenuationDistance == 0.0 ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( vec3 n, vec3 v, float roughness, vec3 diffuseColor, vec3 specularColor, float specularF90,
		vec3 position, mat4 modelMatrix, mat4 viewMatrix, mat4 projMatrix, float ior, float thickness,
		vec3 attenuationColor, float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,
		x0 = `#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,
		y0 = `#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,
		w0 = `#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,
		b0 = `#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,
		A0 = `#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,
		E0 = `#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,
		M0 = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,
		S0 = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
		_0 = `uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	gl_FragColor = mapTexelToLinear( texColor );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,
		T0 = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
		C0 = `#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,
		D0 = `#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
		R0 = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,
		P0 = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
		L0 = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,
		I0 = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
		B0 = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	vec4 texColor = texture2D( tEquirect, sampleUV );
	gl_FragColor = mapTexelToLinear( texColor );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,
		U0 = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
		F0 = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
		O0 = `#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
		N0 = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
		H0 = `#define LAMBERT
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
		z0 = `uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>
	#ifdef DOUBLE_SIDED
		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
	#else
		reflectedLight.indirectDiffuse += vIndirectFront;
	#endif
	#include <lightmap_fragment>
	reflectedLight.indirectDiffuse *= BRDF_Lambert( diffuseColor.rgb );
	#ifdef DOUBLE_SIDED
		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
	#else
		reflectedLight.directDiffuse = vLightFront;
	#endif
	reflectedLight.directDiffuse *= BRDF_Lambert( diffuseColor.rgb ) * getShadowMask();
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
		G0 = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
		k0 = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
		matcapColor = matcapTexelToLinear( matcapColor );
	#else
		vec4 matcapColor = vec4( 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
		V0 = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
		W0 = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
}`,
		Y0 = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
		j0 = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
		X0 = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
		Q0 = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
		q0 = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
		Z0 = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
		J0 = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
		K0 = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
		$0 = `#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
		ex = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,
		tx = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
		nx = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,
		Be = {
			alphamap_fragment: Pg,
			alphamap_pars_fragment: Lg,
			alphatest_fragment: Ig,
			alphatest_pars_fragment: Bg,
			aomap_fragment: Ug,
			aomap_pars_fragment: Fg,
			begin_vertex: Og,
			beginnormal_vertex: Ng,
			bsdfs: Hg,
			bumpmap_pars_fragment: zg,
			clipping_planes_fragment: Gg,
			clipping_planes_pars_fragment: kg,
			clipping_planes_pars_vertex: Vg,
			clipping_planes_vertex: Wg,
			color_fragment: Yg,
			color_pars_fragment: jg,
			color_pars_vertex: Xg,
			color_vertex: Qg,
			common: qg,
			cube_uv_reflection_fragment: Zg,
			defaultnormal_vertex: Jg,
			displacementmap_pars_vertex: Kg,
			displacementmap_vertex: $g,
			emissivemap_fragment: ev,
			emissivemap_pars_fragment: tv,
			encodings_fragment: nv,
			encodings_pars_fragment: iv,
			envmap_fragment: rv,
			envmap_common_pars_fragment: sv,
			envmap_pars_fragment: av,
			envmap_pars_vertex: ov,
			envmap_physical_pars_fragment: xv,
			envmap_vertex: lv,
			fog_vertex: cv,
			fog_pars_vertex: uv,
			fog_fragment: hv,
			fog_pars_fragment: dv,
			gradientmap_pars_fragment: fv,
			lightmap_fragment: pv,
			lightmap_pars_fragment: mv,
			lights_lambert_vertex: gv,
			lights_pars_begin: vv,
			lights_toon_fragment: yv,
			lights_toon_pars_fragment: wv,
			lights_phong_fragment: bv,
			lights_phong_pars_fragment: Av,
			lights_physical_fragment: Ev,
			lights_physical_pars_fragment: Mv,
			lights_fragment_begin: Sv,
			lights_fragment_maps: _v,
			lights_fragment_end: Tv,
			logdepthbuf_fragment: Cv,
			logdepthbuf_pars_fragment: Dv,
			logdepthbuf_pars_vertex: Rv,
			logdepthbuf_vertex: Pv,
			map_fragment: Lv,
			map_pars_fragment: Iv,
			map_particle_fragment: Bv,
			map_particle_pars_fragment: Uv,
			metalnessmap_fragment: Fv,
			metalnessmap_pars_fragment: Ov,
			morphnormal_vertex: Nv,
			morphtarget_pars_vertex: Hv,
			morphtarget_vertex: zv,
			normal_fragment_begin: Gv,
			normal_fragment_maps: kv,
			normal_pars_fragment: Vv,
			normal_pars_vertex: Wv,
			normal_vertex: Yv,
			normalmap_pars_fragment: jv,
			clearcoat_normal_fragment_begin: Xv,
			clearcoat_normal_fragment_maps: Qv,
			clearcoat_pars_fragment: qv,
			output_fragment: Zv,
			packing: Jv,
			premultiplied_alpha_fragment: Kv,
			project_vertex: $v,
			dithering_fragment: e0,
			dithering_pars_fragment: t0,
			roughnessmap_fragment: n0,
			roughnessmap_pars_fragment: i0,
			shadowmap_pars_fragment: r0,
			shadowmap_pars_vertex: s0,
			shadowmap_vertex: a0,
			shadowmask_pars_fragment: o0,
			skinbase_vertex: l0,
			skinning_pars_vertex: c0,
			skinning_vertex: u0,
			skinnormal_vertex: h0,
			specularmap_fragment: d0,
			specularmap_pars_fragment: f0,
			tonemapping_fragment: p0,
			tonemapping_pars_fragment: m0,
			transmission_fragment: g0,
			transmission_pars_fragment: v0,
			uv_pars_fragment: x0,
			uv_pars_vertex: y0,
			uv_vertex: w0,
			uv2_pars_fragment: b0,
			uv2_pars_vertex: A0,
			uv2_vertex: E0,
			worldpos_vertex: M0,
			background_vert: S0,
			background_frag: _0,
			cube_vert: T0,
			cube_frag: C0,
			depth_vert: D0,
			depth_frag: R0,
			distanceRGBA_vert: P0,
			distanceRGBA_frag: L0,
			equirect_vert: I0,
			equirect_frag: B0,
			linedashed_vert: U0,
			linedashed_frag: F0,
			meshbasic_vert: O0,
			meshbasic_frag: N0,
			meshlambert_vert: H0,
			meshlambert_frag: z0,
			meshmatcap_vert: G0,
			meshmatcap_frag: k0,
			meshnormal_vert: V0,
			meshnormal_frag: W0,
			meshphong_vert: Y0,
			meshphong_frag: j0,
			meshphysical_vert: X0,
			meshphysical_frag: Q0,
			meshtoon_vert: q0,
			meshtoon_frag: Z0,
			points_vert: J0,
			points_frag: K0,
			shadow_vert: $0,
			shadow_frag: ex,
			sprite_vert: tx,
			sprite_frag: nx
		},
		se = {
			common: {
				diffuse: {
					value: new $(16777215)
				},
				opacity: {
					value: 1
				},
				map: {
					value: null
				},
				uvTransform: {
					value: new Et
				},
				uv2Transform: {
					value: new Et
				},
				alphaMap: {
					value: null
				},
				alphaTest: {
					value: 0
				}
			},
			specularmap: {
				specularMap: {
					value: null
				}
			},
			envmap: {
				envMap: {
					value: null
				},
				flipEnvMap: {
					value: -1
				},
				reflectivity: {
					value: 1
				},
				ior: {
					value: 1.5
				},
				refractionRatio: {
					value: .98
				}
			},
			aomap: {
				aoMap: {
					value: null
				},
				aoMapIntensity: {
					value: 1
				}
			},
			lightmap: {
				lightMap: {
					value: null
				},
				lightMapIntensity: {
					value: 1
				}
			},
			emissivemap: {
				emissiveMap: {
					value: null
				}
			},
			bumpmap: {
				bumpMap: {
					value: null
				},
				bumpScale: {
					value: 1
				}
			},
			normalmap: {
				normalMap: {
					value: null
				},
				normalScale: {
					value: new O(1, 1)
				}
			},
			displacementmap: {
				displacementMap: {
					value: null
				},
				displacementScale: {
					value: 1
				},
				displacementBias: {
					value: 0
				}
			},
			roughnessmap: {
				roughnessMap: {
					value: null
				}
			},
			metalnessmap: {
				metalnessMap: {
					value: null
				}
			},
			gradientmap: {
				gradientMap: {
					value: null
				}
			},
			fog: {
				fogDensity: {
					value: 25e-5
				},
				fogNear: {
					value: 1
				},
				fogFar: {
					value: 2e3
				},
				fogColor: {
					value: new $(16777215)
				}
			},
			lights: {
				ambientLightColor: {
					value: []
				},
				lightProbe: {
					value: []
				},
				directionalLights: {
					value: [],
					properties: {
						direction: {},
						color: {}
					}
				},
				directionalLightShadows: {
					value: [],
					properties: {
						shadowBias: {},
						shadowNormalBias: {},
						shadowRadius: {},
						shadowMapSize: {}
					}
				},
				directionalShadowMap: {
					value: []
				},
				directionalShadowMatrix: {
					value: []
				},
				spotLights: {
					value: [],
					properties: {
						color: {},
						position: {},
						direction: {},
						distance: {},
						coneCos: {},
						penumbraCos: {},
						decay: {}
					}
				},
				spotLightShadows: {
					value: [],
					properties: {
						shadowBias: {},
						shadowNormalBias: {},
						shadowRadius: {},
						shadowMapSize: {}
					}
				},
				spotShadowMap: {
					value: []
				},
				spotShadowMatrix: {
					value: []
				},
				pointLights: {
					value: [],
					properties: {
						color: {},
						position: {},
						decay: {},
						distance: {}
					}
				},
				pointLightShadows: {
					value: [],
					properties: {
						shadowBias: {},
						shadowNormalBias: {},
						shadowRadius: {},
						shadowMapSize: {},
						shadowCameraNear: {},
						shadowCameraFar: {}
					}
				},
				pointShadowMap: {
					value: []
				},
				pointShadowMatrix: {
					value: []
				},
				hemisphereLights: {
					value: [],
					properties: {
						direction: {},
						skyColor: {},
						groundColor: {}
					}
				},
				rectAreaLights: {
					value: [],
					properties: {
						color: {},
						position: {},
						width: {},
						height: {}
					}
				},
				ltc_1: {
					value: null
				},
				ltc_2: {
					value: null
				}
			},
			points: {
				diffuse: {
					value: new $(16777215)
				},
				opacity: {
					value: 1
				},
				size: {
					value: 1
				},
				scale: {
					value: 1
				},
				map: {
					value: null
				},
				alphaMap: {
					value: null
				},
				alphaTest: {
					value: 0
				},
				uvTransform: {
					value: new Et
				}
			},
			sprite: {
				diffuse: {
					value: new $(16777215)
				},
				opacity: {
					value: 1
				},
				center: {
					value: new O(.5, .5)
				},
				rotation: {
					value: 0
				},
				map: {
					value: null
				},
				alphaMap: {
					value: null
				},
				alphaTest: {
					value: 0
				},
				uvTransform: {
					value: new Et
				}
			}
		},
		pn = {
			basic: {
				uniforms: Ut([se.common, se.specularmap, se.envmap, se.aomap, se.lightmap, se.fog]),
				vertexShader: Be.meshbasic_vert,
				fragmentShader: Be.meshbasic_frag
			},
			lambert: {
				uniforms: Ut([se.common, se.specularmap, se.envmap, se.aomap, se.lightmap, se.emissivemap, se.fog, se.lights, {
					emissive: {
						value: new $(0)
					}
				}]),
				vertexShader: Be.meshlambert_vert,
				fragmentShader: Be.meshlambert_frag
			},
			phong: {
				uniforms: Ut([se.common, se.specularmap, se.envmap, se.aomap, se.lightmap, se.emissivemap, se.bumpmap, se.normalmap, se.displacementmap, se.fog, se.lights, {
					emissive: {
						value: new $(0)
					},
					specular: {
						value: new $(1118481)
					},
					shininess: {
						value: 30
					}
				}]),
				vertexShader: Be.meshphong_vert,
				fragmentShader: Be.meshphong_frag
			},
			standard: {
				uniforms: Ut([se.common, se.envmap, se.aomap, se.lightmap, se.emissivemap, se.bumpmap, se.normalmap, se.displacementmap, se.roughnessmap, se.metalnessmap, se.fog, se.lights, {
					emissive: {
						value: new $(0)
					},
					roughness: {
						value: 1
					},
					metalness: {
						value: 0
					},
					envMapIntensity: {
						value: 1
					}
				}]),
				vertexShader: Be.meshphysical_vert,
				fragmentShader: Be.meshphysical_frag
			},
			toon: {
				uniforms: Ut([se.common, se.aomap, se.lightmap, se.emissivemap, se.bumpmap, se.normalmap, se.displacementmap, se.gradientmap, se.fog, se.lights, {
					emissive: {
						value: new $(0)
					}
				}]),
				vertexShader: Be.meshtoon_vert,
				fragmentShader: Be.meshtoon_frag
			},
			matcap: {
				uniforms: Ut([se.common, se.bumpmap, se.normalmap, se.displacementmap, se.fog, {
					matcap: {
						value: null
					}
				}]),
				vertexShader: Be.meshmatcap_vert,
				fragmentShader: Be.meshmatcap_frag
			},
			points: {
				uniforms: Ut([se.points, se.fog]),
				vertexShader: Be.points_vert,
				fragmentShader: Be.points_frag
			},
			dashed: {
				uniforms: Ut([se.common, se.fog, {
					scale: {
						value: 1
					},
					dashSize: {
						value: 1
					},
					totalSize: {
						value: 2
					}
				}]),
				vertexShader: Be.linedashed_vert,
				fragmentShader: Be.linedashed_frag
			},
			depth: {
				uniforms: Ut([se.common, se.displacementmap]),
				vertexShader: Be.depth_vert,
				fragmentShader: Be.depth_frag
			},
			normal: {
				uniforms: Ut([se.common, se.bumpmap, se.normalmap, se.displacementmap, {
					opacity: {
						value: 1
					}
				}]),
				vertexShader: Be.meshnormal_vert,
				fragmentShader: Be.meshnormal_frag
			},
			sprite: {
				uniforms: Ut([se.sprite, se.fog]),
				vertexShader: Be.sprite_vert,
				fragmentShader: Be.sprite_frag
			},
			background: {
				uniforms: {
					uvTransform: {
						value: new Et
					},
					t2D: {
						value: null
					}
				},
				vertexShader: Be.background_vert,
				fragmentShader: Be.background_frag
			},
			cube: {
				uniforms: Ut([se.envmap, {
					opacity: {
						value: 1
					}
				}]),
				vertexShader: Be.cube_vert,
				fragmentShader: Be.cube_frag
			},
			equirect: {
				uniforms: {
					tEquirect: {
						value: null
					}
				},
				vertexShader: Be.equirect_vert,
				fragmentShader: Be.equirect_frag
			},
			distanceRGBA: {
				uniforms: Ut([se.common, se.displacementmap, {
					referencePosition: {
						value: new A
					},
					nearDistance: {
						value: 1
					},
					farDistance: {
						value: 1e3
					}
				}]),
				vertexShader: Be.distanceRGBA_vert,
				fragmentShader: Be.distanceRGBA_frag
			},
			shadow: {
				uniforms: Ut([se.lights, se.fog, {
					color: {
						value: new $(0)
					},
					opacity: {
						value: 1
					}
				}]),
				vertexShader: Be.shadow_vert,
				fragmentShader: Be.shadow_frag
			}
		};
	pn.physical = {
		uniforms: Ut([pn.standard.uniforms, {
			clearcoat: {
				value: 0
			},
			clearcoatMap: {
				value: null
			},
			clearcoatRoughness: {
				value: 0
			},
			clearcoatRoughnessMap: {
				value: null
			},
			clearcoatNormalScale: {
				value: new O(1, 1)
			},
			clearcoatNormalMap: {
				value: null
			},
			sheen: {
				value: 0
			},
			sheenColor: {
				value: new $(0)
			},
			sheenColorMap: {
				value: null
			},
			sheenRoughness: {
				value: 0
			},
			sheenRoughnessMap: {
				value: null
			},
			transmission: {
				value: 0
			},
			transmissionMap: {
				value: null
			},
			transmissionSamplerSize: {
				value: new O
			},
			transmissionSamplerMap: {
				value: null
			},
			thickness: {
				value: 0
			},
			thicknessMap: {
				value: null
			},
			attenuationDistance: {
				value: 0
			},
			attenuationColor: {
				value: new $(0)
			},
			specularIntensity: {
				value: 0
			},
			specularIntensityMap: {
				value: null
			},
			specularColor: {
				value: new $(1, 1, 1)
			},
			specularColorMap: {
				value: null
			}
		}]),
		vertexShader: Be.meshphysical_vert,
		fragmentShader: Be.meshphysical_frag
	};

	function ix(r, e, t, n, i) {
		let s = new $(0),
			a = 0,
			o, l, c = null,
			u = 0,
			h = null;

		function d(p, v) {
			let x = !1,
				g = v.isScene === !0 ? v.background : null;
			g && g.isTexture && (g = e.get(g));
			let m = r.xr,
				b = m.getSession && m.getSession();
			b && b.environmentBlendMode === "additive" && (g = null), g === null ? f(s, a) : g && g.isColor && (f(g, 1), x = !0), (r.autoClear || x) && r.clear(r.autoClearColor, r.autoClearDepth, r.autoClearStencil), g && (g.isCubeTexture || g.mapping === dr) ? (l === void 0 && (l = new ze(new Gn(1, 1, 1), new Ye({
				name: "BackgroundCubeMaterial",
				uniforms: _r(pn.cube.uniforms),
				vertexShader: pn.cube.vertexShader,
				fragmentShader: pn.cube.fragmentShader,
				side: Qe,
				depthTest: !1,
				depthWrite: !1,
				fog: !1
			})), l.geometry.deleteAttribute("normal"), l.geometry.deleteAttribute("uv"), l.onBeforeRender = function (y, E, _) {
				this.matrixWorld.copyPosition(_.matrixWorld)
			}, Object.defineProperty(l.material, "envMap", {
				get: function () {
					return this.uniforms.envMap.value
				}
			}), n.update(l)), l.material.uniforms.envMap.value = g, l.material.uniforms.flipEnvMap.value = g.isCubeTexture && g.isRenderTargetTexture === !1 ? -1 : 1, (c !== g || u !== g.version || h !== r.toneMapping) && (l.material.needsUpdate = !0, c = g, u = g.version, h = r.toneMapping), p.unshift(l, l.geometry, l.material, 0, 0, null)) : g && g.isTexture && (o === void 0 && (o = new ze(new ki(2, 2), new Ye({
				name: "BackgroundMaterial",
				uniforms: _r(pn.background.uniforms),
				vertexShader: pn.background.vertexShader,
				fragmentShader: pn.background.fragmentShader,
				side: Rn,
				depthTest: !1,
				depthWrite: !1,
				fog: !1
			})), o.geometry.deleteAttribute("normal"), Object.defineProperty(o.material, "map", {
				get: function () {
					return this.uniforms.t2D.value
				}
			}), n.update(o)), o.material.uniforms.t2D.value = g, g.matrixAutoUpdate === !0 && g.updateMatrix(), o.material.uniforms.uvTransform.value.copy(g.matrix), (c !== g || u !== g.version || h !== r.toneMapping) && (o.material.needsUpdate = !0, c = g, u = g.version, h = r.toneMapping), p.unshift(o, o.geometry, o.material, 0, 0, null))
		}

		function f(p, v) {
			t.buffers.color.setClear(p.r, p.g, p.b, v, i)
		}
		return {
			getClearColor: function () {
				return s
			},
			setClearColor: function (p, v = 1) {
				s.set(p), a = v, f(s, a)
			},
			getClearAlpha: function () {
				return a
			},
			setClearAlpha: function (p) {
				a = p, f(s, a)
			},
			render: d
		}
	}

	function rx(r, e, t, n) {
		let i = r.getParameter(34921),
			s = n.isWebGL2 ? null : e.get("OES_vertex_array_object"),
			a = n.isWebGL2 || s !== null,
			o = {},
			l = v(null),
			c = l;

		function u(F, U, z, N, G) {
			let ne = !1;
			if (a) {
				let fe = p(N, z, U);
				c !== fe && (c = fe, d(c.object)), ne = x(N, G), ne && g(N, G)
			} else {
				let fe = U.wireframe === !0;
				(c.geometry !== N.id || c.program !== z.id || c.wireframe !== fe) && (c.geometry = N.id, c.program = z.id, c.wireframe = fe, ne = !0)
			}
			F.isInstancedMesh === !0 && (ne = !0), G !== null && t.update(G, 34963), ne && (w(F, U, z, N), G !== null && r.bindBuffer(34963, t.get(G).buffer))
		}

		function h() {
			return n.isWebGL2 ? r.createVertexArray() : s.createVertexArrayOES()
		}

		function d(F) {
			return n.isWebGL2 ? r.bindVertexArray(F) : s.bindVertexArrayOES(F)
		}

		function f(F) {
			return n.isWebGL2 ? r.deleteVertexArray(F) : s.deleteVertexArrayOES(F)
		}

		function p(F, U, z) {
			let N = z.wireframe === !0,
				G = o[F.id];
			G === void 0 && (G = {}, o[F.id] = G);
			let ne = G[U.id];
			ne === void 0 && (ne = {}, G[U.id] = ne);
			let fe = ne[N];
			return fe === void 0 && (fe = v(h()), ne[N] = fe), fe
		}

		function v(F) {
			let U = [],
				z = [],
				N = [];
			for (let G = 0; G < i; G++) U[G] = 0, z[G] = 0, N[G] = 0;
			return {
				geometry: null,
				program: null,
				wireframe: !1,
				newAttributes: U,
				enabledAttributes: z,
				attributeDivisors: N,
				object: F,
				attributes: {},
				index: null
			}
		}

		function x(F, U) {
			let z = c.attributes,
				N = F.attributes,
				G = 0;
			for (let ne in N) {
				let fe = z[ne],
					Y = N[ne];
				if (fe === void 0 || fe.attribute !== Y || fe.data !== Y.data) return !0;
				G++
			}
			return c.attributesNum !== G || c.index !== U
		}

		function g(F, U) {
			let z = {},
				N = F.attributes,
				G = 0;
			for (let ne in N) {
				let fe = N[ne],
					Y = {};
				Y.attribute = fe, fe.data && (Y.data = fe.data), z[ne] = Y, G++
			}
			c.attributes = z, c.attributesNum = G, c.index = U
		}

		function m() {
			let F = c.newAttributes;
			for (let U = 0, z = F.length; U < z; U++) F[U] = 0
		}

		function b(F) {
			y(F, 0)
		}

		function y(F, U) {
			let z = c.newAttributes,
				N = c.enabledAttributes,
				G = c.attributeDivisors;
			z[F] = 1, N[F] === 0 && (r.enableVertexAttribArray(F), N[F] = 1), G[F] !== U && ((n.isWebGL2 ? r : e.get("ANGLE_instanced_arrays"))[n.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](F, U), G[F] = U)
		}

		function E() {
			let F = c.newAttributes,
				U = c.enabledAttributes;
			for (let z = 0, N = U.length; z < N; z++) U[z] !== F[z] && (r.disableVertexAttribArray(z), U[z] = 0)
		}

		function _(F, U, z, N, G, ne) {
			n.isWebGL2 === !0 && (z === 5124 || z === 5125) ? r.vertexAttribIPointer(F, U, z, G, ne) : r.vertexAttribPointer(F, U, z, N, G, ne)
		}

		function w(F, U, z, N) {
			if (n.isWebGL2 === !1 && (F.isInstancedMesh || N.isInstancedBufferGeometry) && e.get("ANGLE_instanced_arrays") === null) return;
			m();
			let G = N.attributes,
				ne = z.getAttributes(),
				fe = U.defaultAttributeValues;
			for (let Y in ne) {
				let j = ne[Y];
				if (j.location >= 0) {
					let ue = G[Y];
					if (ue === void 0 && (Y === "instanceMatrix" && F.instanceMatrix && (ue = F.instanceMatrix), Y === "instanceColor" && F.instanceColor && (ue = F.instanceColor)), ue !== void 0) {
						let oe = ue.normalized,
							ve = ue.itemSize,
							Oe = t.get(ue);
						if (Oe === void 0) continue;
						let J = Oe.buffer,
							Re = Oe.type,
							be = Oe.bytesPerElement;
						if (ue.isInterleavedBufferAttribute) {
							let xe = ue.data,
								we = xe.stride,
								Ue = ue.offset;
							if (xe && xe.isInstancedInterleavedBuffer) {
								for (let W = 0; W < j.locationSize; W++) y(j.location + W, xe.meshPerAttribute);
								F.isInstancedMesh !== !0 && N._maxInstanceCount === void 0 && (N._maxInstanceCount = xe.meshPerAttribute * xe.count)
							} else
								for (let W = 0; W < j.locationSize; W++) b(j.location + W);
							r.bindBuffer(34962, J);
							for (let W = 0; W < j.locationSize; W++) _(j.location + W, ve / j.locationSize, Re, oe, we * be, (Ue + ve / j.locationSize * W) * be)
						} else {
							if (ue.isInstancedBufferAttribute) {
								for (let xe = 0; xe < j.locationSize; xe++) y(j.location + xe, ue.meshPerAttribute);
								F.isInstancedMesh !== !0 && N._maxInstanceCount === void 0 && (N._maxInstanceCount = ue.meshPerAttribute * ue.count)
							} else
								for (let xe = 0; xe < j.locationSize; xe++) b(j.location + xe);
							r.bindBuffer(34962, J);
							for (let xe = 0; xe < j.locationSize; xe++) _(j.location + xe, ve / j.locationSize, Re, oe, ve * be, ve / j.locationSize * xe * be)
						}
					} else if (fe !== void 0) {
						let oe = fe[Y];
						if (oe !== void 0) switch (oe.length) {
							case 2:
								r.vertexAttrib2fv(j.location, oe);
								break;
							case 3:
								r.vertexAttrib3fv(j.location, oe);
								break;
							case 4:
								r.vertexAttrib4fv(j.location, oe);
								break;
							default:
								r.vertexAttrib1fv(j.location, oe)
						}
					}
				}
			}
			E()
		}

		function D() {
			R();
			for (let F in o) {
				let U = o[F];
				for (let z in U) {
					let N = U[z];
					for (let G in N) f(N[G].object), delete N[G];
					delete U[z]
				}
				delete o[F]
			}
		}

		function I(F) {
			if (o[F.id] === void 0) return;
			let U = o[F.id];
			for (let z in U) {
				let N = U[z];
				for (let G in N) f(N[G].object), delete N[G];
				delete U[z]
			}
			delete o[F.id]
		}

		function L(F) {
			for (let U in o) {
				let z = o[U];
				if (z[F.id] === void 0) continue;
				let N = z[F.id];
				for (let G in N) f(N[G].object), delete N[G];
				delete z[F.id]
			}
		}

		function R() {
			Z(), c !== l && (c = l, d(c.object))
		}

		function Z() {
			l.geometry = null, l.program = null, l.wireframe = !1
		}
		return {
			setup: u,
			reset: R,
			resetDefaultState: Z,
			dispose: D,
			releaseStatesOfGeometry: I,
			releaseStatesOfProgram: L,
			initAttributes: m,
			enableAttribute: b,
			disableUnusedAttributes: E
		}
	}

	function sx(r, e, t, n) {
		let i = n.isWebGL2,
			s;

		function a(c) {
			s = c
		}

		function o(c, u) {
			r.drawArrays(s, c, u), t.update(u, s, 1)
		}

		function l(c, u, h) {
			if (h === 0) return;
			let d, f;
			if (i) d = r, f = "drawArraysInstanced";
			else if (d = e.get("ANGLE_instanced_arrays"), f = "drawArraysInstancedANGLE", d === null) {
				console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
				return
			}
			d[f](s, c, u, h), t.update(u, s, h)
		}
		this.setMode = a, this.render = o, this.renderInstances = l
	}

	function ax(r, e, t) {
		let n;

		function i() {
			if (n !== void 0) return n;
			if (e.has("EXT_texture_filter_anisotropic") === !0) {
				let w = e.get("EXT_texture_filter_anisotropic");
				n = r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
			} else n = 0;
			return n
		}

		function s(w) {
			if (w === "highp") {
				if (r.getShaderPrecisionFormat(35633, 36338).precision > 0 && r.getShaderPrecisionFormat(35632, 36338).precision > 0) return "highp";
				w = "mediump"
			}
			return w === "mediump" && r.getShaderPrecisionFormat(35633, 36337).precision > 0 && r.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp"
		}
		let a = typeof WebGL2RenderingContext != "undefined" && r instanceof WebGL2RenderingContext || typeof WebGL2ComputeRenderingContext != "undefined" && r instanceof WebGL2ComputeRenderingContext,
			o = t.precision !== void 0 ? t.precision : "highp",
			l = s(o);
		l !== o && (console.warn("THREE.WebGLRenderer:", o, "not supported, using", l, "instead."), o = l);
		let c = a || e.has("WEBGL_draw_buffers"),
			u = t.logarithmicDepthBuffer === !0,
			h = r.getParameter(34930),
			d = r.getParameter(35660),
			f = r.getParameter(3379),
			p = r.getParameter(34076),
			v = r.getParameter(34921),
			x = r.getParameter(36347),
			g = r.getParameter(36348),
			m = r.getParameter(36349),
			b = d > 0,
			y = a || e.has("OES_texture_float"),
			E = b && y,
			_ = a ? r.getParameter(36183) : 0;
		return {
			isWebGL2: a,
			drawBuffers: c,
			getMaxAnisotropy: i,
			getMaxPrecision: s,
			precision: o,
			logarithmicDepthBuffer: u,
			maxTextures: h,
			maxVertexTextures: d,
			maxTextureSize: f,
			maxCubemapSize: p,
			maxAttributes: v,
			maxVertexUniforms: x,
			maxVaryings: g,
			maxFragmentUniforms: m,
			vertexTextures: b,
			floatFragmentTextures: y,
			floatVertexTextures: E,
			maxSamples: _
		}
	}

	function ox(r) {
		let e = this,
			t = null,
			n = 0,
			i = !1,
			s = !1,
			a = new fn,
			o = new Et,
			l = {
				value: null,
				needsUpdate: !1
			};
		this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function (h, d, f) {
			let p = h.length !== 0 || d || n !== 0 || i;
			return i = d, t = u(h, f, 0), n = h.length, p
		}, this.beginShadows = function () {
			s = !0, u(null)
		}, this.endShadows = function () {
			s = !1, c()
		}, this.setState = function (h, d, f) {
			let p = h.clippingPlanes,
				v = h.clipIntersection,
				x = h.clipShadows,
				g = r.get(h);
			if (!i || p === null || p.length === 0 || s && !x) s ? u(null) : c();
			else {
				let m = s ? 0 : n,
					b = m * 4,
					y = g.clippingState || null;
				l.value = y, y = u(p, d, b, f);
				for (let E = 0; E !== b; ++E) y[E] = t[E];
				g.clippingState = y, this.numIntersection = v ? this.numPlanes : 0, this.numPlanes += m
			}
		};

		function c() {
			l.value !== t && (l.value = t, l.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0
		}

		function u(h, d, f, p) {
			let v = h !== null ? h.length : 0,
				x = null;
			if (v !== 0) {
				if (x = l.value, p !== !0 || x === null) {
					let g = f + v * 4,
						m = d.matrixWorldInverse;
					o.getNormalMatrix(m), (x === null || x.length < g) && (x = new Float32Array(g));
					for (let b = 0, y = f; b !== v; ++b, y += 4) a.copy(h[b]).applyMatrix4(m, o), a.normal.toArray(x, y), x[y + 3] = a.constant
				}
				l.value = x, l.needsUpdate = !0
			}
			return e.numPlanes = v, e.numIntersection = 0, x
		}
	}

	function lx(r) {
		let e = new WeakMap;

		function t(a, o) {
			return o === bs ? a.mapping = Di : o === As && (a.mapping = Ri), a
		}

		function n(a) {
			if (a && a.isTexture && a.isRenderTargetTexture === !1) {
				let o = a.mapping;
				if (o === bs || o === As)
					if (e.has(a)) {
						let l = e.get(a).texture;
						return t(l, a.mapping)
					} else {
						let l = a.image;
						if (l && l.height > 0) {
							let c = r.getRenderTarget(),
								u = new Ns(l.height / 2);
							return u.fromEquirectangularTexture(r, a), e.set(a, u), r.setRenderTarget(c), a.addEventListener("dispose", i), t(u.texture, a.mapping)
						} else return null
					}
			}
			return a
		}

		function i(a) {
			let o = a.target;
			o.removeEventListener("dispose", i);
			let l = e.get(o);
			l !== void 0 && (e.delete(o), l.dispose())
		}

		function s() {
			e = new WeakMap
		}
		return {
			get: n,
			dispose: s
		}
	}
	var Pr = class extends oi {
		constructor(e = -1, t = 1, n = 1, i = -1, s = .1, a = 2e3) {
			super();
			this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = i, this.near = s, this.far = a, this.updateProjectionMatrix()
		}
		copy(e, t) {
			return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this
		}
		setViewOffset(e, t, n, i, s, a) {
			this.view === null && (this.view = {
				enabled: !0,
				fullWidth: 1,
				fullHeight: 1,
				offsetX: 0,
				offsetY: 0,
				width: 1,
				height: 1
			}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = s, this.view.height = a, this.updateProjectionMatrix()
		}
		clearViewOffset() {
			this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix()
		}
		updateProjectionMatrix() {
			let e = (this.right - this.left) / (2 * this.zoom),
				t = (this.top - this.bottom) / (2 * this.zoom),
				n = (this.right + this.left) / 2,
				i = (this.top + this.bottom) / 2,
				s = n - e,
				a = n + e,
				o = i + t,
				l = i - t;
			if (this.view !== null && this.view.enabled) {
				let c = (this.right - this.left) / this.view.fullWidth / this.zoom,
					u = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
				s += c * this.view.offsetX, a = s + c * this.view.width, o -= u * this.view.offsetY, l = o - u * this.view.height
			}
			this.projectionMatrix.makeOrthographic(s, a, o, l, this.near, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
		}
		toJSON(e) {
			let t = super.toJSON(e);
			return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t
		}
	};
	Pr.prototype.isOrthographicCamera = !0;
	var Vi = class extends Ye {
		constructor(e) {
			super(e);
			this.type = "RawShaderMaterial"
		}
	};
	Vi.prototype.isRawShaderMaterial = !0;
	var Lr = 4,
		li = 8,
		An = Math.pow(2, li),
		Td = [.125, .215, .35, .446, .526, .582],
		Cd = li - Lr + 1 + Td.length,
		Ir = 20,
		Wi = {
			[ft]: 0,
			[qe]: 1,
			[Ma]: 2,
			[_l]: 3,
			[Tl]: 4,
			[Cl]: 5,
			[Ea]: 6
		},
		cc = new Pr,
		{
			_lodPlanes: Hs,
			_sizeLods: Dd,
			_sigmas: Xa
		} = ux(),
		Rd = new $,
		uc = null,
		Yi = (1 + Math.sqrt(5)) / 2,
		Br = 1 / Yi,
		Pd = [new A(1, 1, 1), new A(-1, 1, 1), new A(1, 1, -1), new A(-1, 1, -1), new A(0, Yi, Br), new A(0, Yi, -Br), new A(Br, 0, Yi), new A(-Br, 0, Yi), new A(Yi, Br, 0), new A(-Yi, Br, 0)],
		hc = class {
			constructor(e) {
				this._renderer = e, this._pingPongRenderTarget = null, this._blurMaterial = hx(Ir), this._equirectShader = null, this._cubemapShader = null, this._compileMaterial(this._blurMaterial)
			}
			fromScene(e, t = 0, n = .1, i = 100) {
				uc = this._renderer.getRenderTarget();
				let s = this._allocateTargets();
				return this._sceneToCubeUV(e, n, i, s), t > 0 && this._blur(s, 0, 0, t), this._applyPMREM(s), this._cleanup(s), s
			}
			fromEquirectangular(e) {
				return this._fromTexture(e)
			}
			fromCubemap(e) {
				return this._fromTexture(e)
			}
			compileCubemapShader() {
				this._cubemapShader === null && (this._cubemapShader = Bd(), this._compileMaterial(this._cubemapShader))
			}
			compileEquirectangularShader() {
				this._equirectShader === null && (this._equirectShader = Id(), this._compileMaterial(this._equirectShader))
			}
			dispose() {
				this._blurMaterial.dispose(), this._cubemapShader !== null && this._cubemapShader.dispose(), this._equirectShader !== null && this._equirectShader.dispose();
				for (let e = 0; e < Hs.length; e++) Hs[e].dispose()
			}
			_cleanup(e) {
				this._pingPongRenderTarget.dispose(), this._renderer.setRenderTarget(uc), e.scissorTest = !1, Qa(e, 0, 0, e.width, e.height)
			}
			_fromTexture(e) {
				uc = this._renderer.getRenderTarget();
				let t = this._allocateTargets(e);
				return this._textureToCubeUV(e, t), this._applyPMREM(t), this._cleanup(t), t
			}
			_allocateTargets(e) {
				let t = {
					magFilter: At,
					minFilter: At,
					generateMipmaps: !1,
					type: lt,
					format: wh,
					encoding: cx(e) ? e.encoding : Ma,
					depthBuffer: !1
				},
					n = Ld(t);
				return n.depthBuffer = !e, this._pingPongRenderTarget = Ld(t), n
			}
			_compileMaterial(e) {
				let t = new ze(Hs[0], e);
				this._renderer.compile(t, cc)
			}
			_sceneToCubeUV(e, t, n, i) {
				let s = 90,
					a = 1,
					o = new ct(s, a, t, n),
					l = [1, -1, 1, 1, 1, 1],
					c = [1, 1, 1, -1, -1, -1],
					u = this._renderer,
					h = u.autoClear,
					d = u.outputEncoding,
					f = u.toneMapping;
				u.getClearColor(Rd), u.toneMapping = qn, u.outputEncoding = ft, u.autoClear = !1;
				let p = new zt({
					name: "PMREM.Background",
					side: Qe,
					depthWrite: !1,
					depthTest: !1
				}),
					v = new ze(new Gn, p),
					x = !1,
					g = e.background;
				g ? g.isColor && (p.color.copy(g), e.background = null, x = !0) : (p.color.copy(Rd), x = !0);
				for (let m = 0; m < 6; m++) {
					let b = m % 3;
					b == 0 ? (o.up.set(0, l[m], 0), o.lookAt(c[m], 0, 0)) : b == 1 ? (o.up.set(0, 0, l[m]), o.lookAt(0, c[m], 0)) : (o.up.set(0, l[m], 0), o.lookAt(0, 0, c[m])), Qa(i, b * An, m > 2 ? An : 0, An, An), u.setRenderTarget(i), x && u.render(v, o), u.render(e, o)
				}
				v.geometry.dispose(), v.material.dispose(), u.toneMapping = f, u.outputEncoding = d, u.autoClear = h, e.background = g
			}
			_setEncoding(e, t) {
				e.value = Wi[t.encoding]
			}
			_textureToCubeUV(e, t) {
				let n = this._renderer,
					i = e.mapping === Di || e.mapping === Ri;
				i ? this._cubemapShader == null && (this._cubemapShader = Bd()) : this._equirectShader == null && (this._equirectShader = Id());
				let s = i ? this._cubemapShader : this._equirectShader,
					a = new ze(Hs[0], s),
					o = s.uniforms;
				o.envMap.value = e, i || o.texelSize.value.set(1 / e.image.width, 1 / e.image.height), this._setEncoding(o.inputEncoding, e), this._setEncoding(o.outputEncoding, t.texture), Qa(t, 0, 0, 3 * An, 2 * An), n.setRenderTarget(t), n.render(a, cc)
			}
			_applyPMREM(e) {
				let t = this._renderer,
					n = t.autoClear;
				t.autoClear = !1;
				for (let i = 1; i < Cd; i++) {
					let s = Math.sqrt(Xa[i] * Xa[i] - Xa[i - 1] * Xa[i - 1]),
						a = Pd[(i - 1) % Pd.length];
					this._blur(e, i - 1, i, s, a)
				}
				t.autoClear = n
			}
			_blur(e, t, n, i, s) {
				let a = this._pingPongRenderTarget;
				this._halfBlur(e, a, t, n, i, "latitudinal", s), this._halfBlur(a, e, n, n, i, "longitudinal", s)
			}
			_halfBlur(e, t, n, i, s, a, o) {
				let l = this._renderer,
					c = this._blurMaterial;
				a !== "latitudinal" && a !== "longitudinal" && console.error("blur direction must be either latitudinal or longitudinal!");
				let u = 3,
					h = new ze(Hs[i], c),
					d = c.uniforms,
					f = Dd[n] - 1,
					p = isFinite(s) ? Math.PI / (2 * f) : 2 * Math.PI / (2 * Ir - 1),
					v = s / p,
					x = isFinite(s) ? 1 + Math.floor(u * v) : Ir;
				x > Ir && console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Ir}`);
				let g = [],
					m = 0;
				for (let _ = 0; _ < Ir; ++_) {
					let w = _ / v,
						D = Math.exp(-w * w / 2);
					g.push(D), _ == 0 ? m += D : _ < x && (m += 2 * D)
				}
				for (let _ = 0; _ < g.length; _++) g[_] = g[_] / m;
				d.envMap.value = e.texture, d.samples.value = x, d.weights.value = g, d.latitudinal.value = a === "latitudinal", o && (d.poleAxis.value = o), d.dTheta.value = p, d.mipInt.value = li - n, this._setEncoding(d.inputEncoding, e.texture), this._setEncoding(d.outputEncoding, e.texture);
				let b = Dd[i],
					y = 3 * Math.max(0, An - 2 * b),
					E = (i === 0 ? 0 : 2 * An) + 2 * b * (i > li - Lr ? i - li + Lr : 0);
				Qa(t, y, E, 3 * b, 2 * b), l.setRenderTarget(t), l.render(h, cc)
			}
		};

	function cx(r) {
		return r === void 0 || r.type !== lt ? !1 : r.encoding === ft || r.encoding === qe || r.encoding === Ea
	}

	function ux() {
		let r = [],
			e = [],
			t = [],
			n = li;
		for (let i = 0; i < Cd; i++) {
			let s = Math.pow(2, n);
			e.push(s);
			let a = 1 / s;
			i > li - Lr ? a = Td[i - li + Lr - 1] : i == 0 && (a = 0), t.push(a);
			let o = 1 / (s - 1),
				l = -o / 2,
				c = 1 + o / 2,
				u = [l, l, c, l, c, c, l, l, c, c, l, c],
				h = 6,
				d = 6,
				f = 3,
				p = 2,
				v = 1,
				x = new Float32Array(f * d * h),
				g = new Float32Array(p * d * h),
				m = new Float32Array(v * d * h);
			for (let y = 0; y < h; y++) {
				let E = y % 3 * 2 / 3 - 1,
					_ = y > 2 ? 0 : -1,
					w = [E, _, 0, E + 2 / 3, _, 0, E + 2 / 3, _ + 1, 0, E, _, 0, E + 2 / 3, _ + 1, 0, E, _ + 1, 0];
				x.set(w, f * d * y), g.set(u, p * d * y);
				let D = [y, y, y, y, y, y];
				m.set(D, v * d * y)
			}
			let b = new de;
			b.setAttribute("position", new pe(x, f)), b.setAttribute("uv", new pe(g, p)), b.setAttribute("faceIndex", new pe(m, v)), r.push(b), n > Lr && n--
		}
		return {
			_lodPlanes: r,
			_sizeLods: e,
			_sigmas: t
		}
	}

	function Ld(r) {
		let e = new We(3 * An, 3 * An, r);
		return e.texture.mapping = dr, e.texture.name = "PMREM.cubeUv", e.scissorTest = !0, e
	}

	function Qa(r, e, t, n, i) {
		r.viewport.set(e, t, n, i), r.scissor.set(e, t, n, i)
	}

	function hx(r) {
		let e = new Float32Array(r),
			t = new A(0, 1, 0);
		return new Vi({
			name: "SphericalGaussianBlur",
			defines: {
				n: r
			},
			uniforms: {
				envMap: {
					value: null
				},
				samples: {
					value: 1
				},
				weights: {
					value: e
				},
				latitudinal: {
					value: !1
				},
				dTheta: {
					value: 0
				},
				mipInt: {
					value: 0
				},
				poleAxis: {
					value: t
				},
				inputEncoding: {
					value: Wi[ft]
				},
				outputEncoding: {
					value: Wi[ft]
				}
			},
			vertexShader: dc(),
			fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			${fc()}

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,
			blending: xt,
			depthTest: !1,
			depthWrite: !1
		})
	}

	function Id() {
		let r = new O(1, 1);
		return new Vi({
			name: "EquirectangularToCubeUV",
			uniforms: {
				envMap: {
					value: null
				},
				texelSize: {
					value: r
				},
				inputEncoding: {
					value: Wi[ft]
				},
				outputEncoding: {
					value: Wi[ft]
				}
			},
			vertexShader: dc(),
			fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform vec2 texelSize;

			${fc()}

			#include <common>

			void main() {

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				vec2 f = fract( uv / texelSize - 0.5 );
				uv -= f * texelSize;
				vec3 tl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.x += texelSize.x;
				vec3 tr = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.y += texelSize.y;
				vec3 br = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.x -= texelSize.x;
				vec3 bl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;

				vec3 tm = mix( tl, tr, f.x );
				vec3 bm = mix( bl, br, f.x );
				gl_FragColor.rgb = mix( tm, bm, f.y );

				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,
			blending: xt,
			depthTest: !1,
			depthWrite: !1
		})
	}

	function Bd() {
		return new Vi({
			name: "CubemapToCubeUV",
			uniforms: {
				envMap: {
					value: null
				},
				inputEncoding: {
					value: Wi[ft]
				},
				outputEncoding: {
					value: Wi[ft]
				}
			},
			vertexShader: dc(),
			fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			${fc()}

			void main() {

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb = envMapTexelToLinear( textureCube( envMap, vec3( - vOutputDirection.x, vOutputDirection.yz ) ) ).rgb;
				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,
			blending: xt,
			depthTest: !1,
			depthWrite: !1
		})
	}

	function dc() {
		return `

		precision mediump float;
		precision mediump int;

		attribute vec3 position;
		attribute vec2 uv;
		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
	}

	function fc() {
		return `

		uniform int inputEncoding;
		uniform int outputEncoding;

		#include <encodings_pars_fragment>

		vec4 inputTexelToLinear( vec4 value ) {

			if ( inputEncoding == 0 ) {

				return value;

			} else if ( inputEncoding == 1 ) {

				return sRGBToLinear( value );

			} else if ( inputEncoding == 2 ) {

				return RGBEToLinear( value );

			} else if ( inputEncoding == 3 ) {

				return RGBMToLinear( value, 7.0 );

			} else if ( inputEncoding == 4 ) {

				return RGBMToLinear( value, 16.0 );

			} else if ( inputEncoding == 5 ) {

				return RGBDToLinear( value, 256.0 );

			} else {

				return GammaToLinear( value, 2.2 );

			}

		}

		vec4 linearToOutputTexel( vec4 value ) {

			if ( outputEncoding == 0 ) {

				return value;

			} else if ( outputEncoding == 1 ) {

				return LinearTosRGB( value );

			} else if ( outputEncoding == 2 ) {

				return LinearToRGBE( value );

			} else if ( outputEncoding == 3 ) {

				return LinearToRGBM( value, 7.0 );

			} else if ( outputEncoding == 4 ) {

				return LinearToRGBM( value, 16.0 );

			} else if ( outputEncoding == 5 ) {

				return LinearToRGBD( value, 256.0 );

			} else {

				return LinearToGamma( value, 2.2 );

			}

		}

		vec4 envMapTexelToLinear( vec4 color ) {

			return inputTexelToLinear( color );

		}
	`
	}

	function dx(r) {
		let e = new WeakMap,
			t = null;

		function n(o) {
			if (o && o.isTexture && o.isRenderTargetTexture === !1) {
				let l = o.mapping,
					c = l === bs || l === As,
					u = l === Di || l === Ri;
				if (c || u) {
					if (e.has(o)) return e.get(o).texture;
					{
						let h = o.image;
						if (c && h && h.height > 0 || u && h && i(h)) {
							let d = r.getRenderTarget();
							t === null && (t = new hc(r));
							let f = c ? t.fromEquirectangular(o) : t.fromCubemap(o);
							return e.set(o, f), r.setRenderTarget(d), o.addEventListener("dispose", s), f.texture
						} else return null
					}
				}
			}
			return o
		}

		function i(o) {
			let l = 0,
				c = 6;
			for (let u = 0; u < c; u++) o[u] !== void 0 && l++;
			return l === c
		}

		function s(o) {
			let l = o.target;
			l.removeEventListener("dispose", s);
			let c = e.get(l);
			c !== void 0 && (e.delete(l), c.dispose())
		}

		function a() {
			e = new WeakMap, t !== null && (t.dispose(), t = null)
		}
		return {
			get: n,
			dispose: a
		}
	}

	function fx(r) {
		let e = {};

		function t(n) {
			if (e[n] !== void 0) return e[n];
			let i;
			switch (n) {
				case "WEBGL_depth_texture":
					i = r.getExtension("WEBGL_depth_texture") || r.getExtension("MOZ_WEBGL_depth_texture") || r.getExtension("WEBKIT_WEBGL_depth_texture");
					break;
				case "EXT_texture_filter_anisotropic":
					i = r.getExtension("EXT_texture_filter_anisotropic") || r.getExtension("MOZ_EXT_texture_filter_anisotropic") || r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
					break;
				case "WEBGL_compressed_texture_s3tc":
					i = r.getExtension("WEBGL_compressed_texture_s3tc") || r.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
					break;
				case "WEBGL_compressed_texture_pvrtc":
					i = r.getExtension("WEBGL_compressed_texture_pvrtc") || r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
					break;
				default:
					i = r.getExtension(n)
			}
			return e[n] = i, i
		}
		return {
			has: function (n) {
				return t(n) !== null
			},
			init: function (n) {
				n.isWebGL2 ? t("EXT_color_buffer_float") : (t("WEBGL_depth_texture"), t("OES_texture_float"), t("OES_texture_half_float"), t("OES_texture_half_float_linear"), t("OES_standard_derivatives"), t("OES_element_index_uint"), t("OES_vertex_array_object"), t("ANGLE_instanced_arrays")), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture")
			},
			get: function (n) {
				let i = t(n);
				return i === null && console.warn("THREE.WebGLRenderer: " + n + " extension not supported."), i
			}
		}
	}

	function px(r, e, t, n) {
		let i = {},
			s = new WeakMap;

		function a(h) {
			let d = h.target;
			d.index !== null && e.remove(d.index);
			for (let p in d.attributes) e.remove(d.attributes[p]);
			d.removeEventListener("dispose", a), delete i[d.id];
			let f = s.get(d);
			f && (e.remove(f), s.delete(d)), n.releaseStatesOfGeometry(d), d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount, t.memory.geometries--
		}

		function o(h, d) {
			return i[d.id] === !0 || (d.addEventListener("dispose", a), i[d.id] = !0, t.memory.geometries++), d
		}

		function l(h) {
			let d = h.attributes;
			for (let p in d) e.update(d[p], 34962);
			let f = h.morphAttributes;
			for (let p in f) {
				let v = f[p];
				for (let x = 0, g = v.length; x < g; x++) e.update(v[x], 34962)
			}
		}

		function c(h) {
			let d = [],
				f = h.index,
				p = h.attributes.position,
				v = 0;
			if (f !== null) {
				let m = f.array;
				v = f.version;
				for (let b = 0, y = m.length; b < y; b += 3) {
					let E = m[b + 0],
						_ = m[b + 1],
						w = m[b + 2];
					d.push(E, _, _, w, w, E)
				}
			} else {
				let m = p.array;
				v = p.version;
				for (let b = 0, y = m.length / 3 - 1; b < y; b += 3) {
					let E = b + 0,
						_ = b + 1,
						w = b + 2;
					d.push(E, _, _, w, w, E)
				}
			}
			let x = new (dd(d) > 65535 ? Us : Bs)(d, 1);
			x.version = v;
			let g = s.get(h);
			g && e.remove(g), s.set(h, x)
		}

		function u(h) {
			let d = s.get(h);
			if (d) {
				let f = h.index;
				f !== null && d.version < f.version && c(h)
			} else c(h);
			return s.get(h)
		}
		return {
			get: o,
			update: l,
			getWireframeAttribute: u
		}
	}

	function mx(r, e, t, n) {
		let i = n.isWebGL2,
			s;

		function a(d) {
			s = d
		}
		let o, l;

		function c(d) {
			o = d.type, l = d.bytesPerElement
		}

		function u(d, f) {
			r.drawElements(s, f, o, d * l), t.update(f, s, 1)
		}

		function h(d, f, p) {
			if (p === 0) return;
			let v, x;
			if (i) v = r, x = "drawElementsInstanced";
			else if (v = e.get("ANGLE_instanced_arrays"), x = "drawElementsInstancedANGLE", v === null) {
				console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
				return
			}
			v[x](s, f, o, d * l, p), t.update(f, s, p)
		}
		this.setMode = a, this.setIndex = c, this.render = u, this.renderInstances = h
	}

	function gx(r) {
		let e = {
			geometries: 0,
			textures: 0
		},
			t = {
				frame: 0,
				calls: 0,
				triangles: 0,
				points: 0,
				lines: 0
			};

		function n(s, a, o) {
			switch (t.calls++, a) {
				case 4:
					t.triangles += o * (s / 3);
					break;
				case 1:
					t.lines += o * (s / 2);
					break;
				case 3:
					t.lines += o * (s - 1);
					break;
				case 2:
					t.lines += o * s;
					break;
				case 0:
					t.points += o * s;
					break;
				default:
					console.error("THREE.WebGLInfo: Unknown draw mode:", a);
					break
			}
		}

		function i() {
			t.frame++, t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0
		}
		return {
			memory: e,
			render: t,
			programs: null,
			autoReset: !0,
			reset: i,
			update: n
		}
	}
	var zs = class extends ot {
		constructor(e = null, t = 1, n = 1, i = 1) {
			super(null);
			this.image = {
				data: e,
				width: t,
				height: n,
				depth: i
			}, this.magFilter = At, this.minFilter = At, this.wrapR = _t, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.needsUpdate = !0
		}
	};
	zs.prototype.isDataTexture2DArray = !0;

	function vx(r, e) {
		return r[0] - e[0]
	}

	function xx(r, e) {
		return Math.abs(e[1]) - Math.abs(r[1])
	}

	function Ud(r, e) {
		let t = 1,
			n = e.isInterleavedBufferAttribute ? e.data.array : e.array;
		n instanceof Int8Array ? t = 127 : n instanceof Int16Array ? t = 32767 : n instanceof Int32Array ? t = 2147483647 : console.error("THREE.WebGLMorphtargets: Unsupported morph attribute data type: ", n), r.divideScalar(t)
	}

	function yx(r, e, t) {
		let n = {},
			i = new Float32Array(8),
			s = new WeakMap,
			a = new A,
			o = [];
		for (let c = 0; c < 8; c++) o[c] = [c, 0];

		function l(c, u, h, d) {
			let f = c.morphTargetInfluences;
			if (e.isWebGL2 === !0) {
				let p = u.morphAttributes.position.length,
					v = s.get(u);
				if (v === void 0 || v.count !== p) {
					v !== void 0 && v.texture.dispose();
					let m = u.morphAttributes.normal !== void 0,
						b = u.morphAttributes.position,
						y = u.morphAttributes.normal || [],
						E = u.attributes.position.count,
						_ = m === !0 ? 2 : 1,
						w = E * _,
						D = 1;
					w > e.maxTextureSize && (D = Math.ceil(w / e.maxTextureSize), w = e.maxTextureSize);
					let I = new Float32Array(w * D * 4 * p),
						L = new zs(I, w, D, p);
					L.format = Tt, L.type = ln;
					let R = _ * 4;
					for (let Z = 0; Z < p; Z++) {
						let F = b[Z],
							U = y[Z],
							z = w * D * 4 * Z;
						for (let N = 0; N < F.count; N++) {
							a.fromBufferAttribute(F, N), F.normalized === !0 && Ud(a, F);
							let G = N * R;
							I[z + G + 0] = a.x, I[z + G + 1] = a.y, I[z + G + 2] = a.z, I[z + G + 3] = 0, m === !0 && (a.fromBufferAttribute(U, N), U.normalized === !0 && Ud(a, U), I[z + G + 4] = a.x, I[z + G + 5] = a.y, I[z + G + 6] = a.z, I[z + G + 7] = 0)
						}
					}
					v = {
						count: p,
						texture: L,
						size: new O(w, D)
					}, s.set(u, v)
				}
				let x = 0;
				for (let m = 0; m < f.length; m++) x += f[m];
				let g = u.morphTargetsRelative ? 1 : 1 - x;
				d.getUniforms().setValue(r, "morphTargetBaseInfluence", g), d.getUniforms().setValue(r, "morphTargetInfluences", f), d.getUniforms().setValue(r, "morphTargetsTexture", v.texture, t), d.getUniforms().setValue(r, "morphTargetsTextureSize", v.size)
			} else {
				let p = f === void 0 ? 0 : f.length,
					v = n[u.id];
				if (v === void 0 || v.length !== p) {
					v = [];
					for (let y = 0; y < p; y++) v[y] = [y, 0];
					n[u.id] = v
				}
				for (let y = 0; y < p; y++) {
					let E = v[y];
					E[0] = y, E[1] = f[y]
				}
				v.sort(xx);
				for (let y = 0; y < 8; y++) y < p && v[y][1] ? (o[y][0] = v[y][0], o[y][1] = v[y][1]) : (o[y][0] = Number.MAX_SAFE_INTEGER, o[y][1] = 0);
				o.sort(vx);
				let x = u.morphAttributes.position,
					g = u.morphAttributes.normal,
					m = 0;
				for (let y = 0; y < 8; y++) {
					let E = o[y],
						_ = E[0],
						w = E[1];
					_ !== Number.MAX_SAFE_INTEGER && w ? (x && u.getAttribute("morphTarget" + y) !== x[_] && u.setAttribute("morphTarget" + y, x[_]), g && u.getAttribute("morphNormal" + y) !== g[_] && u.setAttribute("morphNormal" + y, g[_]), i[y] = w, m += w) : (x && u.hasAttribute("morphTarget" + y) === !0 && u.deleteAttribute("morphTarget" + y), g && u.hasAttribute("morphNormal" + y) === !0 && u.deleteAttribute("morphNormal" + y), i[y] = 0)
				}
				let b = u.morphTargetsRelative ? 1 : 1 - m;
				d.getUniforms().setValue(r, "morphTargetBaseInfluence", b), d.getUniforms().setValue(r, "morphTargetInfluences", i)
			}
		}
		return {
			update: l
		}
	}

	function wx(r, e, t, n) {
		let i = new WeakMap;

		function s(l) {
			let c = n.render.frame,
				u = l.geometry,
				h = e.get(l, u);
			return i.get(h) !== c && (e.update(h), i.set(h, c)), l.isInstancedMesh && (l.hasEventListener("dispose", o) === !1 && l.addEventListener("dispose", o), t.update(l.instanceMatrix, 34962), l.instanceColor !== null && t.update(l.instanceColor, 34962)), h
		}

		function a() {
			i = new WeakMap
		}

		function o(l) {
			let c = l.target;
			c.removeEventListener("dispose", o), t.remove(c.instanceMatrix), c.instanceColor !== null && t.remove(c.instanceColor)
		}
		return {
			update: s,
			dispose: a
		}
	}
	var Gs = class extends ot {
		constructor(e = null, t = 1, n = 1, i = 1) {
			super(null);
			this.image = {
				data: e,
				width: t,
				height: n,
				depth: i
			}, this.magFilter = At, this.minFilter = At, this.wrapR = _t, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.needsUpdate = !0
		}
	};
	Gs.prototype.isDataTexture3D = !0;
	var Fd = new ot,
		Od = new zs,
		Nd = new Gs,
		Hd = new Gi,
		zd = [],
		Gd = [],
		kd = new Float32Array(16),
		Vd = new Float32Array(9),
		Wd = new Float32Array(4);

	function Ur(r, e, t) {
		let n = r[0];
		if (n <= 0 || n > 0) return r;
		let i = e * t,
			s = zd[i];
		if (s === void 0 && (s = new Float32Array(i), zd[i] = s), e !== 0) {
			n.toArray(s, 0);
			for (let a = 1, o = 0; a !== e; ++a) o += t, r[a].toArray(s, o)
		}
		return s
	}

	function Gt(r, e) {
		if (r.length !== e.length) return !1;
		for (let t = 0, n = r.length; t < n; t++)
			if (r[t] !== e[t]) return !1;
		return !0
	}

	function Ft(r, e) {
		for (let t = 0, n = e.length; t < n; t++) r[t] = e[t]
	}

	function qa(r, e) {
		let t = Gd[e];
		t === void 0 && (t = new Int32Array(e), Gd[e] = t);
		for (let n = 0; n !== e; ++n) t[n] = r.allocateTextureUnit();
		return t
	}

	function bx(r, e) {
		let t = this.cache;
		t[0] !== e && (r.uniform1f(this.addr, e), t[0] = e)
	}

	function Ax(r, e) {
		let t = this.cache;
		if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y) && (r.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
		else {
			if (Gt(t, e)) return;
			r.uniform2fv(this.addr, e), Ft(t, e)
		}
	}

	function Ex(r, e) {
		let t = this.cache;
		if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (r.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
		else if (e.r !== void 0) (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (r.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
		else {
			if (Gt(t, e)) return;
			r.uniform3fv(this.addr, e), Ft(t, e)
		}
	}

	function Mx(r, e) {
		let t = this.cache;
		if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (r.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
		else {
			if (Gt(t, e)) return;
			r.uniform4fv(this.addr, e), Ft(t, e)
		}
	}

	function Sx(r, e) {
		let t = this.cache,
			n = e.elements;
		if (n === void 0) {
			if (Gt(t, e)) return;
			r.uniformMatrix2fv(this.addr, !1, e), Ft(t, e)
		} else {
			if (Gt(t, n)) return;
			Wd.set(n), r.uniformMatrix2fv(this.addr, !1, Wd), Ft(t, n)
		}
	}

	function _x(r, e) {
		let t = this.cache,
			n = e.elements;
		if (n === void 0) {
			if (Gt(t, e)) return;
			r.uniformMatrix3fv(this.addr, !1, e), Ft(t, e)
		} else {
			if (Gt(t, n)) return;
			Vd.set(n), r.uniformMatrix3fv(this.addr, !1, Vd), Ft(t, n)
		}
	}

	function Tx(r, e) {
		let t = this.cache,
			n = e.elements;
		if (n === void 0) {
			if (Gt(t, e)) return;
			r.uniformMatrix4fv(this.addr, !1, e), Ft(t, e)
		} else {
			if (Gt(t, n)) return;
			kd.set(n), r.uniformMatrix4fv(this.addr, !1, kd), Ft(t, n)
		}
	}

	function Cx(r, e) {
		let t = this.cache;
		t[0] !== e && (r.uniform1i(this.addr, e), t[0] = e)
	}

	function Dx(r, e) {
		let t = this.cache;
		Gt(t, e) || (r.uniform2iv(this.addr, e), Ft(t, e))
	}

	function Rx(r, e) {
		let t = this.cache;
		Gt(t, e) || (r.uniform3iv(this.addr, e), Ft(t, e))
	}

	function Px(r, e) {
		let t = this.cache;
		Gt(t, e) || (r.uniform4iv(this.addr, e), Ft(t, e))
	}

	function Lx(r, e) {
		let t = this.cache;
		t[0] !== e && (r.uniform1ui(this.addr, e), t[0] = e)
	}

	function Ix(r, e) {
		let t = this.cache;
		Gt(t, e) || (r.uniform2uiv(this.addr, e), Ft(t, e))
	}

	function Bx(r, e) {
		let t = this.cache;
		Gt(t, e) || (r.uniform3uiv(this.addr, e), Ft(t, e))
	}

	function Ux(r, e) {
		let t = this.cache;
		Gt(t, e) || (r.uniform4uiv(this.addr, e), Ft(t, e))
	}

	function Fx(r, e, t) {
		let n = this.cache,
			i = t.allocateTextureUnit();
		n[0] !== i && (r.uniform1i(this.addr, i), n[0] = i), t.safeSetTexture2D(e || Fd, i)
	}

	function Ox(r, e, t) {
		let n = this.cache,
			i = t.allocateTextureUnit();
		n[0] !== i && (r.uniform1i(this.addr, i), n[0] = i), t.setTexture3D(e || Nd, i)
	}

	function Nx(r, e, t) {
		let n = this.cache,
			i = t.allocateTextureUnit();
		n[0] !== i && (r.uniform1i(this.addr, i), n[0] = i), t.safeSetTextureCube(e || Hd, i)
	}

	function Hx(r, e, t) {
		let n = this.cache,
			i = t.allocateTextureUnit();
		n[0] !== i && (r.uniform1i(this.addr, i), n[0] = i), t.setTexture2DArray(e || Od, i)
	}

	function zx(r) {
		switch (r) {
			case 5126:
				return bx;
			case 35664:
				return Ax;
			case 35665:
				return Ex;
			case 35666:
				return Mx;
			case 35674:
				return Sx;
			case 35675:
				return _x;
			case 35676:
				return Tx;
			case 5124:
			case 35670:
				return Cx;
			case 35667:
			case 35671:
				return Dx;
			case 35668:
			case 35672:
				return Rx;
			case 35669:
			case 35673:
				return Px;
			case 5125:
				return Lx;
			case 36294:
				return Ix;
			case 36295:
				return Bx;
			case 36296:
				return Ux;
			case 35678:
			case 36198:
			case 36298:
			case 36306:
			case 35682:
				return Fx;
			case 35679:
			case 36299:
			case 36307:
				return Ox;
			case 35680:
			case 36300:
			case 36308:
			case 36293:
				return Nx;
			case 36289:
			case 36303:
			case 36311:
			case 36292:
				return Hx
		}
	}

	function Gx(r, e) {
		r.uniform1fv(this.addr, e)
	}

	function kx(r, e) {
		let t = Ur(e, this.size, 2);
		r.uniform2fv(this.addr, t)
	}

	function Vx(r, e) {
		let t = Ur(e, this.size, 3);
		r.uniform3fv(this.addr, t)
	}

	function Wx(r, e) {
		let t = Ur(e, this.size, 4);
		r.uniform4fv(this.addr, t)
	}

	function Yx(r, e) {
		let t = Ur(e, this.size, 4);
		r.uniformMatrix2fv(this.addr, !1, t)
	}

	function jx(r, e) {
		let t = Ur(e, this.size, 9);
		r.uniformMatrix3fv(this.addr, !1, t)
	}

	function Xx(r, e) {
		let t = Ur(e, this.size, 16);
		r.uniformMatrix4fv(this.addr, !1, t)
	}

	function Qx(r, e) {
		r.uniform1iv(this.addr, e)
	}

	function qx(r, e) {
		r.uniform2iv(this.addr, e)
	}

	function Zx(r, e) {
		r.uniform3iv(this.addr, e)
	}

	function Jx(r, e) {
		r.uniform4iv(this.addr, e)
	}

	function Kx(r, e) {
		r.uniform1uiv(this.addr, e)
	}

	function $x(r, e) {
		r.uniform2uiv(this.addr, e)
	}

	function ey(r, e) {
		r.uniform3uiv(this.addr, e)
	}

	function ty(r, e) {
		r.uniform4uiv(this.addr, e)
	}

	function ny(r, e, t) {
		let n = e.length,
			i = qa(t, n);
		r.uniform1iv(this.addr, i);
		for (let s = 0; s !== n; ++s) t.safeSetTexture2D(e[s] || Fd, i[s])
	}

	function iy(r, e, t) {
		let n = e.length,
			i = qa(t, n);
		r.uniform1iv(this.addr, i);
		for (let s = 0; s !== n; ++s) t.setTexture3D(e[s] || Nd, i[s])
	}

	function ry(r, e, t) {
		let n = e.length,
			i = qa(t, n);
		r.uniform1iv(this.addr, i);
		for (let s = 0; s !== n; ++s) t.safeSetTextureCube(e[s] || Hd, i[s])
	}

	function sy(r, e, t) {
		let n = e.length,
			i = qa(t, n);
		r.uniform1iv(this.addr, i);
		for (let s = 0; s !== n; ++s) t.setTexture2DArray(e[s] || Od, i[s])
	}

	function ay(r) {
		switch (r) {
			case 5126:
				return Gx;
			case 35664:
				return kx;
			case 35665:
				return Vx;
			case 35666:
				return Wx;
			case 35674:
				return Yx;
			case 35675:
				return jx;
			case 35676:
				return Xx;
			case 5124:
			case 35670:
				return Qx;
			case 35667:
			case 35671:
				return qx;
			case 35668:
			case 35672:
				return Zx;
			case 35669:
			case 35673:
				return Jx;
			case 5125:
				return Kx;
			case 36294:
				return $x;
			case 36295:
				return ey;
			case 36296:
				return ty;
			case 35678:
			case 36198:
			case 36298:
			case 36306:
			case 35682:
				return ny;
			case 35679:
			case 36299:
			case 36307:
				return iy;
			case 35680:
			case 36300:
			case 36308:
			case 36293:
				return ry;
			case 36289:
			case 36303:
			case 36311:
			case 36292:
				return sy
		}
	}

	function oy(r, e, t) {
		this.id = r, this.addr = t, this.cache = [], this.setValue = zx(e.type)
	}

	function Yd(r, e, t) {
		this.id = r, this.addr = t, this.cache = [], this.size = e.size, this.setValue = ay(e.type)
	}
	Yd.prototype.updateCache = function (r) {
		let e = this.cache;
		r instanceof Float32Array && e.length !== r.length && (this.cache = new Float32Array(r.length)), Ft(e, r)
	};

	function jd(r) {
		this.id = r, this.seq = [], this.map = {}
	}
	jd.prototype.setValue = function (r, e, t) {
		let n = this.seq;
		for (let i = 0, s = n.length; i !== s; ++i) {
			let a = n[i];
			a.setValue(r, e[a.id], t)
		}
	};
	var pc = /(\w+)(\])?(\[|\.)?/g;

	function Xd(r, e) {
		r.seq.push(e), r.map[e.id] = e
	}

	function ly(r, e, t) {
		let n = r.name,
			i = n.length;
		for (pc.lastIndex = 0; ;) {
			let s = pc.exec(n),
				a = pc.lastIndex,
				o = s[1],
				l = s[2] === "]",
				c = s[3];
			if (l && (o = o | 0), c === void 0 || c === "[" && a + 2 === i) {
				Xd(t, c === void 0 ? new oy(o, r, e) : new Yd(o, r, e));
				break
			} else {
				let h = t.map[o];
				h === void 0 && (h = new jd(o), Xd(t, h)), t = h
			}
		}
	}

	function ci(r, e) {
		this.seq = [], this.map = {};
		let t = r.getProgramParameter(e, 35718);
		for (let n = 0; n < t; ++n) {
			let i = r.getActiveUniform(e, n),
				s = r.getUniformLocation(e, i.name);
			ly(i, s, this)
		}
	}
	ci.prototype.setValue = function (r, e, t, n) {
		let i = this.map[e];
		i !== void 0 && i.setValue(r, t, n)
	};
	ci.prototype.setOptional = function (r, e, t) {
		let n = e[t];
		n !== void 0 && this.setValue(r, t, n)
	};
	ci.upload = function (r, e, t, n) {
		for (let i = 0, s = e.length; i !== s; ++i) {
			let a = e[i],
				o = t[a.id];
			o.needsUpdate !== !1 && a.setValue(r, o.value, n)
		}
	};
	ci.seqWithValue = function (r, e) {
		let t = [];
		for (let n = 0, i = r.length; n !== i; ++n) {
			let s = r[n];
			s.id in e && t.push(s)
		}
		return t
	};

	function Qd(r, e, t) {
		let n = r.createShader(e);
		return r.shaderSource(n, t), r.compileShader(n), n
	}
	var cy = 0;

	function uy(r) {
		let e = r.split(`
`);
		for (let t = 0; t < e.length; t++) e[t] = t + 1 + ": " + e[t];
		return e.join(`
`)
	}

	function qd(r) {
		switch (r) {
			case ft:
				return ["Linear", "( value )"];
			case qe:
				return ["sRGB", "( value )"];
			case Ma:
				return ["RGBE", "( value )"];
			case _l:
				return ["RGBM", "( value, 7.0 )"];
			case Tl:
				return ["RGBM", "( value, 16.0 )"];
			case Cl:
				return ["RGBD", "( value, 256.0 )"];
			case Ea:
				return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
			default:
				return console.warn("THREE.WebGLProgram: Unsupported encoding:", r), ["Linear", "( value )"]
		}
	}

	function Zd(r, e, t) {
		let n = r.getShaderParameter(e, 35713),
			i = r.getShaderInfoLog(e).trim();
		return n && i === "" ? "" : t.toUpperCase() + `

` + i + `

` + uy(r.getShaderSource(e))
	}

	function ji(r, e) {
		let t = qd(e);
		return "vec4 " + r + "( vec4 value ) { return " + t[0] + "ToLinear" + t[1] + "; }"
	}

	function hy(r, e) {
		let t = qd(e);
		return "vec4 " + r + "( vec4 value ) { return LinearTo" + t[0] + t[1] + "; }"
	}

	function dy(r, e) {
		let t;
		switch (e) {
			case ah:
				t = "Linear";
				break;
			case oh:
				t = "Reinhard";
				break;
			case lh:
				t = "OptimizedCineon";
				break;
			case ch:
				t = "ACESFilmic";
				break;
			case uh:
				t = "Custom";
				break;
			default:
				console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), t = "Linear"
		}
		return "vec3 " + r + "( vec3 color ) { return " + t + "ToneMapping( color ); }"
	}

	function fy(r) {
		return [r.extensionDerivatives || r.envMapCubeUV || r.bumpMap || r.tangentSpaceNormalMap || r.clearcoatNormalMap || r.flatShading || r.shaderID === "physical" ? "#extension GL_OES_standard_derivatives : enable" : "", (r.extensionFragDepth || r.logarithmicDepthBuffer) && r.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", r.extensionDrawBuffers && r.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (r.extensionShaderTextureLOD || r.envMap || r.transmission) && r.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(ks).join(`
`)
	}

	function py(r) {
		let e = [];
		for (let t in r) {
			let n = r[t];
			n !== !1 && e.push("#define " + t + " " + n)
		}
		return e.join(`
`)
	}

	function my(r, e) {
		let t = {},
			n = r.getProgramParameter(e, 35721);
		for (let i = 0; i < n; i++) {
			let s = r.getActiveAttrib(e, i),
				a = s.name,
				o = 1;
			s.type === 35674 && (o = 2), s.type === 35675 && (o = 3), s.type === 35676 && (o = 4), t[a] = {
				type: s.type,
				location: r.getAttribLocation(e, a),
				locationSize: o
			}
		}
		return t
	}

	function ks(r) {
		return r !== ""
	}

	function Jd(r, e) {
		return r.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows)
	}

	function Kd(r, e) {
		return r.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection)
	}
	var gy = /^[ \t]*#include +<([\w\d./]+)>/gm;

	function mc(r) {
		return r.replace(gy, vy)
	}

	function vy(r, e) {
		let t = Be[e];
		if (t === void 0) throw new Error("Can not resolve #include <" + e + ">");
		return mc(t)
	}
	var xy = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
		yy = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;

	function $d(r) {
		return r.replace(yy, ef).replace(xy, wy)
	}

	function wy(r, e, t, n) {
		return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."), ef(r, e, t, n)
	}

	function ef(r, e, t, n) {
		let i = "";
		for (let s = parseInt(e); s < parseInt(t); s++) i += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
		return i
	}

	function tf(r) {
		let e = "precision " + r.precision + ` float;
precision ` + r.precision + " int;";
		return r.precision === "highp" ? e += `
#define HIGH_PRECISION` : r.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : r.precision === "lowp" && (e += `
#define LOW_PRECISION`), e
	}

	function by(r) {
		let e = "SHADOWMAP_TYPE_BASIC";
		return r.shadowMapType === al ? e = "SHADOWMAP_TYPE_PCF" : r.shadowMapType === Nu ? e = "SHADOWMAP_TYPE_PCF_SOFT" : r.shadowMapType === ur && (e = "SHADOWMAP_TYPE_VSM"), e
	}

	function Ay(r) {
		let e = "ENVMAP_TYPE_CUBE";
		if (r.envMap) switch (r.envMapMode) {
			case Di:
			case Ri:
				e = "ENVMAP_TYPE_CUBE";
				break;
			case dr:
			case Es:
				e = "ENVMAP_TYPE_CUBE_UV";
				break
		}
		return e
	}

	function Ey(r) {
		let e = "ENVMAP_MODE_REFLECTION";
		if (r.envMap) switch (r.envMapMode) {
			case Ri:
			case Es:
				e = "ENVMAP_MODE_REFRACTION";
				break
		}
		return e
	}

	function My(r) {
		let e = "ENVMAP_BLENDING_NONE";
		if (r.envMap) switch (r.combine) {
			case ws:
				e = "ENVMAP_BLENDING_MULTIPLY";
				break;
			case rh:
				e = "ENVMAP_BLENDING_MIX";
				break;
			case sh:
				e = "ENVMAP_BLENDING_ADD";
				break
		}
		return e
	}

	function Sy(r, e, t, n) {
		let i = r.getContext(),
			s = t.defines,
			a = t.vertexShader,
			o = t.fragmentShader,
			l = by(t),
			c = Ay(t),
			u = Ey(t),
			h = My(t),
			d = r.gammaFactor > 0 ? r.gammaFactor : 1,
			f = t.isWebGL2 ? "" : fy(t),
			p = py(s),
			v = i.createProgram(),
			x, g, m = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
		t.isRawShaderMaterial ? (x = [p].filter(ks).join(`
`), x.length > 0 && (x += `
`), g = [f, p].filter(ks).join(`
`), g.length > 0 && (g += `
`)) : (x = [tf(t), "#define SHADER_NAME " + t.shaderName, p, t.instancing ? "#define USE_INSTANCING" : "", t.instancingColor ? "#define USE_INSTANCING_COLOR" : "", t.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + d, "#define MAX_BONES " + t.maxBones, t.useFog && t.fog ? "#define USE_FOG" : "", t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "", t.map ? "#define USE_MAP" : "", t.envMap ? "#define USE_ENVMAP" : "", t.envMap ? "#define " + u : "", t.lightMap ? "#define USE_LIGHTMAP" : "", t.aoMap ? "#define USE_AOMAP" : "", t.emissiveMap ? "#define USE_EMISSIVEMAP" : "", t.bumpMap ? "#define USE_BUMPMAP" : "", t.normalMap ? "#define USE_NORMALMAP" : "", t.normalMap && t.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", t.normalMap && t.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", t.displacementMap && t.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", t.specularMap ? "#define USE_SPECULARMAP" : "", t.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "", t.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "", t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", t.metalnessMap ? "#define USE_METALNESSMAP" : "", t.alphaMap ? "#define USE_ALPHAMAP" : "", t.transmission ? "#define USE_TRANSMISSION" : "", t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", t.thicknessMap ? "#define USE_THICKNESSMAP" : "", t.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "", t.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "", t.vertexTangents ? "#define USE_TANGENT" : "", t.vertexColors ? "#define USE_COLOR" : "", t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", t.vertexUvs ? "#define USE_UV" : "", t.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", t.flatShading ? "#define FLAT_SHADED" : "", t.skinning ? "#define USE_SKINNING" : "", t.useVertexTexture ? "#define BONE_TEXTURE" : "", t.morphTargets ? "#define USE_MORPHTARGETS" : "", t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "", t.morphTargets && t.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "", t.morphTargets && t.isWebGL2 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "", t.doubleSided ? "#define DOUBLE_SIDED" : "", t.flipSided ? "#define FLIP_SIDED" : "", t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", t.shadowMapEnabled ? "#define " + l : "", t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", t.logarithmicDepthBuffer && t.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )", "	attribute vec3 morphTarget0;", "	attribute vec3 morphTarget1;", "	attribute vec3 morphTarget2;", "	attribute vec3 morphTarget3;", "	#ifdef USE_MORPHNORMALS", "		attribute vec3 morphNormal0;", "		attribute vec3 morphNormal1;", "		attribute vec3 morphNormal2;", "		attribute vec3 morphNormal3;", "	#else", "		attribute vec3 morphTarget4;", "		attribute vec3 morphTarget5;", "		attribute vec3 morphTarget6;", "		attribute vec3 morphTarget7;", "	#endif", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", `
`].filter(ks).join(`
`), g = [f, tf(t), "#define SHADER_NAME " + t.shaderName, p, "#define GAMMA_FACTOR " + d, t.useFog && t.fog ? "#define USE_FOG" : "", t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "", t.map ? "#define USE_MAP" : "", t.matcap ? "#define USE_MATCAP" : "", t.envMap ? "#define USE_ENVMAP" : "", t.envMap ? "#define " + c : "", t.envMap ? "#define " + u : "", t.envMap ? "#define " + h : "", t.lightMap ? "#define USE_LIGHTMAP" : "", t.aoMap ? "#define USE_AOMAP" : "", t.emissiveMap ? "#define USE_EMISSIVEMAP" : "", t.bumpMap ? "#define USE_BUMPMAP" : "", t.normalMap ? "#define USE_NORMALMAP" : "", t.normalMap && t.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", t.normalMap && t.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", t.clearcoat ? "#define USE_CLEARCOAT" : "", t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", t.specularMap ? "#define USE_SPECULARMAP" : "", t.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "", t.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "", t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", t.metalnessMap ? "#define USE_METALNESSMAP" : "", t.alphaMap ? "#define USE_ALPHAMAP" : "", t.alphaTest ? "#define USE_ALPHATEST" : "", t.sheen ? "#define USE_SHEEN" : "", t.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "", t.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "", t.transmission ? "#define USE_TRANSMISSION" : "", t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", t.thicknessMap ? "#define USE_THICKNESSMAP" : "", t.vertexTangents ? "#define USE_TANGENT" : "", t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "", t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", t.vertexUvs ? "#define USE_UV" : "", t.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", t.gradientMap ? "#define USE_GRADIENTMAP" : "", t.flatShading ? "#define FLAT_SHADED" : "", t.doubleSided ? "#define DOUBLE_SIDED" : "", t.flipSided ? "#define FLIP_SIDED" : "", t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", t.shadowMapEnabled ? "#define " + l : "", t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", t.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", t.logarithmicDepthBuffer && t.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", (t.extensionShaderTextureLOD || t.envMap) && t.rendererExtensionShaderTextureLod ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", t.toneMapping !== qn ? "#define TONE_MAPPING" : "", t.toneMapping !== qn ? Be.tonemapping_pars_fragment : "", t.toneMapping !== qn ? dy("toneMapping", t.toneMapping) : "", t.dithering ? "#define DITHERING" : "", t.format === Zn ? "#define OPAQUE" : "", Be.encodings_pars_fragment, t.map ? ji("mapTexelToLinear", t.mapEncoding) : "", t.matcap ? ji("matcapTexelToLinear", t.matcapEncoding) : "", t.envMap ? ji("envMapTexelToLinear", t.envMapEncoding) : "", t.emissiveMap ? ji("emissiveMapTexelToLinear", t.emissiveMapEncoding) : "", t.specularColorMap ? ji("specularColorMapTexelToLinear", t.specularColorMapEncoding) : "", t.sheenColorMap ? ji("sheenColorMapTexelToLinear", t.sheenColorMapEncoding) : "", t.lightMap ? ji("lightMapTexelToLinear", t.lightMapEncoding) : "", hy("linearToOutputTexel", t.outputEncoding), t.depthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "", `
`].filter(ks).join(`
`)), a = mc(a), a = Jd(a, t), a = Kd(a, t), o = mc(o), o = Jd(o, t), o = Kd(o, t), a = $d(a), o = $d(o), t.isWebGL2 && t.isRawShaderMaterial !== !0 && (m = `#version 300 es
`, x = ["precision mediump sampler2DArray;", "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) + `
` + x, g = ["#define varying in", t.glslVersion === Dl ? "" : "out highp vec4 pc_fragColor;", t.glslVersion === Dl ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join(`
`) + `
` + g);
		let b = m + x + a,
			y = m + g + o,
			E = Qd(i, 35633, b),
			_ = Qd(i, 35632, y);
		if (i.attachShader(v, E), i.attachShader(v, _), t.index0AttributeName !== void 0 ? i.bindAttribLocation(v, 0, t.index0AttributeName) : t.morphTargets === !0 && i.bindAttribLocation(v, 0, "position"), i.linkProgram(v), r.debug.checkShaderErrors) {
			let I = i.getProgramInfoLog(v).trim(),
				L = i.getShaderInfoLog(E).trim(),
				R = i.getShaderInfoLog(_).trim(),
				Z = !0,
				F = !0;
			if (i.getProgramParameter(v, 35714) === !1) {
				Z = !1;
				let U = Zd(i, E, "vertex"),
					z = Zd(i, _, "fragment");
				console.error("THREE.WebGLProgram: Shader Error " + i.getError() + " - VALIDATE_STATUS " + i.getProgramParameter(v, 35715) + `

Program Info Log: ` + I + `
` + U + `
` + z)
			} else I !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", I) : (L === "" || R === "") && (F = !1);
			F && (this.diagnostics = {
				runnable: Z,
				programLog: I,
				vertexShader: {
					log: L,
					prefix: x
				},
				fragmentShader: {
					log: R,
					prefix: g
				}
			})
		}
		i.deleteShader(E), i.deleteShader(_);
		let w;
		this.getUniforms = function () {
			return w === void 0 && (w = new ci(i, v)), w
		};
		let D;
		return this.getAttributes = function () {
			return D === void 0 && (D = my(i, v)), D
		}, this.destroy = function () {
			n.releaseStatesOfProgram(this), i.deleteProgram(v), this.program = void 0
		}, this.name = t.shaderName, this.id = cy++, this.cacheKey = e, this.usedTimes = 1, this.program = v, this.vertexShader = E, this.fragmentShader = _, this
	}

	function _y(r, e, t, n, i, s, a) {
		let o = [],
			l = i.isWebGL2,
			c = i.logarithmicDepthBuffer,
			u = i.floatVertexTextures,
			h = i.maxVertexUniforms,
			d = i.vertexTextures,
			f = i.precision,
			p = {
				MeshDepthMaterial: "depth",
				MeshDistanceMaterial: "distanceRGBA",
				MeshNormalMaterial: "normal",
				MeshBasicMaterial: "basic",
				MeshLambertMaterial: "lambert",
				MeshPhongMaterial: "phong",
				MeshToonMaterial: "toon",
				MeshStandardMaterial: "physical",
				MeshPhysicalMaterial: "physical",
				MeshMatcapMaterial: "matcap",
				LineBasicMaterial: "basic",
				LineDashedMaterial: "dashed",
				PointsMaterial: "points",
				ShadowMaterial: "shadow",
				SpriteMaterial: "sprite"
			},
			v = ["precision", "isWebGL2", "supportsVertexTextures", "outputEncoding", "instancing", "instancingColor", "map", "mapEncoding", "matcap", "matcapEncoding", "envMap", "envMapMode", "envMapEncoding", "envMapCubeUV", "lightMap", "lightMapEncoding", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "objectSpaceNormalMap", "tangentSpaceNormalMap", "clearcoat", "clearcoatMap", "clearcoatRoughnessMap", "clearcoatNormalMap", "displacementMap", "specularMap", , "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "alphaTest", "combine", "vertexColors", "vertexAlphas", "vertexTangents", "vertexUvs", "uvsVertexOnly", "fog", "useFog", "fogExp2", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "morphTargetsCount", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "numDirLightShadows", "numPointLightShadows", "numSpotLightShadows", "shadowMapEnabled", "shadowMapType", "toneMapping", "physicallyCorrectLights", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering", "format", "specularIntensityMap", "specularColorMap", "specularColorMapEncoding", "transmission", "transmissionMap", "thicknessMap", "sheen", "sheenColorMap", "sheenColorMapEncoding", "sheenRoughnessMap"];

		function x(w) {
			let I = w.skeleton.bones;
			if (u) return 1024;
			{
				let R = Math.floor((h - 20) / 4),
					Z = Math.min(R, I.length);
				return Z < I.length ? (console.warn("THREE.WebGLRenderer: Skeleton has " + I.length + " bones. This GPU supports " + Z + "."), 0) : Z
			}
		}

		function g(w) {
			let D;
			return w && w.isTexture ? D = w.encoding : w && w.isWebGLRenderTarget ? (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), D = w.texture.encoding) : D = ft, D
		}

		function m(w, D, I, L, R) {
			let Z = L.fog,
				F = w.isMeshStandardMaterial ? L.environment : null,
				U = (w.isMeshStandardMaterial ? t : e).get(w.envMap || F),
				z = p[w.type],
				N = R.isSkinnedMesh ? x(R) : 0;
			w.precision !== null && (f = i.getMaxPrecision(w.precision), f !== w.precision && console.warn("THREE.WebGLProgram.getParameters:", w.precision, "not supported, using", f, "instead."));
			let G, ne;
			if (z) {
				let oe = pn[z];
				G = oe.vertexShader, ne = oe.fragmentShader
			} else G = w.vertexShader, ne = w.fragmentShader;
			let fe = r.getRenderTarget(),
				Y = w.alphaTest > 0,
				j = w.clearcoat > 0;
			return {
				isWebGL2: l,
				shaderID: z,
				shaderName: w.type,
				vertexShader: G,
				fragmentShader: ne,
				defines: w.defines,
				isRawShaderMaterial: w.isRawShaderMaterial === !0,
				glslVersion: w.glslVersion,
				precision: f,
				instancing: R.isInstancedMesh === !0,
				instancingColor: R.isInstancedMesh === !0 && R.instanceColor !== null,
				supportsVertexTextures: d,
				outputEncoding: fe !== null ? g(fe.texture) : r.outputEncoding,
				map: !!w.map,
				mapEncoding: g(w.map),
				matcap: !!w.matcap,
				matcapEncoding: g(w.matcap),
				envMap: !!U,
				envMapMode: U && U.mapping,
				envMapEncoding: g(U),
				envMapCubeUV: !!U && (U.mapping === dr || U.mapping === Es),
				lightMap: !!w.lightMap,
				lightMapEncoding: g(w.lightMap),
				aoMap: !!w.aoMap,
				emissiveMap: !!w.emissiveMap,
				emissiveMapEncoding: g(w.emissiveMap),
				bumpMap: !!w.bumpMap,
				normalMap: !!w.normalMap,
				objectSpaceNormalMap: w.normalMapType === ld,
				tangentSpaceNormalMap: w.normalMapType === Fi,
				clearcoat: j,
				clearcoatMap: j && !!w.clearcoatMap,
				clearcoatRoughnessMap: j && !!w.clearcoatRoughnessMap,
				clearcoatNormalMap: j && !!w.clearcoatNormalMap,
				displacementMap: !!w.displacementMap,
				roughnessMap: !!w.roughnessMap,
				metalnessMap: !!w.metalnessMap,
				specularMap: !!w.specularMap,
				specularIntensityMap: !!w.specularIntensityMap,
				specularColorMap: !!w.specularColorMap,
				specularColorMapEncoding: g(w.specularColorMap),
				alphaMap: !!w.alphaMap,
				alphaTest: Y,
				gradientMap: !!w.gradientMap,
				sheen: w.sheen > 0,
				sheenColorMap: !!w.sheenColorMap,
				sheenColorMapEncoding: g(w.sheenColorMap),
				sheenRoughnessMap: !!w.sheenRoughnessMap,
				transmission: w.transmission > 0,
				transmissionMap: !!w.transmissionMap,
				thicknessMap: !!w.thicknessMap,
				combine: w.combine,
				vertexTangents: !!w.normalMap && !!R.geometry && !!R.geometry.attributes.tangent,
				vertexColors: w.vertexColors,
				vertexAlphas: w.vertexColors === !0 && !!R.geometry && !!R.geometry.attributes.color && R.geometry.attributes.color.itemSize === 4,
				vertexUvs: !!w.map || !!w.bumpMap || !!w.normalMap || !!w.specularMap || !!w.alphaMap || !!w.emissiveMap || !!w.roughnessMap || !!w.metalnessMap || !!w.clearcoatMap || !!w.clearcoatRoughnessMap || !!w.clearcoatNormalMap || !!w.displacementMap || !!w.transmissionMap || !!w.thicknessMap || !!w.specularIntensityMap || !!w.specularColorMap || !!w.sheenColorMap || w.sheenRoughnessMap,
				uvsVertexOnly: !(!!w.map || !!w.bumpMap || !!w.normalMap || !!w.specularMap || !!w.alphaMap || !!w.emissiveMap || !!w.roughnessMap || !!w.metalnessMap || !!w.clearcoatNormalMap || w.transmission > 0 || !!w.transmissionMap || !!w.thicknessMap || !!w.specularIntensityMap || !!w.specularColorMap || w.sheen > 0 || !!w.sheenColorMap || !!w.sheenRoughnessMap) && !!w.displacementMap,
				fog: !!Z,
				useFog: w.fog,
				fogExp2: Z && Z.isFogExp2,
				flatShading: !!w.flatShading,
				sizeAttenuation: w.sizeAttenuation,
				logarithmicDepthBuffer: c,
				skinning: R.isSkinnedMesh === !0 && N > 0,
				maxBones: N,
				useVertexTexture: u,
				morphTargets: !!R.geometry && !!R.geometry.morphAttributes.position,
				morphNormals: !!R.geometry && !!R.geometry.morphAttributes.normal,
				morphTargetsCount: !!R.geometry && !!R.geometry.morphAttributes.position ? R.geometry.morphAttributes.position.length : 0,
				numDirLights: D.directional.length,
				numPointLights: D.point.length,
				numSpotLights: D.spot.length,
				numRectAreaLights: D.rectArea.length,
				numHemiLights: D.hemi.length,
				numDirLightShadows: D.directionalShadowMap.length,
				numPointLightShadows: D.pointShadowMap.length,
				numSpotLightShadows: D.spotShadowMap.length,
				numClippingPlanes: a.numPlanes,
				numClipIntersection: a.numIntersection,
				format: w.format,
				dithering: w.dithering,
				shadowMapEnabled: r.shadowMap.enabled && I.length > 0,
				shadowMapType: r.shadowMap.type,
				toneMapping: w.toneMapped ? r.toneMapping : qn,
				physicallyCorrectLights: r.physicallyCorrectLights,
				premultipliedAlpha: w.premultipliedAlpha,
				doubleSided: w.side === Ht,
				flipSided: w.side === Qe,
				depthPacking: w.depthPacking !== void 0 ? w.depthPacking : !1,
				index0AttributeName: w.index0AttributeName,
				extensionDerivatives: w.extensions && w.extensions.derivatives,
				extensionFragDepth: w.extensions && w.extensions.fragDepth,
				extensionDrawBuffers: w.extensions && w.extensions.drawBuffers,
				extensionShaderTextureLOD: w.extensions && w.extensions.shaderTextureLOD,
				rendererExtensionFragDepth: l || n.has("EXT_frag_depth"),
				rendererExtensionDrawBuffers: l || n.has("WEBGL_draw_buffers"),
				rendererExtensionShaderTextureLod: l || n.has("EXT_shader_texture_lod"),
				customProgramCacheKey: w.customProgramCacheKey()
			}
		}

		function b(w) {
			let D = [];
			if (w.shaderID ? D.push(w.shaderID) : (D.push(fd(w.fragmentShader)), D.push(fd(w.vertexShader))), w.defines !== void 0)
				for (let I in w.defines) D.push(I), D.push(w.defines[I]);
			if (w.isRawShaderMaterial === !1) {
				for (let I = 0; I < v.length; I++) D.push(w[v[I]]);
				D.push(r.outputEncoding), D.push(r.gammaFactor)
			}
			return D.push(w.customProgramCacheKey), D.join()
		}

		function y(w) {
			let D = p[w.type],
				I;
			if (D) {
				let L = pn[D];
				I = Ya.clone(L.uniforms)
			} else I = w.uniforms;
			return I
		}

		function E(w, D) {
			let I;
			for (let L = 0, R = o.length; L < R; L++) {
				let Z = o[L];
				if (Z.cacheKey === D) {
					I = Z, ++I.usedTimes;
					break
				}
			}
			return I === void 0 && (I = new Sy(r, D, w, s), o.push(I)), I
		}

		function _(w) {
			if (--w.usedTimes == 0) {
				let D = o.indexOf(w);
				o[D] = o[o.length - 1], o.pop(), w.destroy()
			}
		}
		return {
			getParameters: m,
			getProgramCacheKey: b,
			getUniforms: y,
			acquireProgram: E,
			releaseProgram: _,
			programs: o
		}
	}

	function Ty() {
		let r = new WeakMap;

		function e(s) {
			let a = r.get(s);
			return a === void 0 && (a = {}, r.set(s, a)), a
		}

		function t(s) {
			r.delete(s)
		}

		function n(s, a, o) {
			r.get(s)[a] = o
		}

		function i() {
			r = new WeakMap
		}
		return {
			get: e,
			remove: t,
			update: n,
			dispose: i
		}
	}

	function Cy(r, e) {
		return r.groupOrder !== e.groupOrder ? r.groupOrder - e.groupOrder : r.renderOrder !== e.renderOrder ? r.renderOrder - e.renderOrder : r.program !== e.program ? r.program.id - e.program.id : r.material.id !== e.material.id ? r.material.id - e.material.id : r.z !== e.z ? r.z - e.z : r.id - e.id
	}

	function nf(r, e) {
		return r.groupOrder !== e.groupOrder ? r.groupOrder - e.groupOrder : r.renderOrder !== e.renderOrder ? r.renderOrder - e.renderOrder : r.z !== e.z ? e.z - r.z : r.id - e.id
	}

	function rf(r) {
		let e = [],
			t = 0,
			n = [],
			i = [],
			s = [],
			a = {
				id: -1
			};

		function o() {
			t = 0, n.length = 0, i.length = 0, s.length = 0
		}

		function l(f, p, v, x, g, m) {
			let b = e[t],
				y = r.get(v);
			return b === void 0 ? (b = {
				id: f.id,
				object: f,
				geometry: p,
				material: v,
				program: y.program || a,
				groupOrder: x,
				renderOrder: f.renderOrder,
				z: g,
				group: m
			}, e[t] = b) : (b.id = f.id, b.object = f, b.geometry = p, b.material = v, b.program = y.program || a, b.groupOrder = x, b.renderOrder = f.renderOrder, b.z = g, b.group = m), t++, b
		}

		function c(f, p, v, x, g, m) {
			let b = l(f, p, v, x, g, m);
			v.transmission > 0 ? i.push(b) : v.transparent === !0 ? s.push(b) : n.push(b)
		}

		function u(f, p, v, x, g, m) {
			let b = l(f, p, v, x, g, m);
			v.transmission > 0 ? i.unshift(b) : v.transparent === !0 ? s.unshift(b) : n.unshift(b)
		}

		function h(f, p) {
			n.length > 1 && n.sort(f || Cy), i.length > 1 && i.sort(p || nf), s.length > 1 && s.sort(p || nf)
		}

		function d() {
			for (let f = t, p = e.length; f < p; f++) {
				let v = e[f];
				if (v.id === null) break;
				v.id = null, v.object = null, v.geometry = null, v.material = null, v.program = null, v.group = null
			}
		}
		return {
			opaque: n,
			transmissive: i,
			transparent: s,
			init: o,
			push: c,
			unshift: u,
			finish: d,
			sort: h
		}
	}

	function Dy(r) {
		let e = new WeakMap;

		function t(i, s) {
			let a;
			return e.has(i) === !1 ? (a = new rf(r), e.set(i, [a])) : s >= e.get(i).length ? (a = new rf(r), e.get(i).push(a)) : a = e.get(i)[s], a
		}

		function n() {
			e = new WeakMap
		}
		return {
			get: t,
			dispose: n
		}
	}

	function Ry() {
		let r = {};
		return {
			get: function (e) {
				if (r[e.id] !== void 0) return r[e.id];
				let t;
				switch (e.type) {
					case "DirectionalLight":
						t = {
							direction: new A,
							color: new $
						};
						break;
					case "SpotLight":
						t = {
							position: new A,
							direction: new A,
							color: new $,
							distance: 0,
							coneCos: 0,
							penumbraCos: 0,
							decay: 0
						};
						break;
					case "PointLight":
						t = {
							position: new A,
							color: new $,
							distance: 0,
							decay: 0
						};
						break;
					case "HemisphereLight":
						t = {
							direction: new A,
							skyColor: new $,
							groundColor: new $
						};
						break;
					case "RectAreaLight":
						t = {
							color: new $,
							position: new A,
							halfWidth: new A,
							halfHeight: new A
						};
						break
				}
				return r[e.id] = t, t
			}
		}
	}

	function Py() {
		let r = {};
		return {
			get: function (e) {
				if (r[e.id] !== void 0) return r[e.id];
				let t;
				switch (e.type) {
					case "DirectionalLight":
						t = {
							shadowBias: 0,
							shadowNormalBias: 0,
							shadowRadius: 1,
							shadowMapSize: new O
						};
						break;
					case "SpotLight":
						t = {
							shadowBias: 0,
							shadowNormalBias: 0,
							shadowRadius: 1,
							shadowMapSize: new O
						};
						break;
					case "PointLight":
						t = {
							shadowBias: 0,
							shadowNormalBias: 0,
							shadowRadius: 1,
							shadowMapSize: new O,
							shadowCameraNear: 1,
							shadowCameraFar: 1e3
						};
						break
				}
				return r[e.id] = t, t
			}
		}
	}
	var Ly = 0;

	function Iy(r, e) {
		return (e.castShadow ? 1 : 0) - (r.castShadow ? 1 : 0)
	}

	function By(r, e) {
		let t = new Ry,
			n = Py(),
			i = {
				version: 0,
				hash: {
					directionalLength: -1,
					pointLength: -1,
					spotLength: -1,
					rectAreaLength: -1,
					hemiLength: -1,
					numDirectionalShadows: -1,
					numPointShadows: -1,
					numSpotShadows: -1
				},
				ambient: [0, 0, 0],
				probe: [],
				directional: [],
				directionalShadow: [],
				directionalShadowMap: [],
				directionalShadowMatrix: [],
				spot: [],
				spotShadow: [],
				spotShadowMap: [],
				spotShadowMatrix: [],
				rectArea: [],
				rectAreaLTC1: null,
				rectAreaLTC2: null,
				point: [],
				pointShadow: [],
				pointShadowMap: [],
				pointShadowMatrix: [],
				hemi: []
			};
		for (let u = 0; u < 9; u++) i.probe.push(new A);
		let s = new A,
			a = new ge,
			o = new ge;

		function l(u, h) {
			let d = 0,
				f = 0,
				p = 0;
			for (let I = 0; I < 9; I++) i.probe[I].set(0, 0, 0);
			let v = 0,
				x = 0,
				g = 0,
				m = 0,
				b = 0,
				y = 0,
				E = 0,
				_ = 0;
			u.sort(Iy);
			let w = h !== !0 ? Math.PI : 1;
			for (let I = 0, L = u.length; I < L; I++) {
				let R = u[I],
					Z = R.color,
					F = R.intensity,
					U = R.distance,
					z = R.shadow && R.shadow.map ? R.shadow.map.texture : null;
				if (R.isAmbientLight) d += Z.r * F * w, f += Z.g * F * w, p += Z.b * F * w;
				else if (R.isLightProbe)
					for (let N = 0; N < 9; N++) i.probe[N].addScaledVector(R.sh.coefficients[N], F);
				else if (R.isDirectionalLight) {
					let N = t.get(R);
					if (N.color.copy(R.color).multiplyScalar(R.intensity * w), R.castShadow) {
						let G = R.shadow,
							ne = n.get(R);
						ne.shadowBias = G.bias, ne.shadowNormalBias = G.normalBias, ne.shadowRadius = G.radius, ne.shadowMapSize = G.mapSize, i.directionalShadow[v] = ne, i.directionalShadowMap[v] = z, i.directionalShadowMatrix[v] = R.shadow.matrix, y++
					}
					i.directional[v] = N, v++
				} else if (R.isSpotLight) {
					let N = t.get(R);
					if (N.position.setFromMatrixPosition(R.matrixWorld), N.color.copy(Z).multiplyScalar(F * w), N.distance = U, N.coneCos = Math.cos(R.angle), N.penumbraCos = Math.cos(R.angle * (1 - R.penumbra)), N.decay = R.decay, R.castShadow) {
						let G = R.shadow,
							ne = n.get(R);
						ne.shadowBias = G.bias, ne.shadowNormalBias = G.normalBias, ne.shadowRadius = G.radius, ne.shadowMapSize = G.mapSize, i.spotShadow[g] = ne, i.spotShadowMap[g] = z, i.spotShadowMatrix[g] = R.shadow.matrix, _++
					}
					i.spot[g] = N, g++
				} else if (R.isRectAreaLight) {
					let N = t.get(R);
					N.color.copy(Z).multiplyScalar(F), N.halfWidth.set(R.width * .5, 0, 0), N.halfHeight.set(0, R.height * .5, 0), i.rectArea[m] = N, m++
				} else if (R.isPointLight) {
					let N = t.get(R);
					if (N.color.copy(R.color).multiplyScalar(R.intensity * w), N.distance = R.distance, N.decay = R.decay, R.castShadow) {
						let G = R.shadow,
							ne = n.get(R);
						ne.shadowBias = G.bias, ne.shadowNormalBias = G.normalBias, ne.shadowRadius = G.radius, ne.shadowMapSize = G.mapSize, ne.shadowCameraNear = G.camera.near, ne.shadowCameraFar = G.camera.far, i.pointShadow[x] = ne, i.pointShadowMap[x] = z, i.pointShadowMatrix[x] = R.shadow.matrix, E++
					}
					i.point[x] = N, x++
				} else if (R.isHemisphereLight) {
					let N = t.get(R);
					N.skyColor.copy(R.color).multiplyScalar(F * w), N.groundColor.copy(R.groundColor).multiplyScalar(F * w), i.hemi[b] = N, b++
				}
			}
			m > 0 && (e.isWebGL2 || r.has("OES_texture_float_linear") === !0 ? (i.rectAreaLTC1 = se.LTC_FLOAT_1, i.rectAreaLTC2 = se.LTC_FLOAT_2) : r.has("OES_texture_half_float_linear") === !0 ? (i.rectAreaLTC1 = se.LTC_HALF_1, i.rectAreaLTC2 = se.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")), i.ambient[0] = d, i.ambient[1] = f, i.ambient[2] = p;
			let D = i.hash;
			(D.directionalLength !== v || D.pointLength !== x || D.spotLength !== g || D.rectAreaLength !== m || D.hemiLength !== b || D.numDirectionalShadows !== y || D.numPointShadows !== E || D.numSpotShadows !== _) && (i.directional.length = v, i.spot.length = g, i.rectArea.length = m, i.point.length = x, i.hemi.length = b, i.directionalShadow.length = y, i.directionalShadowMap.length = y, i.pointShadow.length = E, i.pointShadowMap.length = E, i.spotShadow.length = _, i.spotShadowMap.length = _, i.directionalShadowMatrix.length = y, i.pointShadowMatrix.length = E, i.spotShadowMatrix.length = _, D.directionalLength = v, D.pointLength = x, D.spotLength = g, D.rectAreaLength = m, D.hemiLength = b, D.numDirectionalShadows = y, D.numPointShadows = E, D.numSpotShadows = _, i.version = Ly++)
		}

		function c(u, h) {
			let d = 0,
				f = 0,
				p = 0,
				v = 0,
				x = 0,
				g = h.matrixWorldInverse;
			for (let m = 0, b = u.length; m < b; m++) {
				let y = u[m];
				if (y.isDirectionalLight) {
					let E = i.directional[d];
					E.direction.setFromMatrixPosition(y.matrixWorld), s.setFromMatrixPosition(y.target.matrixWorld), E.direction.sub(s), E.direction.transformDirection(g), d++
				} else if (y.isSpotLight) {
					let E = i.spot[p];
					E.position.setFromMatrixPosition(y.matrixWorld), E.position.applyMatrix4(g), E.direction.setFromMatrixPosition(y.matrixWorld), s.setFromMatrixPosition(y.target.matrixWorld), E.direction.sub(s), E.direction.transformDirection(g), p++
				} else if (y.isRectAreaLight) {
					let E = i.rectArea[v];
					E.position.setFromMatrixPosition(y.matrixWorld), E.position.applyMatrix4(g), o.identity(), a.copy(y.matrixWorld), a.premultiply(g), o.extractRotation(a), E.halfWidth.set(y.width * .5, 0, 0), E.halfHeight.set(0, y.height * .5, 0), E.halfWidth.applyMatrix4(o), E.halfHeight.applyMatrix4(o), v++
				} else if (y.isPointLight) {
					let E = i.point[f];
					E.position.setFromMatrixPosition(y.matrixWorld), E.position.applyMatrix4(g), f++
				} else if (y.isHemisphereLight) {
					let E = i.hemi[x];
					E.direction.setFromMatrixPosition(y.matrixWorld), E.direction.transformDirection(g), E.direction.normalize(), x++
				}
			}
		}
		return {
			setup: l,
			setupView: c,
			state: i
		}
	}

	function sf(r, e) {
		let t = new By(r, e),
			n = [],
			i = [];

		function s() {
			n.length = 0, i.length = 0
		}

		function a(h) {
			n.push(h)
		}

		function o(h) {
			i.push(h)
		}

		function l(h) {
			t.setup(n, h)
		}

		function c(h) {
			t.setupView(n, h)
		}
		return {
			init: s,
			state: {
				lightsArray: n,
				shadowsArray: i,
				lights: t
			},
			setupLights: l,
			setupLightsView: c,
			pushLight: a,
			pushShadow: o
		}
	}

	function Uy(r, e) {
		let t = new WeakMap;

		function n(s, a = 0) {
			let o;
			return t.has(s) === !1 ? (o = new sf(r, e), t.set(s, [o])) : a >= t.get(s).length ? (o = new sf(r, e), t.get(s).push(o)) : o = t.get(s)[a], o
		}

		function i() {
			t = new WeakMap
		}
		return {
			get: n,
			dispose: i
		}
	}
	var Vs = class extends tt {
		constructor(e) {
			super();
			this.type = "MeshDepthMaterial", this.depthPacking = cn, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.setValues(e)
		}
		copy(e) {
			return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this
		}
	};
	Vs.prototype.isMeshDepthMaterial = !0;
	var Ws = class extends tt {
		constructor(e) {
			super();
			this.type = "MeshDistanceMaterial", this.referencePosition = new A, this.nearDistance = 1, this.farDistance = 1e3, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.fog = !1, this.setValues(e)
		}
		copy(e) {
			return super.copy(e), this.referencePosition.copy(e.referencePosition), this.nearDistance = e.nearDistance, this.farDistance = e.farDistance, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this
		}
	};
	Ws.prototype.isMeshDistanceMaterial = !0;
	var Fy = `void main() {
	gl_Position = vec4( position, 1.0 );
}`,
		Oy = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;

	function af(r, e, t) {
		let n = new Rr,
			i = new O,
			s = new O,
			a = new Ve,
			o = new Vs({
				depthPacking: od
			}),
			l = new Ws,
			c = {},
			u = t.maxTextureSize,
			h = {
				0: Qe,
				1: Rn,
				2: Ht
			},
			d = new Ye({
				defines: {
					VSM_SAMPLES: 8
				},
				uniforms: {
					shadow_pass: {
						value: null
					},
					resolution: {
						value: new O
					},
					radius: {
						value: 4
					}
				},
				vertexShader: Fy,
				fragmentShader: Oy
			}),
			f = d.clone();
		f.defines.HORIZONTAL_PASS = 1;
		let p = new de;
		p.setAttribute("position", new pe(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3));
		let v = new ze(p, d),
			x = this;
		this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = al, this.render = function (y, E, _) {
			if (x.enabled === !1 || x.autoUpdate === !1 && x.needsUpdate === !1 || y.length === 0) return;
			let w = r.getRenderTarget(),
				D = r.getActiveCubeFace(),
				I = r.getActiveMipmapLevel(),
				L = r.state;
			L.setBlending(xt), L.buffers.color.setClear(1, 1, 1, 1), L.buffers.depth.setTest(!0), L.setScissorTest(!1);
			for (let R = 0, Z = y.length; R < Z; R++) {
				let F = y[R],
					U = F.shadow;
				if (U === void 0) {
					console.warn("THREE.WebGLShadowMap:", F, "has no shadow.");
					continue
				}
				if (U.autoUpdate === !1 && U.needsUpdate === !1) continue;
				i.copy(U.mapSize);
				let z = U.getFrameExtents();
				if (i.multiply(z), s.copy(U.mapSize), (i.x > u || i.y > u) && (i.x > u && (s.x = Math.floor(u / z.x), i.x = s.x * z.x, U.mapSize.x = s.x), i.y > u && (s.y = Math.floor(u / z.y), i.y = s.y * z.y, U.mapSize.y = s.y)), U.map === null && !U.isPointLightShadow && this.type === ur) {
					let G = {
						minFilter: et,
						magFilter: et,
						format: Tt
					};
					U.map = new We(i.x, i.y, G), U.map.texture.name = F.name + ".shadowMap", U.mapPass = new We(i.x, i.y, G), U.camera.updateProjectionMatrix()
				}
				if (U.map === null) {
					let G = {
						minFilter: At,
						magFilter: At,
						format: Tt
					};
					U.map = new We(i.x, i.y, G), U.map.texture.name = F.name + ".shadowMap", U.camera.updateProjectionMatrix()
				}
				r.setRenderTarget(U.map), r.clear();
				let N = U.getViewportCount();
				for (let G = 0; G < N; G++) {
					let ne = U.getViewport(G);
					a.set(s.x * ne.x, s.y * ne.y, s.x * ne.z, s.y * ne.w), L.viewport(a), U.updateMatrices(F, G), n = U.getFrustum(), b(E, _, U.camera, F, this.type)
				} !U.isPointLightShadow && this.type === ur && g(U, _), U.needsUpdate = !1
			}
			x.needsUpdate = !1, r.setRenderTarget(w, D, I)
		};

		function g(y, E) {
			let _ = e.update(v);
			d.defines.VSM_SAMPLES !== y.blurSamples && (d.defines.VSM_SAMPLES = y.blurSamples, f.defines.VSM_SAMPLES = y.blurSamples, d.needsUpdate = !0, f.needsUpdate = !0), d.uniforms.shadow_pass.value = y.map.texture, d.uniforms.resolution.value = y.mapSize, d.uniforms.radius.value = y.radius, r.setRenderTarget(y.mapPass), r.clear(), r.renderBufferDirect(E, null, _, d, v, null), f.uniforms.shadow_pass.value = y.mapPass.texture, f.uniforms.resolution.value = y.mapSize, f.uniforms.radius.value = y.radius, r.setRenderTarget(y.map), r.clear(), r.renderBufferDirect(E, null, _, f, v, null)
		}

		function m(y, E, _, w, D, I, L) {
			let R = null,
				Z = w.isPointLight === !0 ? y.customDistanceMaterial : y.customDepthMaterial;
			if (Z !== void 0 ? R = Z : R = w.isPointLight === !0 ? l : o, r.localClippingEnabled && _.clipShadows === !0 && _.clippingPlanes.length !== 0 || _.displacementMap && _.displacementScale !== 0 || _.alphaMap && _.alphaTest > 0) {
				let F = R.uuid,
					U = _.uuid,
					z = c[F];
				z === void 0 && (z = {}, c[F] = z);
				let N = z[U];
				N === void 0 && (N = R.clone(), z[U] = N), R = N
			}
			return R.visible = _.visible, R.wireframe = _.wireframe, L === ur ? R.side = _.shadowSide !== null ? _.shadowSide : _.side : R.side = _.shadowSide !== null ? _.shadowSide : h[_.side], R.alphaMap = _.alphaMap, R.alphaTest = _.alphaTest, R.clipShadows = _.clipShadows, R.clippingPlanes = _.clippingPlanes, R.clipIntersection = _.clipIntersection, R.displacementMap = _.displacementMap, R.displacementScale = _.displacementScale, R.displacementBias = _.displacementBias, R.wireframeLinewidth = _.wireframeLinewidth, R.linewidth = _.linewidth, w.isPointLight === !0 && R.isMeshDistanceMaterial === !0 && (R.referencePosition.setFromMatrixPosition(w.matrixWorld), R.nearDistance = D, R.farDistance = I), R
		}

		function b(y, E, _, w, D) {
			if (y.visible === !1) return;
			if (y.layers.test(E.layers) && (y.isMesh || y.isLine || y.isPoints) && (y.castShadow || y.receiveShadow && D === ur) && (!y.frustumCulled || n.intersectsObject(y))) {
				y.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse, y.matrixWorld);
				let R = e.update(y),
					Z = y.material;
				if (Array.isArray(Z)) {
					let F = R.groups;
					for (let U = 0, z = F.length; U < z; U++) {
						let N = F[U],
							G = Z[N.materialIndex];
						if (G && G.visible) {
							let ne = m(y, R, G, w, _.near, _.far, D);
							r.renderBufferDirect(_, null, R, ne, y, N)
						}
					}
				} else if (Z.visible) {
					let F = m(y, R, Z, w, _.near, _.far, D);
					r.renderBufferDirect(_, null, R, F, y, null)
				}
			}
			let L = y.children;
			for (let R = 0, Z = L.length; R < Z; R++) b(L[R], E, _, w, D)
		}
	}

	function Ny(r, e, t) {
		let n = t.isWebGL2;

		function i() {
			let P = !1,
				ie = new Ve,
				T = null,
				V = new Ve(0, 0, 0, 0);
			return {
				setMask: function (K) {
					T !== K && !P && (r.colorMask(K, K, K, K), T = K)
				},
				setLocked: function (K) {
					P = K
				},
				setClear: function (K, re, le, Ee, $e) {
					$e === !0 && (K *= Ee, re *= Ee, le *= Ee), ie.set(K, re, le, Ee), V.equals(ie) === !1 && (r.clearColor(K, re, le, Ee), V.copy(ie))
				},
				reset: function () {
					P = !1, T = null, V.set(-1, 0, 0, 0)
				}
			}
		}

		function s() {
			let P = !1,
				ie = null,
				T = null,
				V = null;
			return {
				setTest: function (K) {
					K ? oe(2929) : ve(2929)
				},
				setMask: function (K) {
					ie !== K && !P && (r.depthMask(K), ie = K)
				},
				setFunc: function (K) {
					if (T !== K) {
						if (K) switch (K) {
							case Ju:
								r.depthFunc(512);
								break;
							case Ku:
								r.depthFunc(519);
								break;
							case $u:
								r.depthFunc(513);
								break;
							case va:
								r.depthFunc(515);
								break;
							case eh:
								r.depthFunc(514);
								break;
							case th:
								r.depthFunc(518);
								break;
							case nh:
								r.depthFunc(516);
								break;
							case ih:
								r.depthFunc(517);
								break;
							default:
								r.depthFunc(515)
						} else r.depthFunc(515);
						T = K
					}
				},
				setLocked: function (K) {
					P = K
				},
				setClear: function (K) {
					V !== K && (r.clearDepth(K), V = K)
				},
				reset: function () {
					P = !1, ie = null, T = null, V = null
				}
			}
		}

		function a() {
			let P = !1,
				ie = null,
				T = null,
				V = null,
				K = null,
				re = null,
				le = null,
				Ee = null,
				$e = null;
			return {
				setTest: function (Ne) {
					P || (Ne ? oe(2960) : ve(2960))
				},
				setMask: function (Ne) {
					ie !== Ne && !P && (r.stencilMask(Ne), ie = Ne)
				},
				setFunc: function (Ne, gt, vt) {
					(T !== Ne || V !== gt || K !== vt) && (r.stencilFunc(Ne, gt, vt), T = Ne, V = gt, K = vt)
				},
				setOp: function (Ne, gt, vt) {
					(re !== Ne || le !== gt || Ee !== vt) && (r.stencilOp(Ne, gt, vt), re = Ne, le = gt, Ee = vt)
				},
				setLocked: function (Ne) {
					P = Ne
				},
				setClear: function (Ne) {
					$e !== Ne && (r.clearStencil(Ne), $e = Ne)
				},
				reset: function () {
					P = !1, ie = null, T = null, V = null, K = null, re = null, le = null, Ee = null, $e = null
				}
			}
		}
		let o = new i,
			l = new s,
			c = new a,
			u = {},
			h = {},
			d = null,
			f = !1,
			p = null,
			v = null,
			x = null,
			g = null,
			m = null,
			b = null,
			y = null,
			E = !1,
			_ = null,
			w = null,
			D = null,
			I = null,
			L = null,
			R = r.getParameter(35661),
			Z = !1,
			F = 0,
			U = r.getParameter(7938);
		U.indexOf("WebGL") !== -1 ? (F = parseFloat(/^WebGL (\d)/.exec(U)[1]), Z = F >= 1) : U.indexOf("OpenGL ES") !== -1 && (F = parseFloat(/^OpenGL ES (\d)/.exec(U)[1]), Z = F >= 2);
		let z = null,
			N = {},
			G = r.getParameter(3088),
			ne = r.getParameter(2978),
			fe = new Ve().fromArray(G),
			Y = new Ve().fromArray(ne);

		function j(P, ie, T) {
			let V = new Uint8Array(4),
				K = r.createTexture();
			r.bindTexture(P, K), r.texParameteri(P, 10241, 9728), r.texParameteri(P, 10240, 9728);
			for (let re = 0; re < T; re++) r.texImage2D(ie + re, 0, 6408, 1, 1, 0, 6408, 5121, V);
			return K
		}
		let ue = {};
		ue[3553] = j(3553, 3553, 1), ue[34067] = j(34067, 34069, 6), o.setClear(0, 0, 0, 1), l.setClear(1), c.setClear(0), oe(2929), l.setFunc(va), Ue(!1), W(sl), oe(2884), xe(xt);

		function oe(P) {
			u[P] !== !0 && (r.enable(P), u[P] = !0)
		}

		function ve(P) {
			u[P] !== !1 && (r.disable(P), u[P] = !1)
		}

		function Oe(P, ie) {
			return h[P] !== ie ? (r.bindFramebuffer(P, ie), h[P] = ie, n && (P === 36009 && (h[36160] = ie), P === 36160 && (h[36009] = ie)), !0) : !1
		}

		function J(P) {
			return d !== P ? (r.useProgram(P), d = P, !0) : !1
		}
		let Re = {
			[Ci]: 32774,
			[zu]: 32778,
			[Gu]: 32779
		};
		if (n) Re[ul] = 32775, Re[hl] = 32776;
		else {
			let P = e.get("EXT_blend_minmax");
			P !== null && (Re[ul] = P.MIN_EXT, Re[hl] = P.MAX_EXT)
		}
		let be = {
			[ku]: 0,
			[Vu]: 1,
			[Wu]: 768,
			[dl]: 770,
			[Zu]: 776,
			[Qu]: 774,
			[ju]: 772,
			[Yu]: 769,
			[fl]: 771,
			[qu]: 775,
			[Xu]: 773
		};

		function xe(P, ie, T, V, K, re, le, Ee) {
			if (P === xt) {
				f === !0 && (ve(3042), f = !1);
				return
			}
			if (f === !1 && (oe(3042), f = !0), P !== Hu) {
				if (P !== p || Ee !== E) {
					if ((v !== Ci || m !== Ci) && (r.blendEquation(32774), v = Ci, m = Ci), Ee) switch (P) {
						case hr:
							r.blendFuncSeparate(1, 771, 1, 771);
							break;
						case Ti:
							r.blendFunc(1, 1);
							break;
						case ll:
							r.blendFuncSeparate(0, 0, 769, 771);
							break;
						case cl:
							r.blendFuncSeparate(0, 768, 0, 770);
							break;
						default:
							console.error("THREE.WebGLState: Invalid blending: ", P);
							break
					} else switch (P) {
						case hr:
							r.blendFuncSeparate(770, 771, 1, 771);
							break;
						case Ti:
							r.blendFunc(770, 1);
							break;
						case ll:
							r.blendFunc(0, 769);
							break;
						case cl:
							r.blendFunc(0, 768);
							break;
						default:
							console.error("THREE.WebGLState: Invalid blending: ", P);
							break
					}
					x = null, g = null, b = null, y = null, p = P, E = Ee
				}
				return
			}
			K = K || ie, re = re || T, le = le || V, (ie !== v || K !== m) && (r.blendEquationSeparate(Re[ie], Re[K]), v = ie, m = K), (T !== x || V !== g || re !== b || le !== y) && (r.blendFuncSeparate(be[T], be[V], be[re], be[le]), x = T, g = V, b = re, y = le), p = P, E = null
		}

		function we(P, ie) {
			P.side === Ht ? ve(2884) : oe(2884);
			let T = P.side === Qe;
			ie && (T = !T), Ue(T), P.blending === hr && P.transparent === !1 ? xe(xt) : xe(P.blending, P.blendEquation, P.blendSrc, P.blendDst, P.blendEquationAlpha, P.blendSrcAlpha, P.blendDstAlpha, P.premultipliedAlpha), l.setFunc(P.depthFunc), l.setTest(P.depthTest), l.setMask(P.depthWrite), o.setMask(P.colorWrite);
			let V = P.stencilWrite;
			c.setTest(V), V && (c.setMask(P.stencilWriteMask), c.setFunc(P.stencilFunc, P.stencilRef, P.stencilFuncMask), c.setOp(P.stencilFail, P.stencilZFail, P.stencilZPass)), te(P.polygonOffset, P.polygonOffsetFactor, P.polygonOffsetUnits), P.alphaToCoverage === !0 ? oe(32926) : ve(32926)
		}

		function Ue(P) {
			_ !== P && (P ? r.frontFace(2304) : r.frontFace(2305), _ = P)
		}

		function W(P) {
			P !== Fu ? (oe(2884), P !== w && (P === sl ? r.cullFace(1029) : P === Ou ? r.cullFace(1028) : r.cullFace(1032))) : ve(2884), w = P
		}

		function ee(P) {
			P !== D && (Z && r.lineWidth(P), D = P)
		}

		function te(P, ie, T) {
			P ? (oe(32823), (I !== ie || L !== T) && (r.polygonOffset(ie, T), I = ie, L = T)) : ve(32823)
		}

		function he(P) {
			P ? oe(3089) : ve(3089)
		}

		function ae(P) {
			P === void 0 && (P = 33984 + R - 1), z !== P && (r.activeTexture(P), z = P)
		}

		function Me(P, ie) {
			z === null && ae();
			let T = N[z];
			T === void 0 && (T = {
				type: void 0,
				texture: void 0
			}, N[z] = T), (T.type !== P || T.texture !== ie) && (r.bindTexture(P, ie || ue[P]), T.type = P, T.texture = ie)
		}

		function Se() {
			let P = N[z];
			P !== void 0 && P.type !== void 0 && (r.bindTexture(P.type, null), P.type = void 0, P.texture = void 0)
		}

		function Pe() {
			try {
				r.compressedTexImage2D.apply(r, arguments)
			} catch (P) {
				console.error("THREE.WebGLState:", P)
			}
		}

		function Je() {
			try {
				r.texSubImage2D.apply(r, arguments)
			} catch (P) {
				console.error("THREE.WebGLState:", P)
			}
		}

		function C() {
			try {
				r.texStorage2D.apply(r, arguments)
			} catch (P) {
				console.error("THREE.WebGLState:", P)
			}
		}

		function S() {
			try {
				r.texImage2D.apply(r, arguments)
			} catch (P) {
				console.error("THREE.WebGLState:", P)
			}
		}

		function q() {
			try {
				r.texImage3D.apply(r, arguments)
			} catch (P) {
				console.error("THREE.WebGLState:", P)
			}
		}

		function Q(P) {
			fe.equals(P) === !1 && (r.scissor(P.x, P.y, P.z, P.w), fe.copy(P))
		}

		function ye(P) {
			Y.equals(P) === !1 && (r.viewport(P.x, P.y, P.z, P.w), Y.copy(P))
		}

		function me() {
			r.disable(3042), r.disable(2884), r.disable(2929), r.disable(32823), r.disable(3089), r.disable(2960), r.disable(32926), r.blendEquation(32774), r.blendFunc(1, 0), r.blendFuncSeparate(1, 0, 1, 0), r.colorMask(!0, !0, !0, !0), r.clearColor(0, 0, 0, 0), r.depthMask(!0), r.depthFunc(513), r.clearDepth(1), r.stencilMask(4294967295), r.stencilFunc(519, 0, 4294967295), r.stencilOp(7680, 7680, 7680), r.clearStencil(0), r.cullFace(1029), r.frontFace(2305), r.polygonOffset(0, 0), r.activeTexture(33984), r.bindFramebuffer(36160, null), n === !0 && (r.bindFramebuffer(36009, null), r.bindFramebuffer(36008, null)), r.useProgram(null), r.lineWidth(1), r.scissor(0, 0, r.canvas.width, r.canvas.height), r.viewport(0, 0, r.canvas.width, r.canvas.height), u = {}, z = null, N = {}, h = {}, d = null, f = !1, p = null, v = null, x = null, g = null, m = null, b = null, y = null, E = !1, _ = null, w = null, D = null, I = null, L = null, fe.set(0, 0, r.canvas.width, r.canvas.height), Y.set(0, 0, r.canvas.width, r.canvas.height), o.reset(), l.reset(), c.reset()
		}
		return {
			buffers: {
				color: o,
				depth: l,
				stencil: c
			},
			enable: oe,
			disable: ve,
			bindFramebuffer: Oe,
			useProgram: J,
			setBlending: xe,
			setMaterial: we,
			setFlipSided: Ue,
			setCullFace: W,
			setLineWidth: ee,
			setPolygonOffset: te,
			setScissorTest: he,
			activeTexture: ae,
			bindTexture: Me,
			unbindTexture: Se,
			compressedTexImage2D: Pe,
			texImage2D: S,
			texImage3D: q,
			texStorage2D: C,
			texSubImage2D: Je,
			scissor: Q,
			viewport: ye,
			reset: me
		}
	}

	function Hy(r, e, t, n, i, s, a) {
		let o = i.isWebGL2,
			l = i.maxTextures,
			c = i.maxCubemapSize,
			u = i.maxTextureSize,
			h = i.maxSamples,
			f = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : void 0,
			p = new WeakMap,
			v, x = !1;
		try {
			x = typeof OffscreenCanvas != "undefined" && new OffscreenCanvas(1, 1).getContext("2d") !== null
		} catch (C) { }

		function g(C, S) {
			return x ? new OffscreenCanvas(C, S) : Ta("canvas")
		}

		function m(C, S, q, Q) {
			let ye = 1;
			if ((C.width > Q || C.height > Q) && (ye = Q / Math.max(C.width, C.height)), ye < 1 || S === !0)
				if (typeof HTMLImageElement != "undefined" && C instanceof HTMLImageElement || typeof HTMLCanvasElement != "undefined" && C instanceof HTMLCanvasElement || typeof ImageBitmap != "undefined" && C instanceof ImageBitmap) {
					let me = S ? hd : Math.floor,
						P = me(ye * C.width),
						ie = me(ye * C.height);
					v === void 0 && (v = g(P, ie));
					let T = q ? g(P, ie) : v;
					return T.width = P, T.height = ie, T.getContext("2d").drawImage(C, 0, 0, P, ie), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + C.width + "x" + C.height + ") to (" + P + "x" + ie + ")."), T
				} else return "data" in C && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + C.width + "x" + C.height + ")."), C;
			return C
		}

		function b(C) {
			return Pl(C.width) && Pl(C.height)
		}

		function y(C) {
			return o ? !1 : C.wrapS !== _t || C.wrapT !== _t || C.minFilter !== At && C.minFilter !== et
		}

		function E(C, S) {
			return C.generateMipmaps && S && C.minFilter !== At && C.minFilter !== et
		}

		function _(C) {
			r.generateMipmap(C)
		}

		function w(C, S, q) {
			if (o === !1) return S;
			if (C !== null) {
				if (r[C] !== void 0) return r[C];
				console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + C + "'")
			}
			let Q = S;
			return S === 6403 && (q === 5126 && (Q = 33326), q === 5131 && (Q = 33325), q === 5121 && (Q = 33321)), S === 6407 && (q === 5126 && (Q = 34837), q === 5131 && (Q = 34843), q === 5121 && (Q = 32849)), S === 6408 && (q === 5126 && (Q = 34836), q === 5131 && (Q = 34842), q === 5121 && (Q = 32856)), (Q === 33325 || Q === 33326 || Q === 34842 || Q === 34836) && e.get("EXT_color_buffer_float"), Q
		}

		function D(C, S, q) {
			return E(C, q) === !0 ? Math.log2(Math.max(S.width, S.height)) + 1 : C.mipmaps.length > 0 ? C.mipmaps.length : 1
		}

		function I(C) {
			return C === At || C === ya || C === wa ? 9728 : 9729
		}

		function L(C) {
			let S = C.target;
			S.removeEventListener("dispose", L), Z(S), S.isVideoTexture && p.delete(S), a.memory.textures--
		}

		function R(C) {
			let S = C.target;
			S.removeEventListener("dispose", R), F(S)
		}

		function Z(C) {
			let S = n.get(C);
			S.__webglInit !== void 0 && (r.deleteTexture(S.__webglTexture), n.remove(C))
		}

		function F(C) {
			let S = C.texture,
				q = n.get(C),
				Q = n.get(S);
			if (!!C) {
				if (Q.__webglTexture !== void 0 && (r.deleteTexture(Q.__webglTexture), a.memory.textures--), C.depthTexture && C.depthTexture.dispose(), C.isWebGLCubeRenderTarget)
					for (let ye = 0; ye < 6; ye++) r.deleteFramebuffer(q.__webglFramebuffer[ye]), q.__webglDepthbuffer && r.deleteRenderbuffer(q.__webglDepthbuffer[ye]);
				else r.deleteFramebuffer(q.__webglFramebuffer), q.__webglDepthbuffer && r.deleteRenderbuffer(q.__webglDepthbuffer), q.__webglMultisampledFramebuffer && r.deleteFramebuffer(q.__webglMultisampledFramebuffer), q.__webglColorRenderbuffer && r.deleteRenderbuffer(q.__webglColorRenderbuffer), q.__webglDepthRenderbuffer && r.deleteRenderbuffer(q.__webglDepthRenderbuffer);
				if (C.isWebGLMultipleRenderTargets)
					for (let ye = 0, me = S.length; ye < me; ye++) {
						let P = n.get(S[ye]);
						P.__webglTexture && (r.deleteTexture(P.__webglTexture), a.memory.textures--), n.remove(S[ye])
					}
				n.remove(S), n.remove(C)
			}
		}
		let U = 0;

		function z() {
			U = 0
		}

		function N() {
			let C = U;
			return C >= l && console.warn("THREE.WebGLTextures: Trying to use " + C + " texture units while this GPU supports only " + l), U += 1, C
		}

		function G(C, S) {
			let q = n.get(C);
			if (C.isVideoTexture && ae(C), C.version > 0 && q.__version !== C.version) {
				let Q = C.image;
				if (Q === void 0) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");
				else if (Q.complete === !1) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
				else {
					Oe(q, C, S);
					return
				}
			}
			t.activeTexture(33984 + S), t.bindTexture(3553, q.__webglTexture)
		}

		function ne(C, S) {
			let q = n.get(C);
			if (C.version > 0 && q.__version !== C.version) {
				Oe(q, C, S);
				return
			}
			t.activeTexture(33984 + S), t.bindTexture(35866, q.__webglTexture)
		}

		function fe(C, S) {
			let q = n.get(C);
			if (C.version > 0 && q.__version !== C.version) {
				Oe(q, C, S);
				return
			}
			t.activeTexture(33984 + S), t.bindTexture(32879, q.__webglTexture)
		}

		function Y(C, S) {
			let q = n.get(C);
			if (C.version > 0 && q.__version !== C.version) {
				J(q, C, S);
				return
			}
			t.activeTexture(33984 + S), t.bindTexture(34067, q.__webglTexture)
		}
		let j = {
			[Ms]: 10497,
			[_t]: 33071,
			[Ss]: 33648
		},
			ue = {
				[At]: 9728,
				[ya]: 9984,
				[wa]: 9986,
				[et]: 9729,
				[pl]: 9985,
				[Pi]: 9987
			};

		function oe(C, S, q) {
			if (q ? (r.texParameteri(C, 10242, j[S.wrapS]), r.texParameteri(C, 10243, j[S.wrapT]), (C === 32879 || C === 35866) && r.texParameteri(C, 32882, j[S.wrapR]), r.texParameteri(C, 10240, ue[S.magFilter]), r.texParameteri(C, 10241, ue[S.minFilter])) : (r.texParameteri(C, 10242, 33071), r.texParameteri(C, 10243, 33071), (C === 32879 || C === 35866) && r.texParameteri(C, 32882, 33071), (S.wrapS !== _t || S.wrapT !== _t) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), r.texParameteri(C, 10240, I(S.magFilter)), r.texParameteri(C, 10241, I(S.minFilter)), S.minFilter !== At && S.minFilter !== et && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), e.has("EXT_texture_filter_anisotropic") === !0) {
				let Q = e.get("EXT_texture_filter_anisotropic");
				if (S.type === ln && e.has("OES_texture_float_linear") === !1 || o === !1 && S.type === Ii && e.has("OES_texture_half_float_linear") === !1) return;
				(S.anisotropy > 1 || n.get(S).__currentAnisotropy) && (r.texParameterf(C, Q.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(S.anisotropy, i.getMaxAnisotropy())), n.get(S).__currentAnisotropy = S.anisotropy)
			}
		}

		function ve(C, S) {
			C.__webglInit === void 0 && (C.__webglInit = !0, S.addEventListener("dispose", L), C.__webglTexture = r.createTexture(), a.memory.textures++)
		}

		function Oe(C, S, q) {
			let Q = 3553;
			S.isDataTexture2DArray && (Q = 35866), S.isDataTexture3D && (Q = 32879), ve(C, S), t.activeTexture(33984 + q), t.bindTexture(Q, C.__webglTexture), r.pixelStorei(37440, S.flipY), r.pixelStorei(37441, S.premultiplyAlpha), r.pixelStorei(3317, S.unpackAlignment), r.pixelStorei(37443, 0);
			let ye = y(S) && b(S.image) === !1,
				me = m(S.image, ye, !1, u),
				P = b(me) || o,
				ie = s.convert(S.format),
				T = s.convert(S.type),
				V = w(S.internalFormat, ie, T, S.encoding);
			oe(Q, S, P);
			let K, re = S.mipmaps;
			if (S.isDepthTexture) V = 6402, o ? S.type === ln ? V = 36012 : S.type === Li ? V = 33190 : S.type === Pn ? V = 35056 : V = 33189 : S.type === ln && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), S.format === Jn && V === 6402 && S.type !== fr && S.type !== Li && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), S.type = fr, T = s.convert(S.type)), S.format === Ln && V === 6402 && (V = 34041, S.type !== Pn && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), S.type = Pn, T = s.convert(S.type))), t.texImage2D(3553, 0, V, me.width, me.height, 0, ie, T, null);
			else if (S.isDataTexture)
				if (re.length > 0 && P) {
					for (let le = 0, Ee = re.length; le < Ee; le++) K = re[le], t.texImage2D(3553, le, V, K.width, K.height, 0, ie, T, K.data);
					S.generateMipmaps = !1
				} else t.texImage2D(3553, 0, V, me.width, me.height, 0, ie, T, me.data);
			else if (S.isCompressedTexture)
				for (let le = 0, Ee = re.length; le < Ee; le++) K = re[le], S.format !== Tt && S.format !== Zn ? ie !== null ? t.compressedTexImage2D(3553, le, V, K.width, K.height, 0, K.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : t.texImage2D(3553, le, V, K.width, K.height, 0, ie, T, K.data);
			else if (S.isDataTexture2DArray) t.texImage3D(35866, 0, V, me.width, me.height, me.depth, 0, ie, T, me.data);
			else if (S.isDataTexture3D) t.texImage3D(32879, 0, V, me.width, me.height, me.depth, 0, ie, T, me.data);
			else {
				let le = D(S, me, P),
					Ee = o && S.isVideoTexture !== !0,
					$e = C.__version === void 0;
				if (re.length > 0 && P) {
					Ee && $e && t.texStorage2D(3553, le, V, re[0].width, re[0].height);
					for (let Ne = 0, gt = re.length; Ne < gt; Ne++) K = re[Ne], Ee ? t.texSubImage2D(3553, Ne, 0, 0, ie, T, K) : t.texImage2D(3553, Ne, V, ie, T, K);
					S.generateMipmaps = !1
				} else Ee ? ($e && t.texStorage2D(3553, le, V, me.width, me.height), t.texSubImage2D(3553, 0, 0, 0, ie, T, me)) : t.texImage2D(3553, 0, V, ie, T, me)
			}
			E(S, P) && _(Q), C.__version = S.version, S.onUpdate && S.onUpdate(S)
		}

		function J(C, S, q) {
			if (S.image.length !== 6) return;
			ve(C, S), t.activeTexture(33984 + q), t.bindTexture(34067, C.__webglTexture), r.pixelStorei(37440, S.flipY), r.pixelStorei(37441, S.premultiplyAlpha), r.pixelStorei(3317, S.unpackAlignment), r.pixelStorei(37443, 0);
			let Q = S && (S.isCompressedTexture || S.image[0].isCompressedTexture),
				ye = S.image[0] && S.image[0].isDataTexture,
				me = [];
			for (let le = 0; le < 6; le++) !Q && !ye ? me[le] = m(S.image[le], !1, !0, c) : me[le] = ye ? S.image[le].image : S.image[le];
			let P = me[0],
				ie = b(P) || o,
				T = s.convert(S.format),
				V = s.convert(S.type),
				K = w(S.internalFormat, T, V, S.encoding);
			oe(34067, S, ie);
			let re;
			if (Q)
				for (let le = 0; le < 6; le++) {
					re = me[le].mipmaps;
					for (let Ee = 0; Ee < re.length; Ee++) {
						let $e = re[Ee];
						S.format !== Tt && S.format !== Zn ? T !== null ? t.compressedTexImage2D(34069 + le, Ee, K, $e.width, $e.height, 0, $e.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : t.texImage2D(34069 + le, Ee, K, $e.width, $e.height, 0, T, V, $e.data)
					}
				} else {
				re = S.mipmaps;
				for (let le = 0; le < 6; le++)
					if (ye) {
						t.texImage2D(34069 + le, 0, K, me[le].width, me[le].height, 0, T, V, me[le].data);
						for (let Ee = 0; Ee < re.length; Ee++) {
							let Ne = re[Ee].image[le].image;
							t.texImage2D(34069 + le, Ee + 1, K, Ne.width, Ne.height, 0, T, V, Ne.data)
						}
					} else {
						t.texImage2D(34069 + le, 0, K, T, V, me[le]);
						for (let Ee = 0; Ee < re.length; Ee++) {
							let $e = re[Ee];
							t.texImage2D(34069 + le, Ee + 1, K, T, V, $e.image[le])
						}
					}
			}
			E(S, ie) && _(34067), C.__version = S.version, S.onUpdate && S.onUpdate(S)
		}

		function Re(C, S, q, Q, ye) {
			let me = s.convert(q.format),
				P = s.convert(q.type),
				ie = w(q.internalFormat, me, P, q.encoding);
			n.get(S).__hasExternalTextures || (ye === 32879 || ye === 35866 ? t.texImage3D(ye, 0, ie, S.width, S.height, S.depth, 0, me, P, null) : t.texImage2D(ye, 0, ie, S.width, S.height, 0, me, P, null)), t.bindFramebuffer(36160, C), S.useRenderToTexture ? f.framebufferTexture2DMultisampleEXT(36160, Q, ye, n.get(q).__webglTexture, 0, he(S)) : r.framebufferTexture2D(36160, Q, ye, n.get(q).__webglTexture, 0), t.bindFramebuffer(36160, null)
		}

		function be(C, S, q) {
			if (r.bindRenderbuffer(36161, C), S.depthBuffer && !S.stencilBuffer) {
				let Q = 33189;
				if (q || S.useRenderToTexture) {
					let ye = S.depthTexture;
					ye && ye.isDepthTexture && (ye.type === ln ? Q = 36012 : ye.type === Li && (Q = 33190));
					let me = he(S);
					S.useRenderToTexture ? f.renderbufferStorageMultisampleEXT(36161, me, Q, S.width, S.height) : r.renderbufferStorageMultisample(36161, me, Q, S.width, S.height)
				} else r.renderbufferStorage(36161, Q, S.width, S.height);
				r.framebufferRenderbuffer(36160, 36096, 36161, C)
			} else if (S.depthBuffer && S.stencilBuffer) {
				let Q = he(S);
				q && S.useRenderbuffer ? r.renderbufferStorageMultisample(36161, Q, 35056, S.width, S.height) : S.useRenderToTexture ? f.renderbufferStorageMultisampleEXT(36161, Q, 35056, S.width, S.height) : r.renderbufferStorage(36161, 34041, S.width, S.height), r.framebufferRenderbuffer(36160, 33306, 36161, C)
			} else {
				let Q = S.isWebGLMultipleRenderTargets === !0 ? S.texture[0] : S.texture,
					ye = s.convert(Q.format),
					me = s.convert(Q.type),
					P = w(Q.internalFormat, ye, me, Q.encoding),
					ie = he(S);
				q && S.useRenderbuffer ? r.renderbufferStorageMultisample(36161, ie, P, S.width, S.height) : S.useRenderToTexture ? f.renderbufferStorageMultisampleEXT(36161, ie, P, S.width, S.height) : r.renderbufferStorage(36161, P, S.width, S.height)
			}
			r.bindRenderbuffer(36161, null)
		}

		function xe(C, S) {
			if (S && S.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
			if (t.bindFramebuffer(36160, C), !(S.depthTexture && S.depthTexture.isDepthTexture)) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
			(!n.get(S.depthTexture).__webglTexture || S.depthTexture.image.width !== S.width || S.depthTexture.image.height !== S.height) && (S.depthTexture.image.width = S.width, S.depthTexture.image.height = S.height, S.depthTexture.needsUpdate = !0), G(S.depthTexture, 0);
			let Q = n.get(S.depthTexture).__webglTexture,
				ye = he(S);
			if (S.depthTexture.format === Jn) S.useRenderToTexture ? f.framebufferTexture2DMultisampleEXT(36160, 36096, 3553, Q, 0, ye) : r.framebufferTexture2D(36160, 36096, 3553, Q, 0);
			else if (S.depthTexture.format === Ln) S.useRenderToTexture ? f.framebufferTexture2DMultisampleEXT(36160, 33306, 3553, Q, 0, ye) : r.framebufferTexture2D(36160, 33306, 3553, Q, 0);
			else throw new Error("Unknown depthTexture format")
		}

		function we(C) {
			let S = n.get(C),
				q = C.isWebGLCubeRenderTarget === !0;
			if (C.depthTexture && !S.__autoAllocateDepthBuffer) {
				if (q) throw new Error("target.depthTexture not supported in Cube render targets");
				xe(S.__webglFramebuffer, C)
			} else if (q) {
				S.__webglDepthbuffer = [];
				for (let Q = 0; Q < 6; Q++) t.bindFramebuffer(36160, S.__webglFramebuffer[Q]), S.__webglDepthbuffer[Q] = r.createRenderbuffer(), be(S.__webglDepthbuffer[Q], C, !1)
			} else t.bindFramebuffer(36160, S.__webglFramebuffer), S.__webglDepthbuffer = r.createRenderbuffer(), be(S.__webglDepthbuffer, C, !1);
			t.bindFramebuffer(36160, null)
		}

		function Ue(C, S, q) {
			let Q = n.get(C);
			S !== void 0 && Re(Q.__webglFramebuffer, C, C.texture, 36064, 3553), q !== void 0 && we(C)
		}

		function W(C) {
			let S = C.texture,
				q = n.get(C),
				Q = n.get(S);
			C.addEventListener("dispose", R), C.isWebGLMultipleRenderTargets !== !0 && (Q.__webglTexture === void 0 && (Q.__webglTexture = r.createTexture()), Q.__version = S.version, a.memory.textures++);
			let ye = C.isWebGLCubeRenderTarget === !0,
				me = C.isWebGLMultipleRenderTargets === !0,
				P = S.isDataTexture3D || S.isDataTexture2DArray,
				ie = b(C) || o;
			if (o && S.format === Zn && (S.type === ln || S.type === Ii) && (S.format = Tt, console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")), ye) {
				q.__webglFramebuffer = [];
				for (let T = 0; T < 6; T++) q.__webglFramebuffer[T] = r.createFramebuffer()
			} else if (q.__webglFramebuffer = r.createFramebuffer(), me)
				if (i.drawBuffers) {
					let T = C.texture;
					for (let V = 0, K = T.length; V < K; V++) {
						let re = n.get(T[V]);
						re.__webglTexture === void 0 && (re.__webglTexture = r.createTexture(), a.memory.textures++)
					}
				} else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
			else if (C.useRenderbuffer)
				if (o) {
					q.__webglMultisampledFramebuffer = r.createFramebuffer(), q.__webglColorRenderbuffer = r.createRenderbuffer(), r.bindRenderbuffer(36161, q.__webglColorRenderbuffer);
					let T = s.convert(S.format),
						V = s.convert(S.type),
						K = w(S.internalFormat, T, V, S.encoding),
						re = he(C);
					r.renderbufferStorageMultisample(36161, re, K, C.width, C.height), t.bindFramebuffer(36160, q.__webglMultisampledFramebuffer), r.framebufferRenderbuffer(36160, 36064, 36161, q.__webglColorRenderbuffer), r.bindRenderbuffer(36161, null), C.depthBuffer && (q.__webglDepthRenderbuffer = r.createRenderbuffer(), be(q.__webglDepthRenderbuffer, C, !0)), t.bindFramebuffer(36160, null)
				} else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");
			if (ye) {
				t.bindTexture(34067, Q.__webglTexture), oe(34067, S, ie);
				for (let T = 0; T < 6; T++) Re(q.__webglFramebuffer[T], C, S, 36064, 34069 + T);
				E(S, ie) && _(34067), t.unbindTexture()
			} else if (me) {
				let T = C.texture;
				for (let V = 0, K = T.length; V < K; V++) {
					let re = T[V],
						le = n.get(re);
					t.bindTexture(3553, le.__webglTexture), oe(3553, re, ie), Re(q.__webglFramebuffer, C, re, 36064 + V, 3553), E(re, ie) && _(3553)
				}
				t.unbindTexture()
			} else {
				let T = 3553;
				P && (o ? T = S.isDataTexture3D ? 32879 : 35866 : console.warn("THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.")), t.bindTexture(T, Q.__webglTexture), oe(T, S, ie), Re(q.__webglFramebuffer, C, S, 36064, T), E(S, ie) && _(T), t.unbindTexture()
			}
			C.depthBuffer && we(C)
		}

		function ee(C) {
			let S = b(C) || o,
				q = C.isWebGLMultipleRenderTargets === !0 ? C.texture : [C.texture];
			for (let Q = 0, ye = q.length; Q < ye; Q++) {
				let me = q[Q];
				if (E(me, S)) {
					let P = C.isWebGLCubeRenderTarget ? 34067 : 3553,
						ie = n.get(me).__webglTexture;
					t.bindTexture(P, ie), _(P), t.unbindTexture()
				}
			}
		}

		function te(C) {
			if (C.useRenderbuffer)
				if (o) {
					let S = C.width,
						q = C.height,
						Q = 16384,
						ye = [36064],
						me = C.stencilBuffer ? 33306 : 36096;
					C.depthBuffer && ye.push(me), C.ignoreDepthForMultisampleCopy || (C.depthBuffer && (Q |= 256), C.stencilBuffer && (Q |= 1024));
					let P = n.get(C);
					t.bindFramebuffer(36008, P.__webglMultisampledFramebuffer), t.bindFramebuffer(36009, P.__webglFramebuffer), C.ignoreDepthForMultisampleCopy && (r.invalidateFramebuffer(36008, [me]), r.invalidateFramebuffer(36009, [me])), r.blitFramebuffer(0, 0, S, q, 0, 0, S, q, Q, 9728), r.invalidateFramebuffer(36008, ye), t.bindFramebuffer(36008, null), t.bindFramebuffer(36009, P.__webglMultisampledFramebuffer)
				} else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")
		}

		function he(C) {
			return o && (C.useRenderbuffer || C.useRenderToTexture) ? Math.min(h, C.samples) : 0
		}

		function ae(C) {
			let S = a.render.frame;
			p.get(C) !== S && (p.set(C, S), C.update())
		}
		let Me = !1,
			Se = !1;

		function Pe(C, S) {
			C && C.isWebGLRenderTarget && (Me === !1 && (console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."), Me = !0), C = C.texture), G(C, S)
		}

		function Je(C, S) {
			C && C.isWebGLCubeRenderTarget && (Se === !1 && (console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."), Se = !0), C = C.texture), Y(C, S)
		}
		this.allocateTextureUnit = N, this.resetTextureUnits = z, this.setTexture2D = G, this.setTexture2DArray = ne, this.setTexture3D = fe, this.setTextureCube = Y, this.rebindTextures = Ue, this.setupRenderTarget = W, this.updateRenderTargetMipmap = ee, this.updateMultisampleRenderTarget = te, this.setupDepthRenderbuffer = we, this.setupFrameBufferTexture = Re, this.safeSetTexture2D = Pe, this.safeSetTextureCube = Je
	}

	function of(r, e, t) {
		let n = t.isWebGL2;

		function i(s) {
			let a;
			if (s === lt) return 5121;
			if (s === ph) return 32819;
			if (s === mh) return 32820;
			if (s === gh) return 33635;
			if (s === hh) return 5120;
			if (s === dh) return 5122;
			if (s === fr) return 5123;
			if (s === fh) return 5124;
			if (s === Li) return 5125;
			if (s === ln) return 5126;
			if (s === Ii) return n ? 5131 : (a = e.get("OES_texture_half_float"), a !== null ? a.HALF_FLOAT_OES : null);
			if (s === vh) return 6406;
			if (s === Zn) return 6407;
			if (s === Tt) return 6408;
			if (s === xh) return 6409;
			if (s === yh) return 6410;
			if (s === Jn) return 6402;
			if (s === Ln) return 34041;
			if (s === bh) return 6403;
			if (s === Ah) return 36244;
			if (s === Eh) return 33319;
			if (s === Mh) return 33320;
			if (s === Sh) return 36248;
			if (s === _h) return 36249;
			if (s === ml || s === gl || s === vl || s === xl)
				if (a = e.get("WEBGL_compressed_texture_s3tc"), a !== null) {
					if (s === ml) return a.COMPRESSED_RGB_S3TC_DXT1_EXT;
					if (s === gl) return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;
					if (s === vl) return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;
					if (s === xl) return a.COMPRESSED_RGBA_S3TC_DXT5_EXT
				} else return null;
			if (s === yl || s === wl || s === bl || s === Al)
				if (a = e.get("WEBGL_compressed_texture_pvrtc"), a !== null) {
					if (s === yl) return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
					if (s === wl) return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
					if (s === bl) return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
					if (s === Al) return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
				} else return null;
			if (s === Th) return a = e.get("WEBGL_compressed_texture_etc1"), a !== null ? a.COMPRESSED_RGB_ETC1_WEBGL : null;
			if ((s === El || s === Ml) && (a = e.get("WEBGL_compressed_texture_etc"), a !== null)) {
				if (s === El) return a.COMPRESSED_RGB8_ETC2;
				if (s === Ml) return a.COMPRESSED_RGBA8_ETC2_EAC
			}
			if (s === Ch || s === Dh || s === Rh || s === Ph || s === Lh || s === Ih || s === Bh || s === Uh || s === Fh || s === Oh || s === Nh || s === Hh || s === zh || s === Gh || s === Vh || s === Wh || s === Yh || s === jh || s === Xh || s === Qh || s === qh || s === Zh || s === Jh || s === Kh || s === $h || s === ed || s === td || s === nd) return a = e.get("WEBGL_compressed_texture_astc"), a !== null ? s : null;
			if (s === kh) return a = e.get("EXT_texture_compression_bptc"), a !== null ? s : null;
			if (s === Pn) return n ? 34042 : (a = e.get("WEBGL_depth_texture"), a !== null ? a.UNSIGNED_INT_24_8_WEBGL : null)
		}
		return {
			convert: i
		}
	}
	var Za = class extends ct {
		constructor(e = []) {
			super();
			this.cameras = e
		}
	};
	Za.prototype.isArrayCamera = !0;
	var En = class extends _e {
		constructor() {
			super();
			this.type = "Group"
		}
	};
	En.prototype.isGroup = !0;
	var zy = {
		type: "move"
	},
		Ja = class {
			constructor() {
				this._targetRay = null, this._grip = null, this._hand = null
			}
			getHandSpace() {
				return this._hand === null && (this._hand = new En, this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = {
					pinching: !1
				}), this._hand
			}
			getTargetRaySpace() {
				return this._targetRay === null && (this._targetRay = new En, this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new A, this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new A), this._targetRay
			}
			getGripSpace() {
				return this._grip === null && (this._grip = new En, this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new A, this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new A), this._grip
			}
			dispatchEvent(e) {
				return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this
			}
			disconnect(e) {
				return this.dispatchEvent({
					type: "disconnected",
					data: e
				}), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this
			}
			update(e, t, n) {
				let i = null,
					s = null,
					a = null,
					o = this._targetRay,
					l = this._grip,
					c = this._hand;
				if (e && t.session.visibilityState !== "visible-blurred")
					if (o !== null && (i = t.getPose(e.targetRaySpace, n), i !== null && (o.matrix.fromArray(i.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), i.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(i.linearVelocity)) : o.hasLinearVelocity = !1, i.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(i.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(zy))), c && e.hand) {
						a = !0;
						for (let v of e.hand.values()) {
							let x = t.getJointPose(v, n);
							if (c.joints[v.jointName] === void 0) {
								let m = new En;
								m.matrixAutoUpdate = !1, m.visible = !1, c.joints[v.jointName] = m, c.add(m)
							}
							let g = c.joints[v.jointName];
							x !== null && (g.matrix.fromArray(x.transform.matrix), g.matrix.decompose(g.position, g.rotation, g.scale), g.jointRadius = x.radius), g.visible = x !== null
						}
						let u = c.joints["index-finger-tip"],
							h = c.joints["thumb-tip"],
							d = u.position.distanceTo(h.position),
							f = .02,
							p = .005;
						c.inputState.pinching && d > f + p ? (c.inputState.pinching = !1, this.dispatchEvent({
							type: "pinchend",
							handedness: e.handedness,
							target: this
						})) : !c.inputState.pinching && d <= f - p && (c.inputState.pinching = !0, this.dispatchEvent({
							type: "pinchstart",
							handedness: e.handedness,
							target: this
						}))
					} else l !== null && e.gripSpace && (s = t.getPose(e.gripSpace, n), s !== null && (l.matrix.fromArray(s.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), s.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(s.linearVelocity)) : l.hasLinearVelocity = !1, s.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(s.angularVelocity)) : l.hasAngularVelocity = !1));
				return o !== null && (o.visible = i !== null), l !== null && (l.visible = s !== null), c !== null && (c.visible = a !== null), this
			}
		},
		ui = class extends ot {
			constructor(e, t, n, i, s, a, o, l, c, u) {
				if (u = u !== void 0 ? u : Jn, u !== Jn && u !== Ln) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
				n === void 0 && u === Jn && (n = fr), n === void 0 && u === Ln && (n = Pn);
				super(null, i, s, a, o, l, u, n, c);
				this.image = {
					width: e,
					height: t
				}, this.magFilter = o !== void 0 ? o : At, this.minFilter = l !== void 0 ? l : At, this.flipY = !1, this.generateMipmaps = !1
			}
		};
	ui.prototype.isDepthTexture = !0;
	var lf = class extends Pt {
		constructor(e, t) {
			super();
			let n = this,
				i = null,
				s = 1,
				a = null,
				o = "local-floor",
				l = e.extensions.has("WEBGL_multisampled_render_to_texture"),
				c = null,
				u = null,
				h = null,
				d = null,
				f = !1,
				p = null,
				v = t.getContextAttributes(),
				x = null,
				g = null,
				m = [],
				b = new Map,
				y = new ct;
			y.layers.enable(1), y.viewport = new Ve;
			let E = new ct;
			E.layers.enable(2), E.viewport = new Ve;
			let _ = [y, E],
				w = new Za;
			w.layers.enable(1), w.layers.enable(2);
			let D = null,
				I = null;
			this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function (Y) {
				let j = m[Y];
				return j === void 0 && (j = new Ja, m[Y] = j), j.getTargetRaySpace()
			}, this.getControllerGrip = function (Y) {
				let j = m[Y];
				return j === void 0 && (j = new Ja, m[Y] = j), j.getGripSpace()
			}, this.getHand = function (Y) {
				let j = m[Y];
				return j === void 0 && (j = new Ja, m[Y] = j), j.getHandSpace()
			};

			function L(Y) {
				let j = b.get(Y.inputSource);
				j && j.dispatchEvent({
					type: Y.type,
					data: Y.inputSource
				})
			}

			function R() {
				b.forEach(function (Y, j) {
					Y.disconnect(j)
				}), b.clear(), D = null, I = null, e.setRenderTarget(x), d = null, h = null, u = null, i = null, g = null, fe.stop(), n.isPresenting = !1, n.dispatchEvent({
					type: "sessionend"
				})
			}
			this.setFramebufferScaleFactor = function (Y) {
				s = Y, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")
			}, this.setReferenceSpaceType = function (Y) {
				o = Y, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")
			}, this.getReferenceSpace = function () {
				return a
			}, this.getBaseLayer = function () {
				return h !== null ? h : d
			}, this.getBinding = function () {
				return u
			}, this.getFrame = function () {
				return p
			}, this.getSession = function () {
				return i
			}, this.setSession = function (Y) {
				return qt(this, null, function* () {
					if (i = Y, i !== null) {
						if (x = e.getRenderTarget(), i.addEventListener("select", L), i.addEventListener("selectstart", L), i.addEventListener("selectend", L), i.addEventListener("squeeze", L), i.addEventListener("squeezestart", L), i.addEventListener("squeezeend", L), i.addEventListener("end", R), i.addEventListener("inputsourceschange", Z), v.xrCompatible !== !0 && (yield t.makeXRCompatible()), i.renderState.layers === void 0 || e.capabilities.isWebGL2 === !1) {
							let j = {
								antialias: i.renderState.layers === void 0 ? v.antialias : !0,
								alpha: v.alpha,
								depth: v.depth,
								stencil: v.stencil,
								framebufferScaleFactor: s
							};
							d = new XRWebGLLayer(i, t, j), i.updateRenderState({
								baseLayer: d
							}), g = new We(d.framebufferWidth, d.framebufferHeight)
						} else {
							f = v.antialias;
							let j = null,
								ue = null,
								oe = null;
							v.depth && (oe = v.stencil ? 35056 : 33189, j = v.stencil ? Ln : Jn, ue = v.stencil ? Pn : fr);
							let ve = {
								colorFormat: v.alpha || f ? 32856 : 32849,
								depthFormat: oe,
								scaleFactor: s
							};
							u = new XRWebGLBinding(i, t), h = u.createProjectionLayer(ve), i.updateRenderState({
								layers: [h]
							}), f ? g = new Ni(h.textureWidth, h.textureHeight, {
								format: Tt,
								type: lt,
								depthTexture: new ui(h.textureWidth, h.textureHeight, ue, void 0, void 0, void 0, void 0, void 0, void 0, j),
								stencilBuffer: v.stencil,
								ignoreDepth: h.ignoreDepthValues,
								useRenderToTexture: l
							}) : g = new We(h.textureWidth, h.textureHeight, {
								format: v.alpha ? Tt : Zn,
								type: lt,
								depthTexture: new ui(h.textureWidth, h.textureHeight, ue, void 0, void 0, void 0, void 0, void 0, void 0, j),
								stencilBuffer: v.stencil,
								ignoreDepth: h.ignoreDepthValues
							})
						}
						this.setFoveation(0), a = yield i.requestReferenceSpace(o), fe.setContext(i), fe.start(), n.isPresenting = !0, n.dispatchEvent({
							type: "sessionstart"
						})
					}
				})
			};

			function Z(Y) {
				let j = i.inputSources;
				for (let ue = 0; ue < m.length; ue++) b.set(j[ue], m[ue]);
				for (let ue = 0; ue < Y.removed.length; ue++) {
					let oe = Y.removed[ue],
						ve = b.get(oe);
					ve && (ve.dispatchEvent({
						type: "disconnected",
						data: oe
					}), b.delete(oe))
				}
				for (let ue = 0; ue < Y.added.length; ue++) {
					let oe = Y.added[ue],
						ve = b.get(oe);
					ve && ve.dispatchEvent({
						type: "connected",
						data: oe
					})
				}
			}
			let F = new A,
				U = new A;

			function z(Y, j, ue) {
				F.setFromMatrixPosition(j.matrixWorld), U.setFromMatrixPosition(ue.matrixWorld);
				let oe = F.distanceTo(U),
					ve = j.projectionMatrix.elements,
					Oe = ue.projectionMatrix.elements,
					J = ve[14] / (ve[10] - 1),
					Re = ve[14] / (ve[10] + 1),
					be = (ve[9] + 1) / ve[5],
					xe = (ve[9] - 1) / ve[5],
					we = (ve[8] - 1) / ve[0],
					Ue = (Oe[8] + 1) / Oe[0],
					W = J * we,
					ee = J * Ue,
					te = oe / (-we + Ue),
					he = te * -we;
				j.matrixWorld.decompose(Y.position, Y.quaternion, Y.scale), Y.translateX(he), Y.translateZ(te), Y.matrixWorld.compose(Y.position, Y.quaternion, Y.scale), Y.matrixWorldInverse.copy(Y.matrixWorld).invert();
				let ae = J + te,
					Me = Re + te,
					Se = W - he,
					Pe = ee + (oe - he),
					Je = be * Re / Me * ae,
					C = xe * Re / Me * ae;
				Y.projectionMatrix.makePerspective(Se, Pe, Je, C, ae, Me)
			}

			function N(Y, j) {
				j === null ? Y.matrixWorld.copy(Y.matrix) : Y.matrixWorld.multiplyMatrices(j.matrixWorld, Y.matrix), Y.matrixWorldInverse.copy(Y.matrixWorld).invert()
			}
			this.updateCamera = function (Y) {
				if (i === null) return;
				w.near = E.near = y.near = Y.near, w.far = E.far = y.far = Y.far, (D !== w.near || I !== w.far) && (i.updateRenderState({
					depthNear: w.near,
					depthFar: w.far
				}), D = w.near, I = w.far);
				let j = Y.parent,
					ue = w.cameras;
				N(w, j);
				for (let ve = 0; ve < ue.length; ve++) N(ue[ve], j);
				w.matrixWorld.decompose(w.position, w.quaternion, w.scale), Y.position.copy(w.position), Y.quaternion.copy(w.quaternion), Y.scale.copy(w.scale), Y.matrix.copy(w.matrix), Y.matrixWorld.copy(w.matrixWorld);
				let oe = Y.children;
				for (let ve = 0, Oe = oe.length; ve < Oe; ve++) oe[ve].updateMatrixWorld(!0);
				ue.length === 2 ? z(w, y, E) : w.projectionMatrix.copy(y.projectionMatrix)
			}, this.getCamera = function () {
				return w
			}, this.getFoveation = function () {
				if (h !== null) return h.fixedFoveation;
				if (d !== null) return d.fixedFoveation
			}, this.setFoveation = function (Y) {
				h !== null && (h.fixedFoveation = Y), d !== null && d.fixedFoveation !== void 0 && (d.fixedFoveation = Y)
			};
			let G = null;

			function ne(Y, j) {
				if (c = j.getViewerPose(a), p = j, c !== null) {
					let oe = c.views;
					d !== null && (e.setRenderTargetFramebuffer(g, d.framebuffer), e.setRenderTarget(g));
					let ve = !1;
					oe.length !== w.cameras.length && (w.cameras.length = 0, ve = !0);
					for (let Oe = 0; Oe < oe.length; Oe++) {
						let J = oe[Oe],
							Re = null;
						if (d !== null) Re = d.getViewport(J);
						else {
							let xe = u.getViewSubImage(h, J);
							Re = xe.viewport, Oe === 0 && (e.setRenderTargetTextures(g, xe.colorTexture, h.ignoreDepthValues ? void 0 : xe.depthStencilTexture), e.setRenderTarget(g))
						}
						let be = _[Oe];
						be.matrix.fromArray(J.transform.matrix), be.projectionMatrix.fromArray(J.projectionMatrix), be.viewport.set(Re.x, Re.y, Re.width, Re.height), Oe === 0 && w.matrix.copy(be.matrix), ve === !0 && w.cameras.push(be)
					}
				}
				let ue = i.inputSources;
				for (let oe = 0; oe < m.length; oe++) {
					let ve = m[oe],
						Oe = ue[oe];
					ve.update(Oe, j, a)
				}
				G && G(Y, j), p = null
			}
			let fe = new _d;
			fe.setAnimationLoop(ne), this.setAnimationLoop = function (Y) {
				G = Y
			}, this.dispose = function () { }
		}
	};

	function Gy(r) {
		function e(g, m) {
			g.fogColor.value.copy(m.color), m.isFog ? (g.fogNear.value = m.near, g.fogFar.value = m.far) : m.isFogExp2 && (g.fogDensity.value = m.density)
		}

		function t(g, m, b, y, E) {
			m.isMeshBasicMaterial ? n(g, m) : m.isMeshLambertMaterial ? (n(g, m), l(g, m)) : m.isMeshToonMaterial ? (n(g, m), u(g, m)) : m.isMeshPhongMaterial ? (n(g, m), c(g, m)) : m.isMeshStandardMaterial ? (n(g, m), m.isMeshPhysicalMaterial ? d(g, m, E) : h(g, m)) : m.isMeshMatcapMaterial ? (n(g, m), f(g, m)) : m.isMeshDepthMaterial ? (n(g, m), p(g, m)) : m.isMeshDistanceMaterial ? (n(g, m), v(g, m)) : m.isMeshNormalMaterial ? (n(g, m), x(g, m)) : m.isLineBasicMaterial ? (i(g, m), m.isLineDashedMaterial && s(g, m)) : m.isPointsMaterial ? a(g, m, b, y) : m.isSpriteMaterial ? o(g, m) : m.isShadowMaterial ? (g.color.value.copy(m.color), g.opacity.value = m.opacity) : m.isShaderMaterial && (m.uniformsNeedUpdate = !1)
		}

		function n(g, m) {
			g.opacity.value = m.opacity, m.color && g.diffuse.value.copy(m.color), m.emissive && g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity), m.map && (g.map.value = m.map), m.alphaMap && (g.alphaMap.value = m.alphaMap), m.specularMap && (g.specularMap.value = m.specularMap), m.alphaTest > 0 && (g.alphaTest.value = m.alphaTest);
			let b = r.get(m).envMap;
			b && (g.envMap.value = b, g.flipEnvMap.value = b.isCubeTexture && b.isRenderTargetTexture === !1 ? -1 : 1, g.reflectivity.value = m.reflectivity, g.ior.value = m.ior, g.refractionRatio.value = m.refractionRatio), m.lightMap && (g.lightMap.value = m.lightMap, g.lightMapIntensity.value = m.lightMapIntensity), m.aoMap && (g.aoMap.value = m.aoMap, g.aoMapIntensity.value = m.aoMapIntensity);
			let y;
			m.map ? y = m.map : m.specularMap ? y = m.specularMap : m.displacementMap ? y = m.displacementMap : m.normalMap ? y = m.normalMap : m.bumpMap ? y = m.bumpMap : m.roughnessMap ? y = m.roughnessMap : m.metalnessMap ? y = m.metalnessMap : m.alphaMap ? y = m.alphaMap : m.emissiveMap ? y = m.emissiveMap : m.clearcoatMap ? y = m.clearcoatMap : m.clearcoatNormalMap ? y = m.clearcoatNormalMap : m.clearcoatRoughnessMap ? y = m.clearcoatRoughnessMap : m.specularIntensityMap ? y = m.specularIntensityMap : m.specularColorMap ? y = m.specularColorMap : m.transmissionMap ? y = m.transmissionMap : m.thicknessMap ? y = m.thicknessMap : m.sheenColorMap ? y = m.sheenColorMap : m.sheenRoughnessMap && (y = m.sheenRoughnessMap), y !== void 0 && (y.isWebGLRenderTarget && (y = y.texture), y.matrixAutoUpdate === !0 && y.updateMatrix(), g.uvTransform.value.copy(y.matrix));
			let E;
			m.aoMap ? E = m.aoMap : m.lightMap && (E = m.lightMap), E !== void 0 && (E.isWebGLRenderTarget && (E = E.texture), E.matrixAutoUpdate === !0 && E.updateMatrix(), g.uv2Transform.value.copy(E.matrix))
		}

		function i(g, m) {
			g.diffuse.value.copy(m.color), g.opacity.value = m.opacity
		}

		function s(g, m) {
			g.dashSize.value = m.dashSize, g.totalSize.value = m.dashSize + m.gapSize, g.scale.value = m.scale
		}

		function a(g, m, b, y) {
			g.diffuse.value.copy(m.color), g.opacity.value = m.opacity, g.size.value = m.size * b, g.scale.value = y * .5, m.map && (g.map.value = m.map), m.alphaMap && (g.alphaMap.value = m.alphaMap), m.alphaTest > 0 && (g.alphaTest.value = m.alphaTest);
			let E;
			m.map ? E = m.map : m.alphaMap && (E = m.alphaMap), E !== void 0 && (E.matrixAutoUpdate === !0 && E.updateMatrix(), g.uvTransform.value.copy(E.matrix))
		}

		function o(g, m) {
			g.diffuse.value.copy(m.color), g.opacity.value = m.opacity, g.rotation.value = m.rotation, m.map && (g.map.value = m.map), m.alphaMap && (g.alphaMap.value = m.alphaMap), m.alphaTest > 0 && (g.alphaTest.value = m.alphaTest);
			let b;
			m.map ? b = m.map : m.alphaMap && (b = m.alphaMap), b !== void 0 && (b.matrixAutoUpdate === !0 && b.updateMatrix(), g.uvTransform.value.copy(b.matrix))
		}

		function l(g, m) {
			m.emissiveMap && (g.emissiveMap.value = m.emissiveMap)
		}

		function c(g, m) {
			g.specular.value.copy(m.specular), g.shininess.value = Math.max(m.shininess, 1e-4), m.emissiveMap && (g.emissiveMap.value = m.emissiveMap), m.bumpMap && (g.bumpMap.value = m.bumpMap, g.bumpScale.value = m.bumpScale, m.side === Qe && (g.bumpScale.value *= -1)), m.normalMap && (g.normalMap.value = m.normalMap, g.normalScale.value.copy(m.normalScale), m.side === Qe && g.normalScale.value.negate()), m.displacementMap && (g.displacementMap.value = m.displacementMap, g.displacementScale.value = m.displacementScale, g.displacementBias.value = m.displacementBias)
		}

		function u(g, m) {
			m.gradientMap && (g.gradientMap.value = m.gradientMap), m.emissiveMap && (g.emissiveMap.value = m.emissiveMap), m.bumpMap && (g.bumpMap.value = m.bumpMap, g.bumpScale.value = m.bumpScale, m.side === Qe && (g.bumpScale.value *= -1)), m.normalMap && (g.normalMap.value = m.normalMap, g.normalScale.value.copy(m.normalScale), m.side === Qe && g.normalScale.value.negate()), m.displacementMap && (g.displacementMap.value = m.displacementMap, g.displacementScale.value = m.displacementScale, g.displacementBias.value = m.displacementBias)
		}

		function h(g, m) {
			g.roughness.value = m.roughness, g.metalness.value = m.metalness, m.roughnessMap && (g.roughnessMap.value = m.roughnessMap), m.metalnessMap && (g.metalnessMap.value = m.metalnessMap), m.emissiveMap && (g.emissiveMap.value = m.emissiveMap), m.bumpMap && (g.bumpMap.value = m.bumpMap, g.bumpScale.value = m.bumpScale, m.side === Qe && (g.bumpScale.value *= -1)), m.normalMap && (g.normalMap.value = m.normalMap, g.normalScale.value.copy(m.normalScale), m.side === Qe && g.normalScale.value.negate()), m.displacementMap && (g.displacementMap.value = m.displacementMap, g.displacementScale.value = m.displacementScale, g.displacementBias.value = m.displacementBias), r.get(m).envMap && (g.envMapIntensity.value = m.envMapIntensity)
		}

		function d(g, m, b) {
			h(g, m), g.ior.value = m.ior, m.sheen > 0 && (g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen), g.sheenRoughness.value = m.sheenRoughness, m.sheenColorMap && (g.sheenColorMap.value = m.sheenColorMap), m.sheenRoughnessMap && (g.sheenRoughnessMap.value = m.sheenRoughnessMap)), m.clearcoat > 0 && (g.clearcoat.value = m.clearcoat, g.clearcoatRoughness.value = m.clearcoatRoughness, m.clearcoatMap && (g.clearcoatMap.value = m.clearcoatMap), m.clearcoatRoughnessMap && (g.clearcoatRoughnessMap.value = m.clearcoatRoughnessMap), m.clearcoatNormalMap && (g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale), g.clearcoatNormalMap.value = m.clearcoatNormalMap, m.side === Qe && g.clearcoatNormalScale.value.negate())), m.transmission > 0 && (g.transmission.value = m.transmission, g.transmissionSamplerMap.value = b.texture, g.transmissionSamplerSize.value.set(b.width, b.height), m.transmissionMap && (g.transmissionMap.value = m.transmissionMap), g.thickness.value = m.thickness, m.thicknessMap && (g.thicknessMap.value = m.thicknessMap), g.attenuationDistance.value = m.attenuationDistance, g.attenuationColor.value.copy(m.attenuationColor)), g.specularIntensity.value = m.specularIntensity, g.specularColor.value.copy(m.specularColor), m.specularIntensityMap && (g.specularIntensityMap.value = m.specularIntensityMap), m.specularColorMap && (g.specularColorMap.value = m.specularColorMap)
		}

		function f(g, m) {
			m.matcap && (g.matcap.value = m.matcap), m.bumpMap && (g.bumpMap.value = m.bumpMap, g.bumpScale.value = m.bumpScale, m.side === Qe && (g.bumpScale.value *= -1)), m.normalMap && (g.normalMap.value = m.normalMap, g.normalScale.value.copy(m.normalScale), m.side === Qe && g.normalScale.value.negate()), m.displacementMap && (g.displacementMap.value = m.displacementMap, g.displacementScale.value = m.displacementScale, g.displacementBias.value = m.displacementBias)
		}

		function p(g, m) {
			m.displacementMap && (g.displacementMap.value = m.displacementMap, g.displacementScale.value = m.displacementScale, g.displacementBias.value = m.displacementBias)
		}

		function v(g, m) {
			m.displacementMap && (g.displacementMap.value = m.displacementMap, g.displacementScale.value = m.displacementScale, g.displacementBias.value = m.displacementBias), g.referencePosition.value.copy(m.referencePosition), g.nearDistance.value = m.nearDistance, g.farDistance.value = m.farDistance
		}

		function x(g, m) {
			m.bumpMap && (g.bumpMap.value = m.bumpMap, g.bumpScale.value = m.bumpScale, m.side === Qe && (g.bumpScale.value *= -1)), m.normalMap && (g.normalMap.value = m.normalMap, g.normalScale.value.copy(m.normalScale), m.side === Qe && g.normalScale.value.negate()), m.displacementMap && (g.displacementMap.value = m.displacementMap, g.displacementScale.value = m.displacementScale, g.displacementBias.value = m.displacementBias)
		}
		return {
			refreshFogUniforms: e,
			refreshMaterialUniforms: t
		}
	}

	function ky() {
		let r = Ta("canvas");
		return r.style.display = "block", r
	}

	function Ze(r = {}) {
		let e = r.canvas !== void 0 ? r.canvas : ky(),
			t = r.context !== void 0 ? r.context : null,
			n = r.alpha !== void 0 ? r.alpha : !1,
			i = r.depth !== void 0 ? r.depth : !0,
			s = r.stencil !== void 0 ? r.stencil : !0,
			a = r.antialias !== void 0 ? r.antialias : !1,
			o = r.premultipliedAlpha !== void 0 ? r.premultipliedAlpha : !0,
			l = r.preserveDrawingBuffer !== void 0 ? r.preserveDrawingBuffer : !1,
			c = r.powerPreference !== void 0 ? r.powerPreference : "default",
			u = r.failIfMajorPerformanceCaveat !== void 0 ? r.failIfMajorPerformanceCaveat : !1,
			h = null,
			d = null,
			f = [],
			p = [];
		this.domElement = e, this.debug = {
			checkShaderErrors: !0
		}, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.gammaFactor = 2, this.outputEncoding = ft, this.physicallyCorrectLights = !1, this.toneMapping = qn, this.toneMappingExposure = 1;
		let v = this,
			x = !1,
			g = 0,
			m = 0,
			b = null,
			y = -1,
			E = null,
			_ = new Ve,
			w = new Ve,
			D = null,
			I = e.width,
			L = e.height,
			R = 1,
			Z = null,
			F = null,
			U = new Ve(0, 0, I, L),
			z = new Ve(0, 0, I, L),
			N = !1,
			G = [],
			ne = new Rr,
			fe = !1,
			Y = !1,
			j = null,
			ue = new ge,
			oe = new A,
			ve = {
				background: null,
				fog: null,
				environment: null,
				overrideMaterial: null,
				isScene: !0
			};

		function Oe() {
			return b === null ? R : 1
		}
		let J = t;

		function Re(M, B) {
			for (let k = 0; k < M.length; k++) {
				let H = M[k],
					X = e.getContext(H, B);
				if (X !== null) return X
			}
			return null
		}
		try {
			let M = {
				alpha: n,
				depth: i,
				stencil: s,
				antialias: a,
				premultipliedAlpha: o,
				preserveDrawingBuffer: l,
				powerPreference: c,
				failIfMajorPerformanceCaveat: u
			};
			if ("setAttribute" in e && e.setAttribute("data-engine", `three.js r${bn}`), e.addEventListener("webglcontextlost", le, !1), e.addEventListener("webglcontextrestored", Ee, !1), J === null) {
				let B = ["webgl2", "webgl", "experimental-webgl"];
				if (v.isWebGL1Renderer === !0 && B.shift(), J = Re(B, M), J === null) throw Re(B) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.")
			}
			J.getShaderPrecisionFormat === void 0 && (J.getShaderPrecisionFormat = function () {
				return {
					rangeMin: 1,
					rangeMax: 1,
					precision: 1
				}
			})
		} catch (M) {
			throw console.error("THREE.WebGLRenderer: " + M.message), M
		}
		let be, xe, we, Ue, W, ee, te, he, ae, Me, Se, Pe, Je, C, S, q, Q, ye, me, P, ie, T, V;

		function K() {
			be = new fx(J), xe = new ax(J, be, r), be.init(xe), T = new of(J, be, xe), we = new Ny(J, be, xe), G[0] = 1029, Ue = new gx(J), W = new Ty, ee = new Hy(J, be, we, W, xe, T, Ue), te = new lx(v), he = new dx(v), ae = new Rg(J, xe), V = new rx(J, be, ae, xe), Me = new px(J, ae, Ue, V), Se = new wx(J, Me, ae, Ue), me = new yx(J, xe, ee), q = new ox(W), Pe = new _y(v, te, he, be, xe, V, q), Je = new Gy(W), C = new Dy(W), S = new Uy(be, xe), ye = new ix(v, te, we, Se, o), Q = new af(v, Se, xe), P = new sx(J, be, Ue, xe), ie = new mx(J, be, Ue, xe), Ue.programs = Pe.programs, v.capabilities = xe, v.extensions = be, v.properties = W, v.renderLists = C, v.shadowMap = Q, v.state = we, v.info = Ue
		}
		K();
		let re = new lf(v, J);
		this.xr = re, this.getContext = function () {
			return J
		}, this.getContextAttributes = function () {
			return J.getContextAttributes()
		}, this.forceContextLoss = function () {
			let M = be.get("WEBGL_lose_context");
			M && M.loseContext()
		}, this.forceContextRestore = function () {
			let M = be.get("WEBGL_lose_context");
			M && M.restoreContext()
		}, this.getPixelRatio = function () {
			return R
		}, this.setPixelRatio = function (M) {
			M !== void 0 && (R = M, this.setSize(I, L, !1))
		}, this.getSize = function (M) {
			return M.set(I, L)
		}, this.setSize = function (M, B, k) {
			if (re.isPresenting) {
				console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
				return
			}
			I = M, L = B, e.width = Math.floor(M * R), e.height = Math.floor(B * R), k !== !1 && (e.style.width = M + "px", e.style.height = B + "px"), this.setViewport(0, 0, M, B)
		}, this.getDrawingBufferSize = function (M) {
			return M.set(I * R, L * R).floor()
		}, this.setDrawingBufferSize = function (M, B, k) {
			I = M, L = B, R = k, e.width = Math.floor(M * k), e.height = Math.floor(B * k), this.setViewport(0, 0, M, B)
		}, this.getCurrentViewport = function (M) {
			return M.copy(_)
		}, this.getViewport = function (M) {
			return M.copy(U)
		}, this.setViewport = function (M, B, k, H) {
			M.isVector4 ? U.set(M.x, M.y, M.z, M.w) : U.set(M, B, k, H), we.viewport(_.copy(U).multiplyScalar(R).floor())
		}, this.getScissor = function (M) {
			return M.copy(z)
		}, this.setScissor = function (M, B, k, H) {
			M.isVector4 ? z.set(M.x, M.y, M.z, M.w) : z.set(M, B, k, H), we.scissor(w.copy(z).multiplyScalar(R).floor())
		}, this.getScissorTest = function () {
			return N
		}, this.setScissorTest = function (M) {
			we.setScissorTest(N = M)
		}, this.setOpaqueSort = function (M) {
			Z = M
		}, this.setTransparentSort = function (M) {
			F = M
		}, this.getClearColor = function (M) {
			return M.copy(ye.getClearColor())
		}, this.setClearColor = function () {
			ye.setClearColor.apply(ye, arguments)
		}, this.getClearAlpha = function () {
			return ye.getClearAlpha()
		}, this.setClearAlpha = function () {
			ye.setClearAlpha.apply(ye, arguments)
		}, this.clear = function (M, B, k) {
			let H = 0;
			(M === void 0 || M) && (H |= 16384), (B === void 0 || B) && (H |= 256), (k === void 0 || k) && (H |= 1024), J.clear(H)
		}, this.clearColor = function () {
			this.clear(!0, !1, !1)
		}, this.clearDepth = function () {
			this.clear(!1, !0, !1)
		}, this.clearStencil = function () {
			this.clear(!1, !1, !0)
		}, this.dispose = function () {
			e.removeEventListener("webglcontextlost", le, !1), e.removeEventListener("webglcontextrestored", Ee, !1), C.dispose(), S.dispose(), W.dispose(), te.dispose(), he.dispose(), Se.dispose(), V.dispose(), re.dispose(), re.removeEventListener("sessionstart", Mu), re.removeEventListener("sessionend", Su), j && (j.dispose(), j = null), Ai.stop()
		};

		function le(M) {
			M.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), x = !0
		}

		function Ee() {
			console.log("THREE.WebGLRenderer: Context Restored."), x = !1;
			let M = Ue.autoReset,
				B = Q.enabled,
				k = Q.autoUpdate,
				H = Q.needsUpdate,
				X = Q.type;
			K(), Ue.autoReset = M, Q.enabled = B, Q.autoUpdate = k, Q.needsUpdate = H, Q.type = X
		}

		function $e(M) {
			let B = M.target;
			B.removeEventListener("dispose", $e), Ne(B)
		}

		function Ne(M) {
			gt(M), W.remove(M)
		}

		function gt(M) {
			let B = W.get(M).programs;
			B !== void 0 && B.forEach(function (k) {
				Pe.releaseProgram(k)
			})
		}
		this.renderBufferDirect = function (M, B, k, H, X, Te) {
			B === null && (B = ve);
			let Ae = X.isMesh && X.matrixWorld.determinant() < 0,
				Le = fm(M, B, k, H, X);
			we.setMaterial(H, Ae);
			let Ce = k.index,
				ke = k.attributes.position;
			if (Ce === null) {
				if (ke === void 0 || ke.count === 0) return
			} else if (Ce.count === 0) return;
			let Ie = 1;
			H.wireframe === !0 && (Ce = Me.getWireframeAttribute(k), Ie = 2), V.setup(X, H, Le, k, Ce);
			let He, ht = P;
			Ce !== null && (He = ae.get(Ce), ht = ie, ht.setIndex(He));
			let Ei = Ce !== null ? Ce.count : ke.count,
				Xe = k.drawRange.start * Ie,
				vs = k.drawRange.count * Ie,
				it = Te !== null ? Te.start * Ie : 0,
				Mi = Te !== null ? Te.count * Ie : 1 / 0,
				Si = Math.max(Xe, it),
				_i = Math.min(Ei, Xe + vs, it + Mi) - 1,
				Xn = Math.max(0, _i - Si + 1);
			if (Xn !== 0) {
				if (X.isMesh) H.wireframe === !0 ? (we.setLineWidth(H.wireframeLinewidth * Oe()), ht.setMode(1)) : ht.setMode(4);
				else if (X.isLine) {
					let dt = H.linewidth;
					dt === void 0 && (dt = 1), we.setLineWidth(dt * Oe()), X.isLineSegments ? ht.setMode(1) : X.isLineLoop ? ht.setMode(2) : ht.setMode(3)
				} else X.isPoints ? ht.setMode(0) : X.isSprite && ht.setMode(4);
				if (X.isInstancedMesh) ht.renderInstances(Si, Xn, X.count);
				else if (k.isInstancedBufferGeometry) {
					let dt = Math.min(k.instanceCount, k._maxInstanceCount);
					ht.renderInstances(Si, Xn, dt)
				} else ht.render(Si, Xn)
			}
		}, this.compile = function (M, B) {
			d = S.get(M), d.init(), p.push(d), M.traverseVisible(function (k) {
				k.isLight && k.layers.test(B.layers) && (d.pushLight(k), k.castShadow && d.pushShadow(k))
			}), d.setupLights(v.physicallyCorrectLights), M.traverse(function (k) {
				let H = k.material;
				if (H)
					if (Array.isArray(H))
						for (let X = 0; X < H.length; X++) {
							let Te = H[X];
							rl(Te, M, k)
						} else rl(H, M, k)
			}), p.pop(), d = null
		};
		let vt = null;

		function um(M) {
			vt && vt(M)
		}

		function Mu() {
			Ai.stop()
		}

		function Su() {
			Ai.start()
		}
		let Ai = new _d;
		Ai.setAnimationLoop(um), typeof window != "undefined" && Ai.setContext(window), this.setAnimationLoop = function (M) {
			vt = M, re.setAnimationLoop(M), M === null ? Ai.stop() : Ai.start()
		}, re.addEventListener("sessionstart", Mu), re.addEventListener("sessionend", Su), this.render = function (M, B) {
			if (B !== void 0 && B.isCamera !== !0) {
				console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
				return
			}
			if (x === !0) return;
			M.autoUpdate === !0 && M.updateMatrixWorld(), B.parent === null && B.updateMatrixWorld(), re.enabled === !0 && re.isPresenting === !0 && (re.cameraAutoUpdate === !0 && re.updateCamera(B), B = re.getCamera()), M.isScene === !0 && M.onBeforeRender(v, M, B, b), d = S.get(M, p.length), d.init(), p.push(d), ue.multiplyMatrices(B.projectionMatrix, B.matrixWorldInverse), ne.setFromProjectionMatrix(ue), Y = this.localClippingEnabled, fe = q.init(this.clippingPlanes, Y, B), h = C.get(M, f.length), h.init(), f.push(h), _u(M, B, 0, v.sortObjects), h.finish(), v.sortObjects === !0 && h.sort(Z, F), fe === !0 && q.beginShadows();
			let k = d.state.shadowsArray;
			if (Q.render(k, M, B), fe === !0 && q.endShadows(), this.info.autoReset === !0 && this.info.reset(), ye.render(h, M), d.setupLights(v.physicallyCorrectLights), B.isArrayCamera) {
				let H = B.cameras;
				for (let X = 0, Te = H.length; X < Te; X++) {
					let Ae = H[X];
					Tu(h, M, Ae, Ae.viewport)
				}
			} else Tu(h, M, B);
			b !== null && (ee.updateMultisampleRenderTarget(b), ee.updateRenderTargetMipmap(b)), M.isScene === !0 && M.onAfterRender(v, M, B), we.buffers.depth.setTest(!0), we.buffers.depth.setMask(!0), we.buffers.color.setMask(!0), we.setPolygonOffset(!1), V.resetDefaultState(), y = -1, E = null, p.pop(), p.length > 0 ? d = p[p.length - 1] : d = null, f.pop(), f.length > 0 ? h = f[f.length - 1] : h = null
		};

		function _u(M, B, k, H) {
			if (M.visible === !1) return;
			if (M.layers.test(B.layers)) {
				if (M.isGroup) k = M.renderOrder;
				else if (M.isLOD) M.autoUpdate === !0 && M.update(B);
				else if (M.isLight) d.pushLight(M), M.castShadow && d.pushShadow(M);
				else if (M.isSprite) {
					if (!M.frustumCulled || ne.intersectsSprite(M)) {
						H && oe.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ue);
						let Ae = Se.update(M),
							Le = M.material;
						Le.visible && h.push(M, Ae, Le, k, oe.z, null)
					}
				} else if ((M.isMesh || M.isLine || M.isPoints) && (M.isSkinnedMesh && M.skeleton.frame !== Ue.render.frame && (M.skeleton.update(), M.skeleton.frame = Ue.render.frame), !M.frustumCulled || ne.intersectsObject(M))) {
					H && oe.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ue);
					let Ae = Se.update(M),
						Le = M.material;
					if (Array.isArray(Le)) {
						let Ce = Ae.groups;
						for (let ke = 0, Ie = Ce.length; ke < Ie; ke++) {
							let He = Ce[ke],
								ht = Le[He.materialIndex];
							ht && ht.visible && h.push(M, Ae, ht, k, oe.z, He)
						}
					} else Le.visible && h.push(M, Ae, Le, k, oe.z, null)
				}
			}
			let Te = M.children;
			for (let Ae = 0, Le = Te.length; Ae < Le; Ae++) _u(Te[Ae], B, k, H)
		}

		function Tu(M, B, k, H) {
			let X = M.opaque,
				Te = M.transmissive,
				Ae = M.transparent;
			d.setupLightsView(k), Te.length > 0 && hm(X, B, k), H && we.viewport(_.copy(H)), X.length > 0 && ga(X, B, k), Te.length > 0 && ga(Te, B, k), Ae.length > 0 && ga(Ae, B, k)
		}

		function hm(M, B, k) {
			if (j === null) {
				let Ae = a === !0 && xe.isWebGL2 === !0 ? Ni : We;
				j = new Ae(1024, 1024, {
					generateMipmaps: !0,
					type: T.convert(Ii) !== null ? Ii : lt,
					minFilter: Pi,
					magFilter: At,
					wrapS: _t,
					wrapT: _t,
					useRenderToTexture: be.has("WEBGL_multisampled_render_to_texture")
				})
			}
			let H = v.getRenderTarget();
			v.setRenderTarget(j), v.clear();
			let X = v.toneMapping;
			v.toneMapping = qn, ga(M, B, k), v.toneMapping = X, ee.updateMultisampleRenderTarget(j), ee.updateRenderTargetMipmap(j), v.setRenderTarget(H)
		}

		function ga(M, B, k) {
			let H = B.isScene === !0 ? B.overrideMaterial : null;
			for (let X = 0, Te = M.length; X < Te; X++) {
				let Ae = M[X],
					Le = Ae.object,
					Ce = Ae.geometry,
					ke = H === null ? Ae.material : H,
					Ie = Ae.group;
				Le.layers.test(k.layers) && dm(Le, B, k, Ce, ke, Ie)
			}
		}

		function dm(M, B, k, H, X, Te) {
			M.onBeforeRender(v, B, k, H, X, Te), M.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse, M.matrixWorld), M.normalMatrix.getNormalMatrix(M.modelViewMatrix), X.onBeforeRender(v, B, k, H, M, Te), X.transparent === !0 && X.side === Ht ? (X.side = Qe, X.needsUpdate = !0, v.renderBufferDirect(k, B, H, X, M, Te), X.side = Rn, X.needsUpdate = !0, v.renderBufferDirect(k, B, H, X, M, Te), X.side = Ht) : v.renderBufferDirect(k, B, H, X, M, Te), M.onAfterRender(v, B, k, H, X, Te)
		}

		function rl(M, B, k) {
			B.isScene !== !0 && (B = ve);
			let H = W.get(M),
				X = d.state.lights,
				Te = d.state.shadowsArray,
				Ae = X.state.version,
				Le = Pe.getParameters(M, X.state, Te, B, k),
				Ce = Pe.getProgramCacheKey(Le),
				ke = H.programs;
			H.environment = M.isMeshStandardMaterial ? B.environment : null, H.fog = B.fog, H.envMap = (M.isMeshStandardMaterial ? he : te).get(M.envMap || H.environment), ke === void 0 && (M.addEventListener("dispose", $e), ke = new Map, H.programs = ke);
			let Ie = ke.get(Ce);
			if (Ie !== void 0) {
				if (H.currentProgram === Ie && H.lightsStateVersion === Ae) return Cu(M, Le), Ie
			} else Le.uniforms = Pe.getUniforms(M), M.onBuild(k, Le, v), M.onBeforeCompile(Le, v), Ie = Pe.acquireProgram(Le, Ce), ke.set(Ce, Ie), H.uniforms = Le.uniforms;
			let He = H.uniforms;
			(!M.isShaderMaterial && !M.isRawShaderMaterial || M.clipping === !0) && (He.clippingPlanes = q.uniform), Cu(M, Le), H.needsLights = mm(M), H.lightsStateVersion = Ae, H.needsLights && (He.ambientLightColor.value = X.state.ambient, He.lightProbe.value = X.state.probe, He.directionalLights.value = X.state.directional, He.directionalLightShadows.value = X.state.directionalShadow, He.spotLights.value = X.state.spot, He.spotLightShadows.value = X.state.spotShadow, He.rectAreaLights.value = X.state.rectArea, He.ltc_1.value = X.state.rectAreaLTC1, He.ltc_2.value = X.state.rectAreaLTC2, He.pointLights.value = X.state.point, He.pointLightShadows.value = X.state.pointShadow, He.hemisphereLights.value = X.state.hemi, He.directionalShadowMap.value = X.state.directionalShadowMap, He.directionalShadowMatrix.value = X.state.directionalShadowMatrix, He.spotShadowMap.value = X.state.spotShadowMap, He.spotShadowMatrix.value = X.state.spotShadowMatrix, He.pointShadowMap.value = X.state.pointShadowMap, He.pointShadowMatrix.value = X.state.pointShadowMatrix);
			let ht = Ie.getUniforms(),
				Ei = ci.seqWithValue(ht.seq, He);
			return H.currentProgram = Ie, H.uniformsList = Ei, Ie
		}

		function Cu(M, B) {
			let k = W.get(M);
			k.outputEncoding = B.outputEncoding, k.instancing = B.instancing, k.skinning = B.skinning, k.morphTargets = B.morphTargets, k.morphNormals = B.morphNormals, k.morphTargetsCount = B.morphTargetsCount, k.numClippingPlanes = B.numClippingPlanes, k.numIntersection = B.numClipIntersection, k.vertexAlphas = B.vertexAlphas, k.vertexTangents = B.vertexTangents
		}

		function fm(M, B, k, H, X) {
			B.isScene !== !0 && (B = ve), ee.resetTextureUnits();
			let Te = B.fog,
				Ae = H.isMeshStandardMaterial ? B.environment : null,
				Le = b === null ? v.outputEncoding : b.texture.encoding,
				Ce = (H.isMeshStandardMaterial ? he : te).get(H.envMap || Ae),
				ke = H.vertexColors === !0 && !!k.attributes.color && k.attributes.color.itemSize === 4,
				Ie = !!H.normalMap && !!k.attributes.tangent,
				He = !!k.morphAttributes.position,
				ht = !!k.morphAttributes.normal,
				Ei = k.morphAttributes.position ? k.morphAttributes.position.length : 0,
				Xe = W.get(H),
				vs = d.state.lights;
			if (fe === !0 && (Y === !0 || M !== E)) {
				let an = M === E && H.id === y;
				q.setState(H, M, an)
			}
			let it = !1;
			H.version === Xe.__version ? (Xe.needsLights && Xe.lightsStateVersion !== vs.state.version || Xe.outputEncoding !== Le || X.isInstancedMesh && Xe.instancing === !1 || !X.isInstancedMesh && Xe.instancing === !0 || X.isSkinnedMesh && Xe.skinning === !1 || !X.isSkinnedMesh && Xe.skinning === !0 || Xe.envMap !== Ce || H.fog && Xe.fog !== Te || Xe.numClippingPlanes !== void 0 && (Xe.numClippingPlanes !== q.numPlanes || Xe.numIntersection !== q.numIntersection) || Xe.vertexAlphas !== ke || Xe.vertexTangents !== Ie || Xe.morphTargets !== He || Xe.morphNormals !== ht || xe.isWebGL2 === !0 && Xe.morphTargetsCount !== Ei) && (it = !0) : (it = !0, Xe.__version = H.version);
			let Mi = Xe.currentProgram;
			it === !0 && (Mi = rl(H, B, X));
			let Si = !1,
				_i = !1,
				Xn = !1,
				dt = Mi.getUniforms(),
				xs = Xe.uniforms;
			if (we.useProgram(Mi.program) && (Si = !0, _i = !0, Xn = !0), H.id !== y && (y = H.id, _i = !0), Si || E !== M) {
				if (dt.setValue(J, "projectionMatrix", M.projectionMatrix), xe.logarithmicDepthBuffer && dt.setValue(J, "logDepthBufFC", 2 / (Math.log(M.far + 1) / Math.LN2)), E !== M && (E = M, _i = !0, Xn = !0), H.isShaderMaterial || H.isMeshPhongMaterial || H.isMeshToonMaterial || H.isMeshStandardMaterial || H.envMap) {
					let an = dt.map.cameraPosition;
					an !== void 0 && an.setValue(J, oe.setFromMatrixPosition(M.matrixWorld))
				} (H.isMeshPhongMaterial || H.isMeshToonMaterial || H.isMeshLambertMaterial || H.isMeshBasicMaterial || H.isMeshStandardMaterial || H.isShaderMaterial) && dt.setValue(J, "isOrthographic", M.isOrthographicCamera === !0), (H.isMeshPhongMaterial || H.isMeshToonMaterial || H.isMeshLambertMaterial || H.isMeshBasicMaterial || H.isMeshStandardMaterial || H.isShaderMaterial || H.isShadowMaterial || X.isSkinnedMesh) && dt.setValue(J, "viewMatrix", M.matrixWorldInverse)
			}
			if (X.isSkinnedMesh) {
				dt.setOptional(J, X, "bindMatrix"), dt.setOptional(J, X, "bindMatrixInverse");
				let an = X.skeleton;
				an && (xe.floatVertexTextures ? (an.boneTexture === null && an.computeBoneTexture(), dt.setValue(J, "boneTexture", an.boneTexture, ee), dt.setValue(J, "boneTextureSize", an.boneTextureSize)) : dt.setOptional(J, an, "boneMatrices"))
			}
			return !!k && (k.morphAttributes.position !== void 0 || k.morphAttributes.normal !== void 0) && me.update(X, k, H, Mi), (_i || Xe.receiveShadow !== X.receiveShadow) && (Xe.receiveShadow = X.receiveShadow, dt.setValue(J, "receiveShadow", X.receiveShadow)), _i && (dt.setValue(J, "toneMappingExposure", v.toneMappingExposure), Xe.needsLights && pm(xs, Xn), Te && H.fog && Je.refreshFogUniforms(xs, Te), Je.refreshMaterialUniforms(xs, H, R, L, j), ci.upload(J, Xe.uniformsList, xs, ee)), H.isShaderMaterial && H.uniformsNeedUpdate === !0 && (ci.upload(J, Xe.uniformsList, xs, ee), H.uniformsNeedUpdate = !1), H.isSpriteMaterial && dt.setValue(J, "center", X.center), dt.setValue(J, "modelViewMatrix", X.modelViewMatrix), dt.setValue(J, "normalMatrix", X.normalMatrix), dt.setValue(J, "modelMatrix", X.matrixWorld), Mi
		}

		function pm(M, B) {
			M.ambientLightColor.needsUpdate = B, M.lightProbe.needsUpdate = B, M.directionalLights.needsUpdate = B, M.directionalLightShadows.needsUpdate = B, M.pointLights.needsUpdate = B, M.pointLightShadows.needsUpdate = B, M.spotLights.needsUpdate = B, M.spotLightShadows.needsUpdate = B, M.rectAreaLights.needsUpdate = B, M.hemisphereLights.needsUpdate = B
		}

		function mm(M) {
			return M.isMeshLambertMaterial || M.isMeshToonMaterial || M.isMeshPhongMaterial || M.isMeshStandardMaterial || M.isShadowMaterial || M.isShaderMaterial && M.lights === !0
		}
		this.getActiveCubeFace = function () {
			return g
		}, this.getActiveMipmapLevel = function () {
			return m
		}, this.getRenderTarget = function () {
			return b
		}, this.setRenderTargetTextures = function (M, B, k) {
			W.get(M.texture).__webglTexture = B, W.get(M.depthTexture).__webglTexture = k;
			let H = W.get(M);
			H.__hasExternalTextures = !0, H.__hasExternalTextures && (H.__autoAllocateDepthBuffer = k === void 0, H.__autoAllocateDepthBuffer || M.useRenderToTexture && (console.warn("render-to-texture extension was disabled because an external texture was provided"), M.useRenderToTexture = !1, M.useRenderbuffer = !0))
		}, this.setRenderTargetFramebuffer = function (M, B) {
			let k = W.get(M);
			k.__webglFramebuffer = B, k.__useDefaultFramebuffer = B === void 0
		}, this.setRenderTarget = function (M, B = 0, k = 0) {
			b = M, g = B, m = k;
			let H = !0;
			if (M) {
				let Ce = W.get(M);
				Ce.__useDefaultFramebuffer !== void 0 ? (we.bindFramebuffer(36160, null), H = !1) : Ce.__webglFramebuffer === void 0 ? ee.setupRenderTarget(M) : Ce.__hasExternalTextures && ee.rebindTextures(M, W.get(M.texture).__webglTexture, W.get(M.depthTexture).__webglTexture)
			}
			let X = null,
				Te = !1,
				Ae = !1;
			if (M) {
				let Ce = M.texture;
				(Ce.isDataTexture3D || Ce.isDataTexture2DArray) && (Ae = !0);
				let ke = W.get(M).__webglFramebuffer;
				M.isWebGLCubeRenderTarget ? (X = ke[B], Te = !0) : M.useRenderbuffer ? X = W.get(M).__webglMultisampledFramebuffer : X = ke, _.copy(M.viewport), w.copy(M.scissor), D = M.scissorTest
			} else _.copy(U).multiplyScalar(R).floor(), w.copy(z).multiplyScalar(R).floor(), D = N;
			if (we.bindFramebuffer(36160, X) && xe.drawBuffers && H) {
				let Ce = !1;
				if (M)
					if (M.isWebGLMultipleRenderTargets) {
						let ke = M.texture;
						if (G.length !== ke.length || G[0] !== 36064) {
							for (let Ie = 0, He = ke.length; Ie < He; Ie++) G[Ie] = 36064 + Ie;
							G.length = ke.length, Ce = !0
						}
					} else (G.length !== 1 || G[0] !== 36064) && (G[0] = 36064, G.length = 1, Ce = !0);
				else (G.length !== 1 || G[0] !== 1029) && (G[0] = 1029, G.length = 1, Ce = !0);
				Ce && (xe.isWebGL2 ? J.drawBuffers(G) : be.get("WEBGL_draw_buffers").drawBuffersWEBGL(G))
			}
			if (we.viewport(_), we.scissor(w), we.setScissorTest(D), Te) {
				let Ce = W.get(M.texture);
				J.framebufferTexture2D(36160, 36064, 34069 + B, Ce.__webglTexture, k)
			} else if (Ae) {
				let Ce = W.get(M.texture),
					ke = B || 0;
				J.framebufferTextureLayer(36160, 36064, Ce.__webglTexture, k || 0, ke)
			}
			y = -1
		}, this.readRenderTargetPixels = function (M, B, k, H, X, Te, Ae) {
			if (!(M && M.isWebGLRenderTarget)) {
				console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
				return
			}
			let Le = W.get(M).__webglFramebuffer;
			if (M.isWebGLCubeRenderTarget && Ae !== void 0 && (Le = Le[Ae]), Le) {
				we.bindFramebuffer(36160, Le);
				try {
					let Ce = M.texture,
						ke = Ce.format,
						Ie = Ce.type;
					if (ke !== Tt && T.convert(ke) !== J.getParameter(35739)) {
						console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
						return
					}
					let He = Ie === Ii && (be.has("EXT_color_buffer_half_float") || xe.isWebGL2 && be.has("EXT_color_buffer_float"));
					if (Ie !== lt && T.convert(Ie) !== J.getParameter(35738) && !(Ie === ln && (xe.isWebGL2 || be.has("OES_texture_float") || be.has("WEBGL_color_buffer_float"))) && !He) {
						console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
						return
					}
					J.checkFramebufferStatus(36160) === 36053 ? B >= 0 && B <= M.width - H && k >= 0 && k <= M.height - X && J.readPixels(B, k, H, X, T.convert(ke), T.convert(Ie), Te) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")
				} finally {
					let Ce = b !== null ? W.get(b).__webglFramebuffer : null;
					we.bindFramebuffer(36160, Ce)
				}
			}
		}, this.copyFramebufferToTexture = function (M, B, k = 0) {
			let H = Math.pow(2, -k),
				X = Math.floor(B.image.width * H),
				Te = Math.floor(B.image.height * H),
				Ae = T.convert(B.format);
			xe.isWebGL2 && (Ae === 6407 && (Ae = 32849), Ae === 6408 && (Ae = 32856)), ee.setTexture2D(B, 0), J.copyTexImage2D(3553, k, Ae, M.x, M.y, X, Te, 0), we.unbindTexture()
		}, this.copyTextureToTexture = function (M, B, k, H = 0) {
			let X = B.image.width,
				Te = B.image.height,
				Ae = T.convert(k.format),
				Le = T.convert(k.type);
			ee.setTexture2D(k, 0), J.pixelStorei(37440, k.flipY), J.pixelStorei(37441, k.premultiplyAlpha), J.pixelStorei(3317, k.unpackAlignment), B.isDataTexture ? J.texSubImage2D(3553, H, M.x, M.y, X, Te, Ae, Le, B.image.data) : B.isCompressedTexture ? J.compressedTexSubImage2D(3553, H, M.x, M.y, B.mipmaps[0].width, B.mipmaps[0].height, Ae, B.mipmaps[0].data) : J.texSubImage2D(3553, H, M.x, M.y, Ae, Le, B.image), H === 0 && k.generateMipmaps && J.generateMipmap(3553), we.unbindTexture()
		}, this.copyTextureToTexture3D = function (M, B, k, H, X = 0) {
			if (v.isWebGL1Renderer) {
				console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
				return
			}
			let Te = M.max.x - M.min.x + 1,
				Ae = M.max.y - M.min.y + 1,
				Le = M.max.z - M.min.z + 1,
				Ce = T.convert(H.format),
				ke = T.convert(H.type),
				Ie;
			if (H.isDataTexture3D) ee.setTexture3D(H, 0), Ie = 32879;
			else if (H.isDataTexture2DArray) ee.setTexture2DArray(H, 0), Ie = 35866;
			else {
				console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
				return
			}
			J.pixelStorei(37440, H.flipY), J.pixelStorei(37441, H.premultiplyAlpha), J.pixelStorei(3317, H.unpackAlignment);
			let He = J.getParameter(3314),
				ht = J.getParameter(32878),
				Ei = J.getParameter(3316),
				Xe = J.getParameter(3315),
				vs = J.getParameter(32877),
				it = k.isCompressedTexture ? k.mipmaps[0] : k.image;
			J.pixelStorei(3314, it.width), J.pixelStorei(32878, it.height), J.pixelStorei(3316, M.min.x), J.pixelStorei(3315, M.min.y), J.pixelStorei(32877, M.min.z), k.isDataTexture || k.isDataTexture3D ? J.texSubImage3D(Ie, X, B.x, B.y, B.z, Te, Ae, Le, Ce, ke, it.data) : k.isCompressedTexture ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."), J.compressedTexSubImage3D(Ie, X, B.x, B.y, B.z, Te, Ae, Le, Ce, it.data)) : J.texSubImage3D(Ie, X, B.x, B.y, B.z, Te, Ae, Le, Ce, ke, it), J.pixelStorei(3314, He), J.pixelStorei(32878, ht), J.pixelStorei(3316, Ei), J.pixelStorei(3315, Xe), J.pixelStorei(32877, vs), X === 0 && H.generateMipmaps && J.generateMipmap(Ie), we.unbindTexture()
		}, this.initTexture = function (M) {
			ee.setTexture2D(M, 0), we.unbindTexture()
		}, this.resetState = function () {
			g = 0, m = 0, b = null, we.reset(), V.reset()
		}, typeof __THREE_DEVTOOLS__ != "undefined" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
			detail: this
		}))
	}
	Ze.prototype.isWebGLRenderer = !0;
	var Ys = class extends Ze { };
	Ys.prototype.isWebGL1Renderer = !0;
	var Fr = class {
		constructor(e, t = 25e-5) {
			this.name = "", this.color = new $(e), this.density = t
		}
		clone() {
			return new Fr(this.color, this.density)
		}
		toJSON() {
			return {
				type: "FogExp2",
				color: this.color.getHex(),
				density: this.density
			}
		}
	};
	Fr.prototype.isFogExp2 = !0;
	var Or = class {
		constructor(e, t = 1, n = 1e3) {
			this.name = "", this.color = new $(e), this.near = t, this.far = n
		}
		clone() {
			return new Or(this.color, this.near, this.far)
		}
		toJSON() {
			return {
				type: "Fog",
				color: this.color.getHex(),
				near: this.near,
				far: this.far
			}
		}
	};
	Or.prototype.isFog = !0;
	var mn = class extends _e {
		constructor() {
			super();
			this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0, typeof __THREE_DEVTOOLS__ != "undefined" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
				detail: this
			}))
		}
		copy(e, t) {
			return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.autoUpdate = e.autoUpdate, this.matrixAutoUpdate = e.matrixAutoUpdate, this
		}
		toJSON(e) {
			let t = super.toJSON(e);
			return this.fog !== null && (t.object.fog = this.fog.toJSON()), t
		}
	};
	mn.prototype.isScene = !0;
	var hi = class {
		constructor(e, t) {
			this.array = e, this.stride = t, this.count = e !== void 0 ? e.length / t : 0, this.usage = pr, this.updateRange = {
				offset: 0,
				count: -1
			}, this.version = 0, this.uuid = Wt()
		}
		onUploadCallback() { }
		set needsUpdate(e) {
			e === !0 && this.version++
		}
		setUsage(e) {
			return this.usage = e, this
		}
		copy(e) {
			return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this
		}
		copyAt(e, t, n) {
			e *= this.stride, n *= t.stride;
			for (let i = 0, s = this.stride; i < s; i++) this.array[e + i] = t.array[n + i];
			return this
		}
		set(e, t = 0) {
			return this.array.set(e, t), this
		}
		clone(e) {
			e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = Wt()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
			let t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),
				n = new this.constructor(t, this.stride);
			return n.setUsage(this.usage), n
		}
		onUpload(e) {
			return this.onUploadCallback = e, this
		}
		toJSON(e) {
			return e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = Wt()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = Array.prototype.slice.call(new Uint32Array(this.array.buffer))), {
				uuid: this.uuid,
				buffer: this.array.buffer._uuid,
				type: this.array.constructor.name,
				stride: this.stride
			}
		}
	};
	hi.prototype.isInterleavedBuffer = !0;
	var wt = new A,
		kn = class {
			constructor(e, t, n, i = !1) {
				this.name = "", this.data = e, this.itemSize = t, this.offset = n, this.normalized = i === !0
			}
			get count() {
				return this.data.count
			}
			get array() {
				return this.data.array
			}
			set needsUpdate(e) {
				this.data.needsUpdate = e
			}
			applyMatrix4(e) {
				for (let t = 0, n = this.data.count; t < n; t++) wt.x = this.getX(t), wt.y = this.getY(t), wt.z = this.getZ(t), wt.applyMatrix4(e), this.setXYZ(t, wt.x, wt.y, wt.z);
				return this
			}
			applyNormalMatrix(e) {
				for (let t = 0, n = this.count; t < n; t++) wt.x = this.getX(t), wt.y = this.getY(t), wt.z = this.getZ(t), wt.applyNormalMatrix(e), this.setXYZ(t, wt.x, wt.y, wt.z);
				return this
			}
			transformDirection(e) {
				for (let t = 0, n = this.count; t < n; t++) wt.x = this.getX(t), wt.y = this.getY(t), wt.z = this.getZ(t), wt.transformDirection(e), this.setXYZ(t, wt.x, wt.y, wt.z);
				return this
			}
			setX(e, t) {
				return this.data.array[e * this.data.stride + this.offset] = t, this
			}
			setY(e, t) {
				return this.data.array[e * this.data.stride + this.offset + 1] = t, this
			}
			setZ(e, t) {
				return this.data.array[e * this.data.stride + this.offset + 2] = t, this
			}
			setW(e, t) {
				return this.data.array[e * this.data.stride + this.offset + 3] = t, this
			}
			getX(e) {
				return this.data.array[e * this.data.stride + this.offset]
			}
			getY(e) {
				return this.data.array[e * this.data.stride + this.offset + 1]
			}
			getZ(e) {
				return this.data.array[e * this.data.stride + this.offset + 2]
			}
			getW(e) {
				return this.data.array[e * this.data.stride + this.offset + 3]
			}
			setXY(e, t, n) {
				return e = e * this.data.stride + this.offset, this.data.array[e + 0] = t, this.data.array[e + 1] = n, this
			}
			setXYZ(e, t, n, i) {
				return e = e * this.data.stride + this.offset, this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = i, this
			}
			setXYZW(e, t, n, i, s) {
				return e = e * this.data.stride + this.offset, this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = i, this.data.array[e + 3] = s, this
			}
			clone(e) {
				if (e === void 0) {
					console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data.");
					let t = [];
					for (let n = 0; n < this.count; n++) {
						let i = n * this.data.stride + this.offset;
						for (let s = 0; s < this.itemSize; s++) t.push(this.data.array[i + s])
					}
					return new pe(new this.array.constructor(t), this.itemSize, this.normalized)
				} else return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.clone(e)), new kn(e.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized)
			}
			toJSON(e) {
				if (e === void 0) {
					console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data.");
					let t = [];
					for (let n = 0; n < this.count; n++) {
						let i = n * this.data.stride + this.offset;
						for (let s = 0; s < this.itemSize; s++) t.push(this.data.array[i + s])
					}
					return {
						itemSize: this.itemSize,
						type: this.array.constructor.name,
						array: t,
						normalized: this.normalized
					}
				} else return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)), {
					isInterleavedBufferAttribute: !0,
					itemSize: this.itemSize,
					data: this.data.uuid,
					offset: this.offset,
					normalized: this.normalized
				}
			}
		};
	kn.prototype.isInterleavedBufferAttribute = !0;
	var Xi = class extends tt {
		constructor(e) {
			super();
			this.type = "SpriteMaterial", this.color = new $(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.setValues(e)
		}
		copy(e) {
			return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.rotation = e.rotation, this.sizeAttenuation = e.sizeAttenuation, this
		}
	};
	Xi.prototype.isSpriteMaterial = !0;
	var Nr, js = new A,
		Hr = new A,
		zr = new A,
		Gr = new O,
		Xs = new O,
		cf = new ge,
		Ka = new A,
		Qs = new A,
		$a = new A,
		uf = new O,
		gc = new O,
		hf = new O,
		Qi = class extends _e {
			constructor(e) {
				super();
				if (this.type = "Sprite", Nr === void 0) {
					Nr = new de;
					let t = new Float32Array([-.5, -.5, 0, 0, 0, .5, -.5, 0, 1, 0, .5, .5, 0, 1, 1, -.5, .5, 0, 0, 1]),
						n = new hi(t, 5);
					Nr.setIndex([0, 1, 2, 0, 2, 3]), Nr.setAttribute("position", new kn(n, 3, 0, !1)), Nr.setAttribute("uv", new kn(n, 2, 3, !1))
				}
				this.geometry = Nr, this.material = e !== void 0 ? e : new Xi, this.center = new O(.5, .5)
			}
			raycast(e, t) {
				e.camera === null && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), Hr.setFromMatrixScale(this.matrixWorld), cf.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), zr.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && Hr.multiplyScalar(-zr.z);
				let n = this.material.rotation,
					i, s;
				n !== 0 && (s = Math.cos(n), i = Math.sin(n));
				let a = this.center;
				eo(Ka.set(-.5, -.5, 0), zr, a, Hr, i, s), eo(Qs.set(.5, -.5, 0), zr, a, Hr, i, s), eo($a.set(.5, .5, 0), zr, a, Hr, i, s), uf.set(0, 0), gc.set(1, 0), hf.set(1, 1);
				let o = e.ray.intersectTriangle(Ka, Qs, $a, !1, js);
				if (o === null && (eo(Qs.set(-.5, .5, 0), zr, a, Hr, i, s), gc.set(0, 1), o = e.ray.intersectTriangle(Ka, $a, Qs, !1, js), o === null)) return;
				let l = e.ray.origin.distanceTo(js);
				l < e.near || l > e.far || t.push({
					distance: l,
					point: js.clone(),
					uv: pt.getUV(js, Ka, Qs, $a, uf, gc, hf, new O),
					face: null,
					object: this
				})
			}
			copy(e) {
				return super.copy(e), e.center !== void 0 && this.center.copy(e.center), this.material = e.material, this
			}
		};
	Qi.prototype.isSprite = !0;

	function eo(r, e, t, n, i, s) {
		Gr.subVectors(r, t).addScalar(.5).multiply(n), i !== void 0 ? (Xs.x = s * Gr.x - i * Gr.y, Xs.y = i * Gr.x + s * Gr.y) : Xs.copy(Gr), r.copy(e), r.x += Xs.x, r.y += Xs.y, r.applyMatrix4(cf)
	}
	var to = new A,
		df = new A,
		kr = class extends _e {
			constructor() {
				super();
				this._currentLevel = 0, this.type = "LOD", Object.defineProperties(this, {
					levels: {
						enumerable: !0,
						value: []
					},
					isLOD: {
						value: !0
					}
				}), this.autoUpdate = !0
			}
			copy(e) {
				super.copy(e, !1);
				let t = e.levels;
				for (let n = 0, i = t.length; n < i; n++) {
					let s = t[n];
					this.addLevel(s.object.clone(), s.distance)
				}
				return this.autoUpdate = e.autoUpdate, this
			}
			addLevel(e, t = 0) {
				t = Math.abs(t);
				let n = this.levels,
					i;
				for (i = 0; i < n.length && !(t < n[i].distance); i++);
				return n.splice(i, 0, {
					distance: t,
					object: e
				}), this.add(e), this
			}
			getCurrentLevel() {
				return this._currentLevel
			}
			getObjectForDistance(e) {
				let t = this.levels;
				if (t.length > 0) {
					let n, i;
					for (n = 1, i = t.length; n < i && !(e < t[n].distance); n++);
					return t[n - 1].object
				}
				return null
			}
			raycast(e, t) {
				if (this.levels.length > 0) {
					to.setFromMatrixPosition(this.matrixWorld);
					let i = e.ray.origin.distanceTo(to);
					this.getObjectForDistance(i).raycast(e, t)
				}
			}
			update(e) {
				let t = this.levels;
				if (t.length > 1) {
					to.setFromMatrixPosition(e.matrixWorld), df.setFromMatrixPosition(this.matrixWorld);
					let n = to.distanceTo(df) / e.zoom;
					t[0].object.visible = !0;
					let i, s;
					for (i = 1, s = t.length; i < s && n >= t[i].distance; i++) t[i - 1].object.visible = !1, t[i].object.visible = !0;
					for (this._currentLevel = i - 1; i < s; i++) t[i].object.visible = !1
				}
			}
			toJSON(e) {
				let t = super.toJSON(e);
				this.autoUpdate === !1 && (t.object.autoUpdate = !1), t.object.levels = [];
				let n = this.levels;
				for (let i = 0, s = n.length; i < s; i++) {
					let a = n[i];
					t.object.levels.push({
						object: a.object.uuid,
						distance: a.distance
					})
				}
				return t
			}
		},
		ff = new A,
		pf = new Ve,
		mf = new Ve,
		Vy = new A,
		gf = new ge,
		qs = class extends ze {
			constructor(e, t) {
				super(e, t);
				this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new ge, this.bindMatrixInverse = new ge
			}
			copy(e) {
				return super.copy(e), this.bindMode = e.bindMode, this.bindMatrix.copy(e.bindMatrix), this.bindMatrixInverse.copy(e.bindMatrixInverse), this.skeleton = e.skeleton, this
			}
			bind(e, t) {
				this.skeleton = e, t === void 0 && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.copy(t).invert()
			}
			pose() {
				this.skeleton.pose()
			}
			normalizeSkinWeights() {
				let e = new Ve,
					t = this.geometry.attributes.skinWeight;
				for (let n = 0, i = t.count; n < i; n++) {
					e.x = t.getX(n), e.y = t.getY(n), e.z = t.getZ(n), e.w = t.getW(n);
					let s = 1 / e.manhattanLength();
					s !== 1 / 0 ? e.multiplyScalar(s) : e.set(1, 0, 0, 0), t.setXYZW(n, e.x, e.y, e.z, e.w)
				}
			}
			updateMatrixWorld(e) {
				super.updateMatrixWorld(e), this.bindMode === "attached" ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === "detached" ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode)
			}
			boneTransform(e, t) {
				let n = this.skeleton,
					i = this.geometry;
				pf.fromBufferAttribute(i.attributes.skinIndex, e), mf.fromBufferAttribute(i.attributes.skinWeight, e), ff.copy(t).applyMatrix4(this.bindMatrix), t.set(0, 0, 0);
				for (let s = 0; s < 4; s++) {
					let a = mf.getComponent(s);
					if (a !== 0) {
						let o = pf.getComponent(s);
						gf.multiplyMatrices(n.bones[o].matrixWorld, n.boneInverses[o]), t.addScaledVector(Vy.copy(ff).applyMatrix4(gf), a)
					}
				}
				return t.applyMatrix4(this.bindMatrixInverse)
			}
		};
	qs.prototype.isSkinnedMesh = !0;
	var Zs = class extends _e {
		constructor() {
			super();
			this.type = "Bone"
		}
	};
	Zs.prototype.isBone = !0;
	var Vn = class extends ot {
		constructor(e = null, t = 1, n = 1, i, s, a, o, l, c = At, u = At, h, d) {
			super(null, a, o, l, c, u, i, s, h, d);
			this.image = {
				data: e,
				width: t,
				height: n
			}, this.magFilter = c, this.minFilter = u, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.needsUpdate = !0
		}
	};
	Vn.prototype.isDataTexture = !0;
	var vf = new ge,
		Wy = new ge,
		Js = class {
			constructor(e = [], t = []) {
				this.uuid = Wt(), this.bones = e.slice(0), this.boneInverses = t, this.boneMatrices = null, this.boneTexture = null, this.boneTextureSize = 0, this.frame = -1, this.init()
			}
			init() {
				let e = this.bones,
					t = this.boneInverses;
				if (this.boneMatrices = new Float32Array(e.length * 16), t.length === 0) this.calculateInverses();
				else if (e.length !== t.length) {
					console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."), this.boneInverses = [];
					for (let n = 0, i = this.bones.length; n < i; n++) this.boneInverses.push(new ge)
				}
			}
			calculateInverses() {
				this.boneInverses.length = 0;
				for (let e = 0, t = this.bones.length; e < t; e++) {
					let n = new ge;
					this.bones[e] && n.copy(this.bones[e].matrixWorld).invert(), this.boneInverses.push(n)
				}
			}
			pose() {
				for (let e = 0, t = this.bones.length; e < t; e++) {
					let n = this.bones[e];
					n && n.matrixWorld.copy(this.boneInverses[e]).invert()
				}
				for (let e = 0, t = this.bones.length; e < t; e++) {
					let n = this.bones[e];
					n && (n.parent && n.parent.isBone ? (n.matrix.copy(n.parent.matrixWorld).invert(), n.matrix.multiply(n.matrixWorld)) : n.matrix.copy(n.matrixWorld), n.matrix.decompose(n.position, n.quaternion, n.scale))
				}
			}
			update() {
				let e = this.bones,
					t = this.boneInverses,
					n = this.boneMatrices,
					i = this.boneTexture;
				for (let s = 0, a = e.length; s < a; s++) {
					let o = e[s] ? e[s].matrixWorld : Wy;
					vf.multiplyMatrices(o, t[s]), vf.toArray(n, s * 16)
				}
				i !== null && (i.needsUpdate = !0)
			}
			clone() {
				return new Js(this.bones, this.boneInverses)
			}
			computeBoneTexture() {
				let e = Math.sqrt(this.bones.length * 4);
				e = ud(e), e = Math.max(e, 4);
				let t = new Float32Array(e * e * 4);
				t.set(this.boneMatrices);
				let n = new Vn(t, e, e, Tt, ln);
				return this.boneMatrices = t, this.boneTexture = n, this.boneTextureSize = e, this
			}
			getBoneByName(e) {
				for (let t = 0, n = this.bones.length; t < n; t++) {
					let i = this.bones[t];
					if (i.name === e) return i
				}
			}
			dispose() {
				this.boneTexture !== null && (this.boneTexture.dispose(), this.boneTexture = null)
			}
			fromJSON(e, t) {
				this.uuid = e.uuid;
				for (let n = 0, i = e.bones.length; n < i; n++) {
					let s = e.bones[n],
						a = t[s];
					a === void 0 && (console.warn("THREE.Skeleton: No bone found with UUID:", s), a = new Zs), this.bones.push(a), this.boneInverses.push(new ge().fromArray(e.boneInverses[n]))
				}
				return this.init(), this
			}
			toJSON() {
				let e = {
					metadata: {
						version: 4.5,
						type: "Skeleton",
						generator: "Skeleton.toJSON"
					},
					bones: [],
					boneInverses: []
				};
				e.uuid = this.uuid;
				let t = this.bones,
					n = this.boneInverses;
				for (let i = 0, s = t.length; i < s; i++) {
					let a = t[i];
					e.bones.push(a.uuid);
					let o = n[i];
					e.boneInverses.push(o.toArray())
				}
				return e
			}
		},
		di = class extends pe {
			constructor(e, t, n, i = 1) {
				typeof n == "number" && (i = n, n = !1, console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument."));
				super(e, t, n);
				this.meshPerAttribute = i
			}
			copy(e) {
				return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this
			}
			toJSON() {
				let e = super.toJSON();
				return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e
			}
		};
	di.prototype.isInstancedBufferAttribute = !0;
	var xf = new ge,
		yf = new ge,
		no = [],
		Ks = new ze,
		io = class extends ze {
			constructor(e, t, n) {
				super(e, t);
				this.instanceMatrix = new di(new Float32Array(n * 16), 16), this.instanceColor = null, this.count = n, this.frustumCulled = !1
			}
			copy(e) {
				return super.copy(e), this.instanceMatrix.copy(e.instanceMatrix), e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, this
			}
			getColorAt(e, t) {
				t.fromArray(this.instanceColor.array, e * 3)
			}
			getMatrixAt(e, t) {
				t.fromArray(this.instanceMatrix.array, e * 16)
			}
			raycast(e, t) {
				let n = this.matrixWorld,
					i = this.count;
				if (Ks.geometry = this.geometry, Ks.material = this.material, Ks.material !== void 0)
					for (let s = 0; s < i; s++) {
						this.getMatrixAt(s, xf), yf.multiplyMatrices(n, xf), Ks.matrixWorld = yf, Ks.raycast(e, no);
						for (let a = 0, o = no.length; a < o; a++) {
							let l = no[a];
							l.instanceId = s, l.object = this, t.push(l)
						}
						no.length = 0
					}
			}
			setColorAt(e, t) {
				this.instanceColor === null && (this.instanceColor = new di(new Float32Array(this.instanceMatrix.count * 3), 3)), t.toArray(this.instanceColor.array, e * 3)
			}
			setMatrixAt(e, t) {
				t.toArray(this.instanceMatrix.array, e * 16)
			}
			updateMorphTargets() { }
			dispose() {
				this.dispatchEvent({
					type: "dispose"
				})
			}
		};
	io.prototype.isInstancedMesh = !0;
	var Ke = class extends tt {
		constructor(e) {
			super();
			this.type = "LineBasicMaterial", this.color = new $(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.setValues(e)
		}
		copy(e) {
			return super.copy(e), this.color.copy(e.color), this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this
		}
	};
	Ke.prototype.isLineBasicMaterial = !0;
	var wf = new A,
		bf = new A,
		Af = new ge,
		vc = new On,
		ro = new Un,
		kt = class extends _e {
			constructor(e = new de, t = new Ke) {
				super();
				this.type = "Line", this.geometry = e, this.material = t, this.updateMorphTargets()
			}
			copy(e) {
				return super.copy(e), this.material = e.material, this.geometry = e.geometry, this
			}
			computeLineDistances() {
				let e = this.geometry;
				if (e.isBufferGeometry)
					if (e.index === null) {
						let t = e.attributes.position,
							n = [0];
						for (let i = 1, s = t.count; i < s; i++) wf.fromBufferAttribute(t, i - 1), bf.fromBufferAttribute(t, i), n[i] = n[i - 1], n[i] += wf.distanceTo(bf);
						e.setAttribute("lineDistance", new ce(n, 1))
					} else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
				else e.isGeometry && console.error("THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
				return this
			}
			raycast(e, t) {
				let n = this.geometry,
					i = this.matrixWorld,
					s = e.params.Line.threshold,
					a = n.drawRange;
				if (n.boundingSphere === null && n.computeBoundingSphere(), ro.copy(n.boundingSphere), ro.applyMatrix4(i), ro.radius += s, e.ray.intersectsSphere(ro) === !1) return;
				Af.copy(i).invert(), vc.copy(e.ray).applyMatrix4(Af);
				let o = s / ((this.scale.x + this.scale.y + this.scale.z) / 3),
					l = o * o,
					c = new A,
					u = new A,
					h = new A,
					d = new A,
					f = this.isLineSegments ? 2 : 1;
				if (n.isBufferGeometry) {
					let p = n.index,
						x = n.attributes.position;
					if (p !== null) {
						let g = Math.max(0, a.start),
							m = Math.min(p.count, a.start + a.count);
						for (let b = g, y = m - 1; b < y; b += f) {
							let E = p.getX(b),
								_ = p.getX(b + 1);
							if (c.fromBufferAttribute(x, E), u.fromBufferAttribute(x, _), vc.distanceSqToSegment(c, u, d, h) > l) continue;
							d.applyMatrix4(this.matrixWorld);
							let D = e.ray.origin.distanceTo(d);
							D < e.near || D > e.far || t.push({
								distance: D,
								point: h.clone().applyMatrix4(this.matrixWorld),
								index: b,
								face: null,
								faceIndex: null,
								object: this
							})
						}
					} else {
						let g = Math.max(0, a.start),
							m = Math.min(x.count, a.start + a.count);
						for (let b = g, y = m - 1; b < y; b += f) {
							if (c.fromBufferAttribute(x, b), u.fromBufferAttribute(x, b + 1), vc.distanceSqToSegment(c, u, d, h) > l) continue;
							d.applyMatrix4(this.matrixWorld);
							let _ = e.ray.origin.distanceTo(d);
							_ < e.near || _ > e.far || t.push({
								distance: _,
								point: h.clone().applyMatrix4(this.matrixWorld),
								index: b,
								face: null,
								faceIndex: null,
								object: this
							})
						}
					}
				} else n.isGeometry && console.error("THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")
			}
			updateMorphTargets() {
				let e = this.geometry;
				if (e.isBufferGeometry) {
					let t = e.morphAttributes,
						n = Object.keys(t);
					if (n.length > 0) {
						let i = t[n[0]];
						if (i !== void 0) {
							this.morphTargetInfluences = [], this.morphTargetDictionary = {};
							for (let s = 0, a = i.length; s < a; s++) {
								let o = i[s].name || String(s);
								this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s
							}
						}
					}
				} else {
					let t = e.morphTargets;
					t !== void 0 && t.length > 0 && console.error("THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")
				}
			}
		};
	kt.prototype.isLine = !0;
	var Ef = new A,
		Mf = new A,
		Mt = class extends kt {
			constructor(e, t) {
				super(e, t);
				this.type = "LineSegments"
			}
			computeLineDistances() {
				let e = this.geometry;
				if (e.isBufferGeometry)
					if (e.index === null) {
						let t = e.attributes.position,
							n = [];
						for (let i = 0, s = t.count; i < s; i += 2) Ef.fromBufferAttribute(t, i), Mf.fromBufferAttribute(t, i + 1), n[i] = i === 0 ? 0 : n[i - 1], n[i + 1] = n[i] + Ef.distanceTo(Mf);
						e.setAttribute("lineDistance", new ce(n, 1))
					} else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
				else e.isGeometry && console.error("THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
				return this
			}
		};
	Mt.prototype.isLineSegments = !0;
	var so = class extends kt {
		constructor(e, t) {
			super(e, t);
			this.type = "LineLoop"
		}
	};
	so.prototype.isLineLoop = !0;
	var Xt = class extends tt {
		constructor(e) {
			super();
			this.type = "PointsMaterial", this.color = new $(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.setValues(e)
		}
		copy(e) {
			return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this
		}
	};
	Xt.prototype.isPointsMaterial = !0;
	var Sf = new ge,
		xc = new On,
		ao = new Un,
		oo = new A,
		Ot = class extends _e {
			constructor(e = new de, t = new Xt) {
				super();
				this.type = "Points", this.geometry = e, this.material = t, this.updateMorphTargets()
			}
			copy(e) {
				return super.copy(e), this.material = e.material, this.geometry = e.geometry, this
			}
			raycast(e, t) {
				let n = this.geometry,
					i = this.matrixWorld,
					s = e.params.Points.threshold,
					a = n.drawRange;
				if (n.boundingSphere === null && n.computeBoundingSphere(), ao.copy(n.boundingSphere), ao.applyMatrix4(i), ao.radius += s, e.ray.intersectsSphere(ao) === !1) return;
				Sf.copy(i).invert(), xc.copy(e.ray).applyMatrix4(Sf);
				let o = s / ((this.scale.x + this.scale.y + this.scale.z) / 3),
					l = o * o;
				if (n.isBufferGeometry) {
					let c = n.index,
						h = n.attributes.position;
					if (c !== null) {
						let d = Math.max(0, a.start),
							f = Math.min(c.count, a.start + a.count);
						for (let p = d, v = f; p < v; p++) {
							let x = c.getX(p);
							oo.fromBufferAttribute(h, x), _f(oo, x, l, i, e, t, this)
						}
					} else {
						let d = Math.max(0, a.start),
							f = Math.min(h.count, a.start + a.count);
						for (let p = d, v = f; p < v; p++) oo.fromBufferAttribute(h, p), _f(oo, p, l, i, e, t, this)
					}
				} else console.error("THREE.Points.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")
			}
			updateMorphTargets() {
				let e = this.geometry;
				if (e.isBufferGeometry) {
					let t = e.morphAttributes,
						n = Object.keys(t);
					if (n.length > 0) {
						let i = t[n[0]];
						if (i !== void 0) {
							this.morphTargetInfluences = [], this.morphTargetDictionary = {};
							for (let s = 0, a = i.length; s < a; s++) {
								let o = i[s].name || String(s);
								this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s
							}
						}
					}
				} else {
					let t = e.morphTargets;
					t !== void 0 && t.length > 0 && console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")
				}
			}
		};
	Ot.prototype.isPoints = !0;

	function _f(r, e, t, n, i, s, a) {
		let o = xc.distanceSqToPoint(r);
		if (o < t) {
			let l = new A;
			xc.closestPointToPoint(r, l), l.applyMatrix4(n);
			let c = i.ray.origin.distanceTo(l);
			if (c < i.near || c > i.far) return;
			s.push({
				distance: c,
				distanceToRay: Math.sqrt(o),
				point: l,
				index: e,
				face: null,
				object: a
			})
		}
	}
	var yc = class extends ot {
		constructor(e, t, n, i, s, a, o, l, c) {
			super(e, t, n, i, s, a, o, l, c);
			this.format = o !== void 0 ? o : Zn, this.minFilter = a !== void 0 ? a : et, this.magFilter = s !== void 0 ? s : et, this.generateMipmaps = !1;
			let u = this;

			function h() {
				u.needsUpdate = !0, e.requestVideoFrameCallback(h)
			}
			"requestVideoFrameCallback" in e && e.requestVideoFrameCallback(h)
		}
		clone() {
			return new this.constructor(this.image).copy(this)
		}
		update() {
			let e = this.image;
			"requestVideoFrameCallback" in e === !1 && e.readyState >= e.HAVE_CURRENT_DATA && (this.needsUpdate = !0)
		}
	};
	yc.prototype.isVideoTexture = !0;
	var lo = class extends ot {
		constructor(e, t, n, i, s, a, o, l, c, u, h, d) {
			super(null, a, o, l, c, u, i, s, h, d);
			this.image = {
				width: t,
				height: n
			}, this.mipmaps = e, this.flipY = !1, this.generateMipmaps = !1
		}
	};
	lo.prototype.isCompressedTexture = !0;
	var wc = class extends ot {
		constructor(e, t, n, i, s, a, o, l, c) {
			super(e, t, n, i, s, a, o, l, c);
			this.needsUpdate = !0
		}
	};
	wc.prototype.isCanvasTexture = !0;
	var Vr = class extends de {
		constructor(e = 1, t = 8, n = 0, i = Math.PI * 2) {
			super();
			this.type = "CircleGeometry", this.parameters = {
				radius: e,
				segments: t,
				thetaStart: n,
				thetaLength: i
			}, t = Math.max(3, t);
			let s = [],
				a = [],
				o = [],
				l = [],
				c = new A,
				u = new O;
			a.push(0, 0, 0), o.push(0, 0, 1), l.push(.5, .5);
			for (let h = 0, d = 3; h <= t; h++, d += 3) {
				let f = n + h / t * i;
				c.x = e * Math.cos(f), c.y = e * Math.sin(f), a.push(c.x, c.y, c.z), o.push(0, 0, 1), u.x = (a[d] / e + 1) / 2, u.y = (a[d + 1] / e + 1) / 2, l.push(u.x, u.y)
			}
			for (let h = 1; h <= t; h++) s.push(h, h + 1, 0);
			this.setIndex(s), this.setAttribute("position", new ce(a, 3)), this.setAttribute("normal", new ce(o, 3)), this.setAttribute("uv", new ce(l, 2))
		}
		static fromJSON(e) {
			return new Vr(e.radius, e.segments, e.thetaStart, e.thetaLength)
		}
	},
		fi = class extends de {
			constructor(e = 1, t = 1, n = 1, i = 8, s = 1, a = !1, o = 0, l = Math.PI * 2) {
				super();
				this.type = "CylinderGeometry", this.parameters = {
					radiusTop: e,
					radiusBottom: t,
					height: n,
					radialSegments: i,
					heightSegments: s,
					openEnded: a,
					thetaStart: o,
					thetaLength: l
				};
				let c = this;
				i = Math.floor(i), s = Math.floor(s);
				let u = [],
					h = [],
					d = [],
					f = [],
					p = 0,
					v = [],
					x = n / 2,
					g = 0;
				m(), a === !1 && (e > 0 && b(!0), t > 0 && b(!1)), this.setIndex(u), this.setAttribute("position", new ce(h, 3)), this.setAttribute("normal", new ce(d, 3)), this.setAttribute("uv", new ce(f, 2));

				function m() {
					let y = new A,
						E = new A,
						_ = 0,
						w = (t - e) / n;
					for (let D = 0; D <= s; D++) {
						let I = [],
							L = D / s,
							R = L * (t - e) + e;
						for (let Z = 0; Z <= i; Z++) {
							let F = Z / i,
								U = F * l + o,
								z = Math.sin(U),
								N = Math.cos(U);
							E.x = R * z, E.y = -L * n + x, E.z = R * N, h.push(E.x, E.y, E.z), y.set(z, w, N).normalize(), d.push(y.x, y.y, y.z), f.push(F, 1 - L), I.push(p++)
						}
						v.push(I)
					}
					for (let D = 0; D < i; D++)
						for (let I = 0; I < s; I++) {
							let L = v[I][D],
								R = v[I + 1][D],
								Z = v[I + 1][D + 1],
								F = v[I][D + 1];
							u.push(L, R, F), u.push(R, Z, F), _ += 6
						}
					c.addGroup(g, _, 0), g += _
				}

				function b(y) {
					let E = p,
						_ = new O,
						w = new A,
						D = 0,
						I = y === !0 ? e : t,
						L = y === !0 ? 1 : -1;
					for (let Z = 1; Z <= i; Z++) h.push(0, x * L, 0), d.push(0, L, 0), f.push(.5, .5), p++;
					let R = p;
					for (let Z = 0; Z <= i; Z++) {
						let U = Z / i * l + o,
							z = Math.cos(U),
							N = Math.sin(U);
						w.x = I * N, w.y = x * L, w.z = I * z, h.push(w.x, w.y, w.z), d.push(0, L, 0), _.x = z * .5 + .5, _.y = N * .5 * L + .5, f.push(_.x, _.y), p++
					}
					for (let Z = 0; Z < i; Z++) {
						let F = E + Z,
							U = R + Z;
						y === !0 ? u.push(U, U + 1, F) : u.push(U + 1, U, F), D += 3
					}
					c.addGroup(g, D, y === !0 ? 1 : 2), g += D
				}
			}
			static fromJSON(e) {
				return new fi(e.radiusTop, e.radiusBottom, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength)
			}
		},
		Wr = class extends fi {
			constructor(e = 1, t = 1, n = 8, i = 1, s = !1, a = 0, o = Math.PI * 2) {
				super(0, e, t, n, i, s, a, o);
				this.type = "ConeGeometry", this.parameters = {
					radius: e,
					height: t,
					radialSegments: n,
					heightSegments: i,
					openEnded: s,
					thetaStart: a,
					thetaLength: o
				}
			}
			static fromJSON(e) {
				return new Wr(e.radius, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength)
			}
		},
		Mn = class extends de {
			constructor(e = [], t = [], n = 1, i = 0) {
				super();
				this.type = "PolyhedronGeometry", this.parameters = {
					vertices: e,
					indices: t,
					radius: n,
					detail: i
				};
				let s = [],
					a = [];
				o(i), c(n), u(), this.setAttribute("position", new ce(s, 3)), this.setAttribute("normal", new ce(s.slice(), 3)), this.setAttribute("uv", new ce(a, 2)), i === 0 ? this.computeVertexNormals() : this.normalizeNormals();

				function o(m) {
					let b = new A,
						y = new A,
						E = new A;
					for (let _ = 0; _ < t.length; _ += 3) f(t[_ + 0], b), f(t[_ + 1], y), f(t[_ + 2], E), l(b, y, E, m)
				}

				function l(m, b, y, E) {
					let _ = E + 1,
						w = [];
					for (let D = 0; D <= _; D++) {
						w[D] = [];
						let I = m.clone().lerp(y, D / _),
							L = b.clone().lerp(y, D / _),
							R = _ - D;
						for (let Z = 0; Z <= R; Z++) Z === 0 && D === _ ? w[D][Z] = I : w[D][Z] = I.clone().lerp(L, Z / R)
					}
					for (let D = 0; D < _; D++)
						for (let I = 0; I < 2 * (_ - D) - 1; I++) {
							let L = Math.floor(I / 2);
							I % 2 == 0 ? (d(w[D][L + 1]), d(w[D + 1][L]), d(w[D][L])) : (d(w[D][L + 1]), d(w[D + 1][L + 1]), d(w[D + 1][L]))
						}
				}

				function c(m) {
					let b = new A;
					for (let y = 0; y < s.length; y += 3) b.x = s[y + 0], b.y = s[y + 1], b.z = s[y + 2], b.normalize().multiplyScalar(m), s[y + 0] = b.x, s[y + 1] = b.y, s[y + 2] = b.z
				}

				function u() {
					let m = new A;
					for (let b = 0; b < s.length; b += 3) {
						m.x = s[b + 0], m.y = s[b + 1], m.z = s[b + 2];
						let y = x(m) / 2 / Math.PI + .5,
							E = g(m) / Math.PI + .5;
						a.push(y, 1 - E)
					}
					p(), h()
				}

				function h() {
					for (let m = 0; m < a.length; m += 6) {
						let b = a[m + 0],
							y = a[m + 2],
							E = a[m + 4],
							_ = Math.max(b, y, E),
							w = Math.min(b, y, E);
						_ > .9 && w < .1 && (b < .2 && (a[m + 0] += 1), y < .2 && (a[m + 2] += 1), E < .2 && (a[m + 4] += 1))
					}
				}

				function d(m) {
					s.push(m.x, m.y, m.z)
				}

				function f(m, b) {
					let y = m * 3;
					b.x = e[y + 0], b.y = e[y + 1], b.z = e[y + 2]
				}

				function p() {
					let m = new A,
						b = new A,
						y = new A,
						E = new A,
						_ = new O,
						w = new O,
						D = new O;
					for (let I = 0, L = 0; I < s.length; I += 9, L += 6) {
						m.set(s[I + 0], s[I + 1], s[I + 2]), b.set(s[I + 3], s[I + 4], s[I + 5]), y.set(s[I + 6], s[I + 7], s[I + 8]), _.set(a[L + 0], a[L + 1]), w.set(a[L + 2], a[L + 3]), D.set(a[L + 4], a[L + 5]), E.copy(m).add(b).add(y).divideScalar(3);
						let R = x(E);
						v(_, L + 0, m, R), v(w, L + 2, b, R), v(D, L + 4, y, R)
					}
				}

				function v(m, b, y, E) {
					E < 0 && m.x === 1 && (a[b] = m.x - 1), y.x === 0 && y.z === 0 && (a[b] = E / 2 / Math.PI + .5)
				}

				function x(m) {
					return Math.atan2(m.z, -m.x)
				}

				function g(m) {
					return Math.atan2(-m.y, Math.sqrt(m.x * m.x + m.z * m.z))
				}
			}
			static fromJSON(e) {
				return new Mn(e.vertices, e.indices, e.radius, e.details)
			}
		},
		Yr = class extends Mn {
			constructor(e = 1, t = 0) {
				let n = (1 + Math.sqrt(5)) / 2,
					i = 1 / n,
					s = [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -i, -n, 0, -i, n, 0, i, -n, 0, i, n, -i, -n, 0, -i, n, 0, i, -n, 0, i, n, 0, -n, 0, -i, n, 0, -i, -n, 0, i, n, 0, i],
					a = [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9];
				super(s, a, e, t);
				this.type = "DodecahedronGeometry", this.parameters = {
					radius: e,
					detail: t
				}
			}
			static fromJSON(e) {
				return new Yr(e.radius, e.detail)
			}
		},
		co = new A,
		uo = new A,
		bc = new A,
		ho = new pt,
		fo = class extends de {
			constructor(e = null, t = 1) {
				super();
				if (this.type = "EdgesGeometry", this.parameters = {
					geometry: e,
					thresholdAngle: t
				}, e !== null) {
					let i = Math.pow(10, 4),
						s = Math.cos(Oi * t),
						a = e.getIndex(),
						o = e.getAttribute("position"),
						l = a ? a.count : o.count,
						c = [0, 0, 0],
						u = ["a", "b", "c"],
						h = new Array(3),
						d = {},
						f = [];
					for (let p = 0; p < l; p += 3) {
						a ? (c[0] = a.getX(p), c[1] = a.getX(p + 1), c[2] = a.getX(p + 2)) : (c[0] = p, c[1] = p + 1, c[2] = p + 2);
						let {
							a: v,
							b: x,
							c: g
						} = ho;
						if (v.fromBufferAttribute(o, c[0]), x.fromBufferAttribute(o, c[1]), g.fromBufferAttribute(o, c[2]), ho.getNormal(bc), h[0] = `${Math.round(v.x * i)},${Math.round(v.y * i)},${Math.round(v.z * i)}`, h[1] = `${Math.round(x.x * i)},${Math.round(x.y * i)},${Math.round(x.z * i)}`, h[2] = `${Math.round(g.x * i)},${Math.round(g.y * i)},${Math.round(g.z * i)}`, !(h[0] === h[1] || h[1] === h[2] || h[2] === h[0]))
							for (let m = 0; m < 3; m++) {
								let b = (m + 1) % 3,
									y = h[m],
									E = h[b],
									_ = ho[u[m]],
									w = ho[u[b]],
									D = `${y}_${E}`,
									I = `${E}_${y}`;
								I in d && d[I] ? (bc.dot(d[I].normal) <= s && (f.push(_.x, _.y, _.z), f.push(w.x, w.y, w.z)), d[I] = null) : D in d || (d[D] = {
									index0: c[m],
									index1: c[b],
									normal: bc.clone()
								})
							}
					}
					for (let p in d)
						if (d[p]) {
							let {
								index0: v,
								index1: x
							} = d[p];
							co.fromBufferAttribute(o, v), uo.fromBufferAttribute(o, x), f.push(co.x, co.y, co.z), f.push(uo.x, uo.y, uo.z)
						} this.setAttribute("position", new ce(f, 3))
				}
			}
		},
		Vt = class {
			constructor() {
				this.type = "Curve", this.arcLengthDivisions = 200
			}
			getPoint() {
				return console.warn("THREE.Curve: .getPoint() not implemented."), null
			}
			getPointAt(e, t) {
				let n = this.getUtoTmapping(e);
				return this.getPoint(n, t)
			}
			getPoints(e = 5) {
				let t = [];
				for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
				return t
			}
			getSpacedPoints(e = 5) {
				let t = [];
				for (let n = 0; n <= e; n++) t.push(this.getPointAt(n / e));
				return t
			}
			getLength() {
				let e = this.getLengths();
				return e[e.length - 1]
			}
			getLengths(e = this.arcLengthDivisions) {
				if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate) return this.cacheArcLengths;
				this.needsUpdate = !1;
				let t = [],
					n, i = this.getPoint(0),
					s = 0;
				t.push(0);
				for (let a = 1; a <= e; a++) n = this.getPoint(a / e), s += n.distanceTo(i), t.push(s), i = n;
				return this.cacheArcLengths = t, t
			}
			updateArcLengths() {
				this.needsUpdate = !0, this.getLengths()
			}
			getUtoTmapping(e, t) {
				let n = this.getLengths(),
					i = 0,
					s = n.length,
					a;
				t ? a = t : a = e * n[s - 1];
				let o = 0,
					l = s - 1,
					c;
				for (; o <= l;)
					if (i = Math.floor(o + (l - o) / 2), c = n[i] - a, c < 0) o = i + 1;
					else if (c > 0) l = i - 1;
					else {
						l = i;
						break
					}
				if (i = l, n[i] === a) return i / (s - 1);
				let u = n[i],
					d = n[i + 1] - u,
					f = (a - u) / d;
				return (i + f) / (s - 1)
			}
			getTangent(e, t) {
				let n = 1e-4,
					i = e - n,
					s = e + n;
				i < 0 && (i = 0), s > 1 && (s = 1);
				let a = this.getPoint(i),
					o = this.getPoint(s),
					l = t || (a.isVector2 ? new O : new A);
				return l.copy(o).sub(a).normalize(), l
			}
			getTangentAt(e, t) {
				let n = this.getUtoTmapping(e);
				return this.getTangent(n, t)
			}
			computeFrenetFrames(e, t) {
				let n = new A,
					i = [],
					s = [],
					a = [],
					o = new A,
					l = new ge;
				for (let f = 0; f <= e; f++) {
					let p = f / e;
					i[f] = this.getTangentAt(p, new A)
				}
				s[0] = new A, a[0] = new A;
				let c = Number.MAX_VALUE,
					u = Math.abs(i[0].x),
					h = Math.abs(i[0].y),
					d = Math.abs(i[0].z);
				u <= c && (c = u, n.set(1, 0, 0)), h <= c && (c = h, n.set(0, 1, 0)), d <= c && n.set(0, 0, 1), o.crossVectors(i[0], n).normalize(), s[0].crossVectors(i[0], o), a[0].crossVectors(i[0], s[0]);
				for (let f = 1; f <= e; f++) {
					if (s[f] = s[f - 1].clone(), a[f] = a[f - 1].clone(), o.crossVectors(i[f - 1], i[f]), o.length() > Number.EPSILON) {
						o.normalize();
						let p = Math.acos(It(i[f - 1].dot(i[f]), -1, 1));
						s[f].applyMatrix4(l.makeRotationAxis(o, p))
					}
					a[f].crossVectors(i[f], s[f])
				}
				if (t === !0) {
					let f = Math.acos(It(s[0].dot(s[e]), -1, 1));
					f /= e, i[0].dot(o.crossVectors(s[0], s[e])) > 0 && (f = -f);
					for (let p = 1; p <= e; p++) s[p].applyMatrix4(l.makeRotationAxis(i[p], f * p)), a[p].crossVectors(i[p], s[p])
				}
				return {
					tangents: i,
					normals: s,
					binormals: a
				}
			}
			clone() {
				return new this.constructor().copy(this)
			}
			copy(e) {
				return this.arcLengthDivisions = e.arcLengthDivisions, this
			}
			toJSON() {
				let e = {
					metadata: {
						version: 4.5,
						type: "Curve",
						generator: "Curve.toJSON"
					}
				};
				return e.arcLengthDivisions = this.arcLengthDivisions, e.type = this.type, e
			}
			fromJSON(e) {
				return this.arcLengthDivisions = e.arcLengthDivisions, this
			}
		},
		jr = class extends Vt {
			constructor(e = 0, t = 0, n = 1, i = 1, s = 0, a = Math.PI * 2, o = !1, l = 0) {
				super();
				this.type = "EllipseCurve", this.aX = e, this.aY = t, this.xRadius = n, this.yRadius = i, this.aStartAngle = s, this.aEndAngle = a, this.aClockwise = o, this.aRotation = l
			}
			getPoint(e, t) {
				let n = t || new O,
					i = Math.PI * 2,
					s = this.aEndAngle - this.aStartAngle,
					a = Math.abs(s) < Number.EPSILON;
				for (; s < 0;) s += i;
				for (; s > i;) s -= i;
				s < Number.EPSILON && (a ? s = 0 : s = i), this.aClockwise === !0 && !a && (s === i ? s = -i : s = s - i);
				let o = this.aStartAngle + e * s,
					l = this.aX + this.xRadius * Math.cos(o),
					c = this.aY + this.yRadius * Math.sin(o);
				if (this.aRotation !== 0) {
					let u = Math.cos(this.aRotation),
						h = Math.sin(this.aRotation),
						d = l - this.aX,
						f = c - this.aY;
					l = d * u - f * h + this.aX, c = d * h + f * u + this.aY
				}
				return n.set(l, c)
			}
			copy(e) {
				return super.copy(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this
			}
			toJSON() {
				let e = super.toJSON();
				return e.aX = this.aX, e.aY = this.aY, e.xRadius = this.xRadius, e.yRadius = this.yRadius, e.aStartAngle = this.aStartAngle, e.aEndAngle = this.aEndAngle, e.aClockwise = this.aClockwise, e.aRotation = this.aRotation, e
			}
			fromJSON(e) {
				return super.fromJSON(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this
			}
		};
	jr.prototype.isEllipseCurve = !0;
	var po = class extends jr {
		constructor(e, t, n, i, s, a) {
			super(e, t, n, n, i, s, a);
			this.type = "ArcCurve"
		}
	};
	po.prototype.isArcCurve = !0;

	function Ac() {
		let r = 0,
			e = 0,
			t = 0,
			n = 0;

		function i(s, a, o, l) {
			r = s, e = o, t = -3 * s + 3 * a - 2 * o - l, n = 2 * s - 2 * a + o + l
		}
		return {
			initCatmullRom: function (s, a, o, l, c) {
				i(a, o, c * (o - s), c * (l - a))
			},
			initNonuniformCatmullRom: function (s, a, o, l, c, u, h) {
				let d = (a - s) / c - (o - s) / (c + u) + (o - a) / u,
					f = (o - a) / u - (l - a) / (u + h) + (l - o) / h;
				d *= u, f *= u, i(a, o, d, f)
			},
			calc: function (s) {
				let a = s * s,
					o = a * s;
				return r + e * s + t * a + n * o
			}
		}
	}
	var mo = new A,
		Ec = new Ac,
		Mc = new Ac,
		Sc = new Ac,
		go = class extends Vt {
			constructor(e = [], t = !1, n = "centripetal", i = .5) {
				super();
				this.type = "CatmullRomCurve3", this.points = e, this.closed = t, this.curveType = n, this.tension = i
			}
			getPoint(e, t = new A) {
				let n = t,
					i = this.points,
					s = i.length,
					a = (s - (this.closed ? 0 : 1)) * e,
					o = Math.floor(a),
					l = a - o;
				this.closed ? o += o > 0 ? 0 : (Math.floor(Math.abs(o) / s) + 1) * s : l === 0 && o === s - 1 && (o = s - 2, l = 1);
				let c, u;
				this.closed || o > 0 ? c = i[(o - 1) % s] : (mo.subVectors(i[0], i[1]).add(i[0]), c = mo);
				let h = i[o % s],
					d = i[(o + 1) % s];
				if (this.closed || o + 2 < s ? u = i[(o + 2) % s] : (mo.subVectors(i[s - 1], i[s - 2]).add(i[s - 1]), u = mo), this.curveType === "centripetal" || this.curveType === "chordal") {
					let f = this.curveType === "chordal" ? .5 : .25,
						p = Math.pow(c.distanceToSquared(h), f),
						v = Math.pow(h.distanceToSquared(d), f),
						x = Math.pow(d.distanceToSquared(u), f);
					v < 1e-4 && (v = 1), p < 1e-4 && (p = v), x < 1e-4 && (x = v), Ec.initNonuniformCatmullRom(c.x, h.x, d.x, u.x, p, v, x), Mc.initNonuniformCatmullRom(c.y, h.y, d.y, u.y, p, v, x), Sc.initNonuniformCatmullRom(c.z, h.z, d.z, u.z, p, v, x)
				} else this.curveType === "catmullrom" && (Ec.initCatmullRom(c.x, h.x, d.x, u.x, this.tension), Mc.initCatmullRom(c.y, h.y, d.y, u.y, this.tension), Sc.initCatmullRom(c.z, h.z, d.z, u.z, this.tension));
				return n.set(Ec.calc(l), Mc.calc(l), Sc.calc(l)), n
			}
			copy(e) {
				super.copy(e), this.points = [];
				for (let t = 0, n = e.points.length; t < n; t++) {
					let i = e.points[t];
					this.points.push(i.clone())
				}
				return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this
			}
			toJSON() {
				let e = super.toJSON();
				e.points = [];
				for (let t = 0, n = this.points.length; t < n; t++) {
					let i = this.points[t];
					e.points.push(i.toArray())
				}
				return e.closed = this.closed, e.curveType = this.curveType, e.tension = this.tension, e
			}
			fromJSON(e) {
				super.fromJSON(e), this.points = [];
				for (let t = 0, n = e.points.length; t < n; t++) {
					let i = e.points[t];
					this.points.push(new A().fromArray(i))
				}
				return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this
			}
		};
	go.prototype.isCatmullRomCurve3 = !0;

	function Tf(r, e, t, n, i) {
		let s = (n - e) * .5,
			a = (i - t) * .5,
			o = r * r,
			l = r * o;
		return (2 * t - 2 * n + s + a) * l + (-3 * t + 3 * n - 2 * s - a) * o + s * r + t
	}

	function Yy(r, e) {
		let t = 1 - r;
		return t * t * e
	}

	function jy(r, e) {
		return 2 * (1 - r) * r * e
	}

	function Xy(r, e) {
		return r * r * e
	}

	function $s(r, e, t, n) {
		return Yy(r, e) + jy(r, t) + Xy(r, n)
	}

	function Qy(r, e) {
		let t = 1 - r;
		return t * t * t * e
	}

	function qy(r, e) {
		let t = 1 - r;
		return 3 * t * t * r * e
	}

	function Zy(r, e) {
		return 3 * (1 - r) * r * r * e
	}

	function Jy(r, e) {
		return r * r * r * e
	}

	function ea(r, e, t, n, i) {
		return Qy(r, e) + qy(r, t) + Zy(r, n) + Jy(r, i)
	}
	var ta = class extends Vt {
		constructor(e = new O, t = new O, n = new O, i = new O) {
			super();
			this.type = "CubicBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = i
		}
		getPoint(e, t = new O) {
			let n = t,
				i = this.v0,
				s = this.v1,
				a = this.v2,
				o = this.v3;
			return n.set(ea(e, i.x, s.x, a.x, o.x), ea(e, i.y, s.y, a.y, o.y)), n
		}
		copy(e) {
			return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this
		}
		toJSON() {
			let e = super.toJSON();
			return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e
		}
		fromJSON(e) {
			return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this
		}
	};
	ta.prototype.isCubicBezierCurve = !0;
	var vo = class extends Vt {
		constructor(e = new A, t = new A, n = new A, i = new A) {
			super();
			this.type = "CubicBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = i
		}
		getPoint(e, t = new A) {
			let n = t,
				i = this.v0,
				s = this.v1,
				a = this.v2,
				o = this.v3;
			return n.set(ea(e, i.x, s.x, a.x, o.x), ea(e, i.y, s.y, a.y, o.y), ea(e, i.z, s.z, a.z, o.z)), n
		}
		copy(e) {
			return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this
		}
		toJSON() {
			let e = super.toJSON();
			return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e
		}
		fromJSON(e) {
			return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this
		}
	};
	vo.prototype.isCubicBezierCurve3 = !0;
	var Xr = class extends Vt {
		constructor(e = new O, t = new O) {
			super();
			this.type = "LineCurve", this.v1 = e, this.v2 = t
		}
		getPoint(e, t = new O) {
			let n = t;
			return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n
		}
		getPointAt(e, t) {
			return this.getPoint(e, t)
		}
		getTangent(e, t) {
			let n = t || new O;
			return n.copy(this.v2).sub(this.v1).normalize(), n
		}
		copy(e) {
			return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this
		}
		toJSON() {
			let e = super.toJSON();
			return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
		}
		fromJSON(e) {
			return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
		}
	};
	Xr.prototype.isLineCurve = !0;
	var _c = class extends Vt {
		constructor(e = new A, t = new A) {
			super();
			this.type = "LineCurve3", this.isLineCurve3 = !0, this.v1 = e, this.v2 = t
		}
		getPoint(e, t = new A) {
			let n = t;
			return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n
		}
		getPointAt(e, t) {
			return this.getPoint(e, t)
		}
		copy(e) {
			return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this
		}
		toJSON() {
			let e = super.toJSON();
			return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
		}
		fromJSON(e) {
			return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
		}
	},
		na = class extends Vt {
			constructor(e = new O, t = new O, n = new O) {
				super();
				this.type = "QuadraticBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n
			}
			getPoint(e, t = new O) {
				let n = t,
					i = this.v0,
					s = this.v1,
					a = this.v2;
				return n.set($s(e, i.x, s.x, a.x), $s(e, i.y, s.y, a.y)), n
			}
			copy(e) {
				return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this
			}
			toJSON() {
				let e = super.toJSON();
				return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
			}
			fromJSON(e) {
				return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
			}
		};
	na.prototype.isQuadraticBezierCurve = !0;
	var ia = class extends Vt {
		constructor(e = new A, t = new A, n = new A) {
			super();
			this.type = "QuadraticBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n
		}
		getPoint(e, t = new A) {
			let n = t,
				i = this.v0,
				s = this.v1,
				a = this.v2;
			return n.set($s(e, i.x, s.x, a.x), $s(e, i.y, s.y, a.y), $s(e, i.z, s.z, a.z)), n
		}
		copy(e) {
			return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this
		}
		toJSON() {
			let e = super.toJSON();
			return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
		}
		fromJSON(e) {
			return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
		}
	};
	ia.prototype.isQuadraticBezierCurve3 = !0;
	var ra = class extends Vt {
		constructor(e = []) {
			super();
			this.type = "SplineCurve", this.points = e
		}
		getPoint(e, t = new O) {
			let n = t,
				i = this.points,
				s = (i.length - 1) * e,
				a = Math.floor(s),
				o = s - a,
				l = i[a === 0 ? a : a - 1],
				c = i[a],
				u = i[a > i.length - 2 ? i.length - 1 : a + 1],
				h = i[a > i.length - 3 ? i.length - 1 : a + 2];
			return n.set(Tf(o, l.x, c.x, u.x, h.x), Tf(o, l.y, c.y, u.y, h.y)), n
		}
		copy(e) {
			super.copy(e), this.points = [];
			for (let t = 0, n = e.points.length; t < n; t++) {
				let i = e.points[t];
				this.points.push(i.clone())
			}
			return this
		}
		toJSON() {
			let e = super.toJSON();
			e.points = [];
			for (let t = 0, n = this.points.length; t < n; t++) {
				let i = this.points[t];
				e.points.push(i.toArray())
			}
			return e
		}
		fromJSON(e) {
			super.fromJSON(e), this.points = [];
			for (let t = 0, n = e.points.length; t < n; t++) {
				let i = e.points[t];
				this.points.push(new O().fromArray(i))
			}
			return this
		}
	};
	ra.prototype.isSplineCurve = !0;
	var Tc = Object.freeze({
		__proto__: null,
		ArcCurve: po,
		CatmullRomCurve3: go,
		CubicBezierCurve: ta,
		CubicBezierCurve3: vo,
		EllipseCurve: jr,
		LineCurve: Xr,
		LineCurve3: _c,
		QuadraticBezierCurve: na,
		QuadraticBezierCurve3: ia,
		SplineCurve: ra
	}),
		Cc = class extends Vt {
			constructor() {
				super();
				this.type = "CurvePath", this.curves = [], this.autoClose = !1
			}
			add(e) {
				this.curves.push(e)
			}
			closePath() {
				let e = this.curves[0].getPoint(0),
					t = this.curves[this.curves.length - 1].getPoint(1);
				e.equals(t) || this.curves.push(new Xr(t, e))
			}
			getPoint(e, t) {
				let n = e * this.getLength(),
					i = this.getCurveLengths(),
					s = 0;
				for (; s < i.length;) {
					if (i[s] >= n) {
						let a = i[s] - n,
							o = this.curves[s],
							l = o.getLength(),
							c = l === 0 ? 0 : 1 - a / l;
						return o.getPointAt(c, t)
					}
					s++
				}
				return null
			}
			getLength() {
				let e = this.getCurveLengths();
				return e[e.length - 1]
			}
			updateArcLengths() {
				this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths()
			}
			getCurveLengths() {
				if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
				let e = [],
					t = 0;
				for (let n = 0, i = this.curves.length; n < i; n++) t += this.curves[n].getLength(), e.push(t);
				return this.cacheLengths = e, e
			}
			getSpacedPoints(e = 40) {
				let t = [];
				for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
				return this.autoClose && t.push(t[0]), t
			}
			getPoints(e = 12) {
				let t = [],
					n;
				for (let i = 0, s = this.curves; i < s.length; i++) {
					let a = s[i],
						o = a && a.isEllipseCurve ? e * 2 : a && (a.isLineCurve || a.isLineCurve3) ? 1 : a && a.isSplineCurve ? e * a.points.length : e,
						l = a.getPoints(o);
					for (let c = 0; c < l.length; c++) {
						let u = l[c];
						n && n.equals(u) || (t.push(u), n = u)
					}
				}
				return this.autoClose && t.length > 1 && !t[t.length - 1].equals(t[0]) && t.push(t[0]), t
			}
			copy(e) {
				super.copy(e), this.curves = [];
				for (let t = 0, n = e.curves.length; t < n; t++) {
					let i = e.curves[t];
					this.curves.push(i.clone())
				}
				return this.autoClose = e.autoClose, this
			}
			toJSON() {
				let e = super.toJSON();
				e.autoClose = this.autoClose, e.curves = [];
				for (let t = 0, n = this.curves.length; t < n; t++) {
					let i = this.curves[t];
					e.curves.push(i.toJSON())
				}
				return e
			}
			fromJSON(e) {
				super.fromJSON(e), this.autoClose = e.autoClose, this.curves = [];
				for (let t = 0, n = e.curves.length; t < n; t++) {
					let i = e.curves[t];
					this.curves.push(new Tc[i.type]().fromJSON(i))
				}
				return this
			}
		},
		Qr = class extends Cc {
			constructor(e) {
				super();
				this.type = "Path", this.currentPoint = new O, e && this.setFromPoints(e)
			}
			setFromPoints(e) {
				this.moveTo(e[0].x, e[0].y);
				for (let t = 1, n = e.length; t < n; t++) this.lineTo(e[t].x, e[t].y);
				return this
			}
			moveTo(e, t) {
				return this.currentPoint.set(e, t), this
			}
			lineTo(e, t) {
				let n = new Xr(this.currentPoint.clone(), new O(e, t));
				return this.curves.push(n), this.currentPoint.set(e, t), this
			}
			quadraticCurveTo(e, t, n, i) {
				let s = new na(this.currentPoint.clone(), new O(e, t), new O(n, i));
				return this.curves.push(s), this.currentPoint.set(n, i), this
			}
			bezierCurveTo(e, t, n, i, s, a) {
				let o = new ta(this.currentPoint.clone(), new O(e, t), new O(n, i), new O(s, a));
				return this.curves.push(o), this.currentPoint.set(s, a), this
			}
			splineThru(e) {
				let t = [this.currentPoint.clone()].concat(e),
					n = new ra(t);
				return this.curves.push(n), this.currentPoint.copy(e[e.length - 1]), this
			}
			arc(e, t, n, i, s, a) {
				let o = this.currentPoint.x,
					l = this.currentPoint.y;
				return this.absarc(e + o, t + l, n, i, s, a), this
			}
			absarc(e, t, n, i, s, a) {
				return this.absellipse(e, t, n, n, i, s, a), this
			}
			ellipse(e, t, n, i, s, a, o, l) {
				let c = this.currentPoint.x,
					u = this.currentPoint.y;
				return this.absellipse(e + c, t + u, n, i, s, a, o, l), this
			}
			absellipse(e, t, n, i, s, a, o, l) {
				let c = new jr(e, t, n, i, s, a, o, l);
				if (this.curves.length > 0) {
					let h = c.getPoint(0);
					h.equals(this.currentPoint) || this.lineTo(h.x, h.y)
				}
				this.curves.push(c);
				let u = c.getPoint(1);
				return this.currentPoint.copy(u), this
			}
			copy(e) {
				return super.copy(e), this.currentPoint.copy(e.currentPoint), this
			}
			toJSON() {
				let e = super.toJSON();
				return e.currentPoint = this.currentPoint.toArray(), e
			}
			fromJSON(e) {
				return super.fromJSON(e), this.currentPoint.fromArray(e.currentPoint), this
			}
		},
		gn = class extends Qr {
			constructor(e) {
				super(e);
				this.uuid = Wt(), this.type = "Shape", this.holes = []
			}
			getPointsHoles(e) {
				let t = [];
				for (let n = 0, i = this.holes.length; n < i; n++) t[n] = this.holes[n].getPoints(e);
				return t
			}
			extractPoints(e) {
				return {
					shape: this.getPoints(e),
					holes: this.getPointsHoles(e)
				}
			}
			copy(e) {
				super.copy(e), this.holes = [];
				for (let t = 0, n = e.holes.length; t < n; t++) {
					let i = e.holes[t];
					this.holes.push(i.clone())
				}
				return this
			}
			toJSON() {
				let e = super.toJSON();
				e.uuid = this.uuid, e.holes = [];
				for (let t = 0, n = this.holes.length; t < n; t++) {
					let i = this.holes[t];
					e.holes.push(i.toJSON())
				}
				return e
			}
			fromJSON(e) {
				super.fromJSON(e), this.uuid = e.uuid, this.holes = [];
				for (let t = 0, n = e.holes.length; t < n; t++) {
					let i = e.holes[t];
					this.holes.push(new Qr().fromJSON(i))
				}
				return this
			}
		},
		Ky = {
			triangulate: function (r, e, t = 2) {
				let n = e && e.length,
					i = n ? e[0] * t : r.length,
					s = Cf(r, 0, i, t, !0),
					a = [];
				if (!s || s.next === s.prev) return a;
				let o, l, c, u, h, d, f;
				if (n && (s = iw(r, e, s, t)), r.length > 80 * t) {
					o = c = r[0], l = u = r[1];
					for (let p = t; p < i; p += t) h = r[p], d = r[p + 1], h < o && (o = h), d < l && (l = d), h > c && (c = h), d > u && (u = d);
					f = Math.max(c - o, u - l), f = f !== 0 ? 1 / f : 0
				}
				return sa(s, a, t, o, l, f), a
			}
		};

	function Cf(r, e, t, n, i) {
		let s, a;
		if (i === pw(r, e, t, n) > 0)
			for (s = e; s < t; s += n) a = Pf(s, r[s], r[s + 1], a);
		else
			for (s = t - n; s >= e; s -= n) a = Pf(s, r[s], r[s + 1], a);
		return a && xo(a, a.next) && (oa(a), a = a.next), a
	}

	function pi(r, e) {
		if (!r) return r;
		e || (e = r);
		let t = r,
			n;
		do
			if (n = !1, !t.steiner && (xo(t, t.next) || ut(t.prev, t, t.next) === 0)) {
				if (oa(t), t = e = t.prev, t === t.next) break;
				n = !0
			} else t = t.next; while (n || t !== e);
		return e
	}

	function sa(r, e, t, n, i, s, a) {
		if (!r) return;
		!a && s && lw(r, n, i, s);
		let o = r,
			l, c;
		for (; r.prev !== r.next;) {
			if (l = r.prev, c = r.next, s ? ew(r, n, i, s) : $y(r)) {
				e.push(l.i / t), e.push(r.i / t), e.push(c.i / t), oa(r), r = c.next, o = c.next;
				continue
			}
			if (r = c, r === o) {
				a ? a === 1 ? (r = tw(pi(r), e, t), sa(r, e, t, n, i, s, 2)) : a === 2 && nw(r, e, t, n, i, s) : sa(pi(r), e, t, n, i, s, 1);
				break
			}
		}
	}

	function $y(r) {
		let e = r.prev,
			t = r,
			n = r.next;
		if (ut(e, t, n) >= 0) return !1;
		let i = r.next.next;
		for (; i !== r.prev;) {
			if (qr(e.x, e.y, t.x, t.y, n.x, n.y, i.x, i.y) && ut(i.prev, i, i.next) >= 0) return !1;
			i = i.next
		}
		return !0
	}

	function ew(r, e, t, n) {
		let i = r.prev,
			s = r,
			a = r.next;
		if (ut(i, s, a) >= 0) return !1;
		let o = i.x < s.x ? i.x < a.x ? i.x : a.x : s.x < a.x ? s.x : a.x,
			l = i.y < s.y ? i.y < a.y ? i.y : a.y : s.y < a.y ? s.y : a.y,
			c = i.x > s.x ? i.x > a.x ? i.x : a.x : s.x > a.x ? s.x : a.x,
			u = i.y > s.y ? i.y > a.y ? i.y : a.y : s.y > a.y ? s.y : a.y,
			h = Dc(o, l, e, t, n),
			d = Dc(c, u, e, t, n),
			f = r.prevZ,
			p = r.nextZ;
		for (; f && f.z >= h && p && p.z <= d;) {
			if (f !== r.prev && f !== r.next && qr(i.x, i.y, s.x, s.y, a.x, a.y, f.x, f.y) && ut(f.prev, f, f.next) >= 0 || (f = f.prevZ, p !== r.prev && p !== r.next && qr(i.x, i.y, s.x, s.y, a.x, a.y, p.x, p.y) && ut(p.prev, p, p.next) >= 0)) return !1;
			p = p.nextZ
		}
		for (; f && f.z >= h;) {
			if (f !== r.prev && f !== r.next && qr(i.x, i.y, s.x, s.y, a.x, a.y, f.x, f.y) && ut(f.prev, f, f.next) >= 0) return !1;
			f = f.prevZ
		}
		for (; p && p.z <= d;) {
			if (p !== r.prev && p !== r.next && qr(i.x, i.y, s.x, s.y, a.x, a.y, p.x, p.y) && ut(p.prev, p, p.next) >= 0) return !1;
			p = p.nextZ
		}
		return !0
	}

	function tw(r, e, t) {
		let n = r;
		do {
			let i = n.prev,
				s = n.next.next;
			!xo(i, s) && Df(i, n, n.next, s) && aa(i, s) && aa(s, i) && (e.push(i.i / t), e.push(n.i / t), e.push(s.i / t), oa(n), oa(n.next), n = r = s), n = n.next
		} while (n !== r);
		return pi(n)
	}

	function nw(r, e, t, n, i, s) {
		let a = r;
		do {
			let o = a.next.next;
			for (; o !== a.prev;) {
				if (a.i !== o.i && hw(a, o)) {
					let l = Rf(a, o);
					a = pi(a, a.next), l = pi(l, l.next), sa(a, e, t, n, i, s), sa(l, e, t, n, i, s);
					return
				}
				o = o.next
			}
			a = a.next
		} while (a !== r)
	}

	function iw(r, e, t, n) {
		let i = [],
			s, a, o, l, c;
		for (s = 0, a = e.length; s < a; s++) o = e[s] * n, l = s < a - 1 ? e[s + 1] * n : r.length, c = Cf(r, o, l, n, !1), c === c.next && (c.steiner = !0), i.push(uw(c));
		for (i.sort(rw), s = 0; s < i.length; s++) sw(i[s], t), t = pi(t, t.next);
		return t
	}

	function rw(r, e) {
		return r.x - e.x
	}

	function sw(r, e) {
		if (e = aw(r, e), e) {
			let t = Rf(e, r);
			pi(e, e.next), pi(t, t.next)
		}
	}

	function aw(r, e) {
		let t = e,
			n = r.x,
			i = r.y,
			s = -1 / 0,
			a;
		do {
			if (i <= t.y && i >= t.next.y && t.next.y !== t.y) {
				let d = t.x + (i - t.y) * (t.next.x - t.x) / (t.next.y - t.y);
				if (d <= n && d > s) {
					if (s = d, d === n) {
						if (i === t.y) return t;
						if (i === t.next.y) return t.next
					}
					a = t.x < t.next.x ? t : t.next
				}
			}
			t = t.next
		} while (t !== e);
		if (!a) return null;
		if (n === s) return a;
		let o = a,
			l = a.x,
			c = a.y,
			u = 1 / 0,
			h;
		t = a;
		do n >= t.x && t.x >= l && n !== t.x && qr(i < c ? n : s, i, l, c, i < c ? s : n, i, t.x, t.y) && (h = Math.abs(i - t.y) / (n - t.x), aa(t, r) && (h < u || h === u && (t.x > a.x || t.x === a.x && ow(a, t))) && (a = t, u = h)), t = t.next; while (t !== o);
		return a
	}

	function ow(r, e) {
		return ut(r.prev, r, e.prev) < 0 && ut(e.next, r, r.next) < 0
	}

	function lw(r, e, t, n) {
		let i = r;
		do i.z === null && (i.z = Dc(i.x, i.y, e, t, n)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next; while (i !== r);
		i.prevZ.nextZ = null, i.prevZ = null, cw(i)
	}

	function cw(r) {
		let e, t, n, i, s, a, o, l, c = 1;
		do {
			for (t = r, r = null, s = null, a = 0; t;) {
				for (a++, n = t, o = 0, e = 0; e < c && (o++, n = n.nextZ, !!n); e++);
				for (l = c; o > 0 || l > 0 && n;) o !== 0 && (l === 0 || !n || t.z <= n.z) ? (i = t, t = t.nextZ, o--) : (i = n, n = n.nextZ, l--), s ? s.nextZ = i : r = i, i.prevZ = s, s = i;
				t = n
			}
			s.nextZ = null, c *= 2
		} while (a > 1);
		return r
	}

	function Dc(r, e, t, n, i) {
		return r = 32767 * (r - t) * i, e = 32767 * (e - n) * i, r = (r | r << 8) & 16711935, r = (r | r << 4) & 252645135, r = (r | r << 2) & 858993459, r = (r | r << 1) & 1431655765, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, r | e << 1
	}

	function uw(r) {
		let e = r,
			t = r;
		do (e.x < t.x || e.x === t.x && e.y < t.y) && (t = e), e = e.next; while (e !== r);
		return t
	}

	function qr(r, e, t, n, i, s, a, o) {
		return (i - a) * (e - o) - (r - a) * (s - o) >= 0 && (r - a) * (n - o) - (t - a) * (e - o) >= 0 && (t - a) * (s - o) - (i - a) * (n - o) >= 0
	}

	function hw(r, e) {
		return r.next.i !== e.i && r.prev.i !== e.i && !dw(r, e) && (aa(r, e) && aa(e, r) && fw(r, e) && (ut(r.prev, r, e.prev) || ut(r, e.prev, e)) || xo(r, e) && ut(r.prev, r, r.next) > 0 && ut(e.prev, e, e.next) > 0)
	}

	function ut(r, e, t) {
		return (e.y - r.y) * (t.x - e.x) - (e.x - r.x) * (t.y - e.y)
	}

	function xo(r, e) {
		return r.x === e.x && r.y === e.y
	}

	function Df(r, e, t, n) {
		let i = wo(ut(r, e, t)),
			s = wo(ut(r, e, n)),
			a = wo(ut(t, n, r)),
			o = wo(ut(t, n, e));
		return !!(i !== s && a !== o || i === 0 && yo(r, t, e) || s === 0 && yo(r, n, e) || a === 0 && yo(t, r, n) || o === 0 && yo(t, e, n))
	}

	function yo(r, e, t) {
		return e.x <= Math.max(r.x, t.x) && e.x >= Math.min(r.x, t.x) && e.y <= Math.max(r.y, t.y) && e.y >= Math.min(r.y, t.y)
	}

	function wo(r) {
		return r > 0 ? 1 : r < 0 ? -1 : 0
	}

	function dw(r, e) {
		let t = r;
		do {
			if (t.i !== r.i && t.next.i !== r.i && t.i !== e.i && t.next.i !== e.i && Df(t, t.next, r, e)) return !0;
			t = t.next
		} while (t !== r);
		return !1
	}

	function aa(r, e) {
		return ut(r.prev, r, r.next) < 0 ? ut(r, e, r.next) >= 0 && ut(r, r.prev, e) >= 0 : ut(r, e, r.prev) < 0 || ut(r, r.next, e) < 0
	}

	function fw(r, e) {
		let t = r,
			n = !1,
			i = (r.x + e.x) / 2,
			s = (r.y + e.y) / 2;
		do t.y > s != t.next.y > s && t.next.y !== t.y && i < (t.next.x - t.x) * (s - t.y) / (t.next.y - t.y) + t.x && (n = !n), t = t.next; while (t !== r);
		return n
	}

	function Rf(r, e) {
		let t = new Rc(r.i, r.x, r.y),
			n = new Rc(e.i, e.x, e.y),
			i = r.next,
			s = e.prev;
		return r.next = e, e.prev = r, t.next = i, i.prev = t, n.next = t, t.prev = n, s.next = n, n.prev = s, n
	}

	function Pf(r, e, t, n) {
		let i = new Rc(r, e, t);
		return n ? (i.next = n.next, i.prev = n, n.next.prev = i, n.next = i) : (i.prev = i, i.next = i), i
	}

	function oa(r) {
		r.next.prev = r.prev, r.prev.next = r.next, r.prevZ && (r.prevZ.nextZ = r.nextZ), r.nextZ && (r.nextZ.prevZ = r.prevZ)
	}

	function Rc(r, e, t) {
		this.i = r, this.x = e, this.y = t, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1
	}

	function pw(r, e, t, n) {
		let i = 0;
		for (let s = e, a = t - n; s < t; s += n) i += (r[a] - r[s]) * (r[s + 1] + r[a + 1]), a = s;
		return i
	}
	var vn = class {
		static area(e) {
			let t = e.length,
				n = 0;
			for (let i = t - 1, s = 0; s < t; i = s++) n += e[i].x * e[s].y - e[s].x * e[i].y;
			return n * .5
		}
		static isClockWise(e) {
			return vn.area(e) < 0
		}
		static triangulateShape(e, t) {
			let n = [],
				i = [],
				s = [];
			Lf(e), If(n, e);
			let a = e.length;
			t.forEach(Lf);
			for (let l = 0; l < t.length; l++) i.push(a), a += t[l].length, If(n, t[l]);
			let o = Ky.triangulate(n, i);
			for (let l = 0; l < o.length; l += 3) s.push(o.slice(l, l + 3));
			return s
		}
	};

	function Lf(r) {
		let e = r.length;
		e > 2 && r[e - 1].equals(r[0]) && r.pop()
	}

	function If(r, e) {
		for (let t = 0; t < e.length; t++) r.push(e[t].x), r.push(e[t].y)
	}
	var Sn = class extends de {
		constructor(e = new gn([new O(.5, .5), new O(-.5, .5), new O(-.5, -.5), new O(.5, -.5)]), t = {}) {
			super();
			this.type = "ExtrudeGeometry", this.parameters = {
				shapes: e,
				options: t
			}, e = Array.isArray(e) ? e : [e];
			let n = this,
				i = [],
				s = [];
			for (let o = 0, l = e.length; o < l; o++) {
				let c = e[o];
				a(c)
			}
			this.setAttribute("position", new ce(i, 3)), this.setAttribute("uv", new ce(s, 2)), this.computeVertexNormals();

			function a(o) {
				let l = [],
					c = t.curveSegments !== void 0 ? t.curveSegments : 12,
					u = t.steps !== void 0 ? t.steps : 1,
					h = t.depth !== void 0 ? t.depth : 1,
					d = t.bevelEnabled !== void 0 ? t.bevelEnabled : !0,
					f = t.bevelThickness !== void 0 ? t.bevelThickness : .2,
					p = t.bevelSize !== void 0 ? t.bevelSize : f - .1,
					v = t.bevelOffset !== void 0 ? t.bevelOffset : 0,
					x = t.bevelSegments !== void 0 ? t.bevelSegments : 3,
					g = t.extrudePath,
					m = t.UVGenerator !== void 0 ? t.UVGenerator : mw;
				t.amount !== void 0 && (console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."), h = t.amount);
				let b, y = !1,
					E, _, w, D;
				g && (b = g.getSpacedPoints(u), y = !0, d = !1, E = g.computeFrenetFrames(u, !1), _ = new A, w = new A, D = new A), d || (x = 0, f = 0, p = 0, v = 0);
				let I = o.extractPoints(c),
					L = I.shape,
					R = I.holes;
				if (!vn.isClockWise(L)) {
					L = L.reverse();
					for (let W = 0, ee = R.length; W < ee; W++) {
						let te = R[W];
						vn.isClockWise(te) && (R[W] = te.reverse())
					}
				}
				let F = vn.triangulateShape(L, R),
					U = L;
				for (let W = 0, ee = R.length; W < ee; W++) {
					let te = R[W];
					L = L.concat(te)
				}

				function z(W, ee, te) {
					return ee || console.error("THREE.ExtrudeGeometry: vec does not exist"), ee.clone().multiplyScalar(te).add(W)
				}
				let N = L.length,
					G = F.length;

				function ne(W, ee, te) {
					let he, ae, Me, Se = W.x - ee.x,
						Pe = W.y - ee.y,
						Je = te.x - W.x,
						C = te.y - W.y,
						S = Se * Se + Pe * Pe,
						q = Se * C - Pe * Je;
					if (Math.abs(q) > Number.EPSILON) {
						let Q = Math.sqrt(S),
							ye = Math.sqrt(Je * Je + C * C),
							me = ee.x - Pe / Q,
							P = ee.y + Se / Q,
							ie = te.x - C / ye,
							T = te.y + Je / ye,
							V = ((ie - me) * C - (T - P) * Je) / (Se * C - Pe * Je);
						he = me + Se * V - W.x, ae = P + Pe * V - W.y;
						let K = he * he + ae * ae;
						if (K <= 2) return new O(he, ae);
						Me = Math.sqrt(K / 2)
					} else {
						let Q = !1;
						Se > Number.EPSILON ? Je > Number.EPSILON && (Q = !0) : Se < -Number.EPSILON ? Je < -Number.EPSILON && (Q = !0) : Math.sign(Pe) === Math.sign(C) && (Q = !0), Q ? (he = -Pe, ae = Se, Me = Math.sqrt(S)) : (he = Se, ae = Pe, Me = Math.sqrt(S / 2))
					}
					return new O(he / Me, ae / Me)
				}
				let fe = [];
				for (let W = 0, ee = U.length, te = ee - 1, he = W + 1; W < ee; W++, te++, he++) te === ee && (te = 0), he === ee && (he = 0), fe[W] = ne(U[W], U[te], U[he]);
				let Y = [],
					j, ue = fe.concat();
				for (let W = 0, ee = R.length; W < ee; W++) {
					let te = R[W];
					j = [];
					for (let he = 0, ae = te.length, Me = ae - 1, Se = he + 1; he < ae; he++, Me++, Se++) Me === ae && (Me = 0), Se === ae && (Se = 0), j[he] = ne(te[he], te[Me], te[Se]);
					Y.push(j), ue = ue.concat(j)
				}
				for (let W = 0; W < x; W++) {
					let ee = W / x,
						te = f * Math.cos(ee * Math.PI / 2),
						he = p * Math.sin(ee * Math.PI / 2) + v;
					for (let ae = 0, Me = U.length; ae < Me; ae++) {
						let Se = z(U[ae], fe[ae], he);
						Re(Se.x, Se.y, -te)
					}
					for (let ae = 0, Me = R.length; ae < Me; ae++) {
						let Se = R[ae];
						j = Y[ae];
						for (let Pe = 0, Je = Se.length; Pe < Je; Pe++) {
							let C = z(Se[Pe], j[Pe], he);
							Re(C.x, C.y, -te)
						}
					}
				}
				let oe = p + v;
				for (let W = 0; W < N; W++) {
					let ee = d ? z(L[W], ue[W], oe) : L[W];
					y ? (w.copy(E.normals[0]).multiplyScalar(ee.x), _.copy(E.binormals[0]).multiplyScalar(ee.y), D.copy(b[0]).add(w).add(_), Re(D.x, D.y, D.z)) : Re(ee.x, ee.y, 0)
				}
				for (let W = 1; W <= u; W++)
					for (let ee = 0; ee < N; ee++) {
						let te = d ? z(L[ee], ue[ee], oe) : L[ee];
						y ? (w.copy(E.normals[W]).multiplyScalar(te.x), _.copy(E.binormals[W]).multiplyScalar(te.y), D.copy(b[W]).add(w).add(_), Re(D.x, D.y, D.z)) : Re(te.x, te.y, h / u * W)
					}
				for (let W = x - 1; W >= 0; W--) {
					let ee = W / x,
						te = f * Math.cos(ee * Math.PI / 2),
						he = p * Math.sin(ee * Math.PI / 2) + v;
					for (let ae = 0, Me = U.length; ae < Me; ae++) {
						let Se = z(U[ae], fe[ae], he);
						Re(Se.x, Se.y, h + te)
					}
					for (let ae = 0, Me = R.length; ae < Me; ae++) {
						let Se = R[ae];
						j = Y[ae];
						for (let Pe = 0, Je = Se.length; Pe < Je; Pe++) {
							let C = z(Se[Pe], j[Pe], he);
							y ? Re(C.x, C.y + b[u - 1].y, b[u - 1].x + te) : Re(C.x, C.y, h + te)
						}
					}
				}
				ve(), Oe();

				function ve() {
					let W = i.length / 3;
					if (d) {
						let ee = 0,
							te = N * ee;
						for (let he = 0; he < G; he++) {
							let ae = F[he];
							be(ae[2] + te, ae[1] + te, ae[0] + te)
						}
						ee = u + x * 2, te = N * ee;
						for (let he = 0; he < G; he++) {
							let ae = F[he];
							be(ae[0] + te, ae[1] + te, ae[2] + te)
						}
					} else {
						for (let ee = 0; ee < G; ee++) {
							let te = F[ee];
							be(te[2], te[1], te[0])
						}
						for (let ee = 0; ee < G; ee++) {
							let te = F[ee];
							be(te[0] + N * u, te[1] + N * u, te[2] + N * u)
						}
					}
					n.addGroup(W, i.length / 3 - W, 0)
				}

				function Oe() {
					let W = i.length / 3,
						ee = 0;
					J(U, ee), ee += U.length;
					for (let te = 0, he = R.length; te < he; te++) {
						let ae = R[te];
						J(ae, ee), ee += ae.length
					}
					n.addGroup(W, i.length / 3 - W, 1)
				}

				function J(W, ee) {
					let te = W.length;
					for (; --te >= 0;) {
						let he = te,
							ae = te - 1;
						ae < 0 && (ae = W.length - 1);
						for (let Me = 0, Se = u + x * 2; Me < Se; Me++) {
							let Pe = N * Me,
								Je = N * (Me + 1),
								C = ee + he + Pe,
								S = ee + ae + Pe,
								q = ee + ae + Je,
								Q = ee + he + Je;
							xe(C, S, q, Q)
						}
					}
				}

				function Re(W, ee, te) {
					l.push(W), l.push(ee), l.push(te)
				}

				function be(W, ee, te) {
					we(W), we(ee), we(te);
					let he = i.length / 3,
						ae = m.generateTopUV(n, i, he - 3, he - 2, he - 1);
					Ue(ae[0]), Ue(ae[1]), Ue(ae[2])
				}

				function xe(W, ee, te, he) {
					we(W), we(ee), we(he), we(ee), we(te), we(he);
					let ae = i.length / 3,
						Me = m.generateSideWallUV(n, i, ae - 6, ae - 3, ae - 2, ae - 1);
					Ue(Me[0]), Ue(Me[1]), Ue(Me[3]), Ue(Me[1]), Ue(Me[2]), Ue(Me[3])
				}

				function we(W) {
					i.push(l[W * 3 + 0]), i.push(l[W * 3 + 1]), i.push(l[W * 3 + 2])
				}

				function Ue(W) {
					s.push(W.x), s.push(W.y)
				}
			}
		}
		toJSON() {
			let e = super.toJSON(),
				t = this.parameters.shapes,
				n = this.parameters.options;
			return gw(t, n, e)
		}
		static fromJSON(e, t) {
			let n = [];
			for (let s = 0, a = e.shapes.length; s < a; s++) {
				let o = t[e.shapes[s]];
				n.push(o)
			}
			let i = e.options.extrudePath;
			return i !== void 0 && (e.options.extrudePath = new Tc[i.type]().fromJSON(i)), new Sn(n, e.options)
		}
	},
		mw = {
			generateTopUV: function (r, e, t, n, i) {
				let s = e[t * 3],
					a = e[t * 3 + 1],
					o = e[n * 3],
					l = e[n * 3 + 1],
					c = e[i * 3],
					u = e[i * 3 + 1];
				return [new O(s, a), new O(o, l), new O(c, u)]
			},
			generateSideWallUV: function (r, e, t, n, i, s) {
				let a = e[t * 3],
					o = e[t * 3 + 1],
					l = e[t * 3 + 2],
					c = e[n * 3],
					u = e[n * 3 + 1],
					h = e[n * 3 + 2],
					d = e[i * 3],
					f = e[i * 3 + 1],
					p = e[i * 3 + 2],
					v = e[s * 3],
					x = e[s * 3 + 1],
					g = e[s * 3 + 2];
				return Math.abs(o - u) < Math.abs(a - c) ? [new O(a, 1 - l), new O(c, 1 - h), new O(d, 1 - p), new O(v, 1 - g)] : [new O(o, 1 - l), new O(u, 1 - h), new O(f, 1 - p), new O(x, 1 - g)]
			}
		};

	function gw(r, e, t) {
		if (t.shapes = [], Array.isArray(r))
			for (let n = 0, i = r.length; n < i; n++) {
				let s = r[n];
				t.shapes.push(s.uuid)
			} else t.shapes.push(r.uuid);
		return e.extrudePath !== void 0 && (t.options.extrudePath = e.extrudePath.toJSON()), t
	}
	var Zr = class extends Mn {
		constructor(e = 1, t = 0) {
			let n = (1 + Math.sqrt(5)) / 2,
				i = [-1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, 0, 0, -1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, n, 0, -1, n, 0, 1, -n, 0, -1, -n, 0, 1],
				s = [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1];
			super(i, s, e, t);
			this.type = "IcosahedronGeometry", this.parameters = {
				radius: e,
				detail: t
			}
		}
		static fromJSON(e) {
			return new Zr(e.radius, e.detail)
		}
	},
		Jr = class extends de {
			constructor(e = [new O(0, .5), new O(.5, 0), new O(0, -.5)], t = 12, n = 0, i = Math.PI * 2) {
				super();
				this.type = "LatheGeometry", this.parameters = {
					points: e,
					segments: t,
					phiStart: n,
					phiLength: i
				}, t = Math.floor(t), i = It(i, 0, Math.PI * 2);
				let s = [],
					a = [],
					o = [],
					l = 1 / t,
					c = new A,
					u = new O;
				for (let h = 0; h <= t; h++) {
					let d = n + h * l * i,
						f = Math.sin(d),
						p = Math.cos(d);
					for (let v = 0; v <= e.length - 1; v++) c.x = e[v].x * f, c.y = e[v].y, c.z = e[v].x * p, a.push(c.x, c.y, c.z), u.x = h / t, u.y = v / (e.length - 1), o.push(u.x, u.y)
				}
				for (let h = 0; h < t; h++)
					for (let d = 0; d < e.length - 1; d++) {
						let f = d + h * e.length,
							p = f,
							v = f + e.length,
							x = f + e.length + 1,
							g = f + 1;
						s.push(p, v, g), s.push(v, x, g)
					}
				if (this.setIndex(s), this.setAttribute("position", new ce(a, 3)), this.setAttribute("uv", new ce(o, 2)), this.computeVertexNormals(), i === Math.PI * 2) {
					let h = this.attributes.normal.array,
						d = new A,
						f = new A,
						p = new A,
						v = t * e.length * 3;
					for (let x = 0, g = 0; x < e.length; x++, g += 3) d.x = h[g + 0], d.y = h[g + 1], d.z = h[g + 2], f.x = h[v + g + 0], f.y = h[v + g + 1], f.z = h[v + g + 2], p.addVectors(d, f).normalize(), h[g + 0] = h[v + g + 0] = p.x, h[g + 1] = h[v + g + 1] = p.y, h[g + 2] = h[v + g + 2] = p.z
				}
			}
			static fromJSON(e) {
				return new Jr(e.points, e.segments, e.phiStart, e.phiLength)
			}
		},
		qi = class extends Mn {
			constructor(e = 1, t = 0) {
				let n = [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1],
					i = [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2];
				super(n, i, e, t);
				this.type = "OctahedronGeometry", this.parameters = {
					radius: e,
					detail: t
				}
			}
			static fromJSON(e) {
				return new qi(e.radius, e.detail)
			}
		},
		mi = class extends de {
			constructor(e = .5, t = 1, n = 8, i = 1, s = 0, a = Math.PI * 2) {
				super();
				this.type = "RingGeometry", this.parameters = {
					innerRadius: e,
					outerRadius: t,
					thetaSegments: n,
					phiSegments: i,
					thetaStart: s,
					thetaLength: a
				}, n = Math.max(3, n), i = Math.max(1, i);
				let o = [],
					l = [],
					c = [],
					u = [],
					h = e,
					d = (t - e) / i,
					f = new A,
					p = new O;
				for (let v = 0; v <= i; v++) {
					for (let x = 0; x <= n; x++) {
						let g = s + x / n * a;
						f.x = h * Math.cos(g), f.y = h * Math.sin(g), l.push(f.x, f.y, f.z), c.push(0, 0, 1), p.x = (f.x / t + 1) / 2, p.y = (f.y / t + 1) / 2, u.push(p.x, p.y)
					}
					h += d
				}
				for (let v = 0; v < i; v++) {
					let x = v * (n + 1);
					for (let g = 0; g < n; g++) {
						let m = g + x,
							b = m,
							y = m + n + 1,
							E = m + n + 2,
							_ = m + 1;
						o.push(b, y, _), o.push(y, E, _)
					}
				}
				this.setIndex(o), this.setAttribute("position", new ce(l, 3)), this.setAttribute("normal", new ce(c, 3)), this.setAttribute("uv", new ce(u, 2))
			}
			static fromJSON(e) {
				return new mi(e.innerRadius, e.outerRadius, e.thetaSegments, e.phiSegments, e.thetaStart, e.thetaLength)
			}
		},
		Zi = class extends de {
			constructor(e = new gn([new O(0, .5), new O(-.5, -.5), new O(.5, -.5)]), t = 12) {
				super();
				this.type = "ShapeGeometry", this.parameters = {
					shapes: e,
					curveSegments: t
				};
				let n = [],
					i = [],
					s = [],
					a = [],
					o = 0,
					l = 0;
				if (Array.isArray(e) === !1) c(e);
				else
					for (let u = 0; u < e.length; u++) c(e[u]), this.addGroup(o, l, u), o += l, l = 0;
				this.setIndex(n), this.setAttribute("position", new ce(i, 3)), this.setAttribute("normal", new ce(s, 3)), this.setAttribute("uv", new ce(a, 2));

				function c(u) {
					let h = i.length / 3,
						d = u.extractPoints(t),
						f = d.shape,
						p = d.holes;
					vn.isClockWise(f) === !1 && (f = f.reverse());
					for (let x = 0, g = p.length; x < g; x++) {
						let m = p[x];
						vn.isClockWise(m) === !0 && (p[x] = m.reverse())
					}
					let v = vn.triangulateShape(f, p);
					for (let x = 0, g = p.length; x < g; x++) {
						let m = p[x];
						f = f.concat(m)
					}
					for (let x = 0, g = f.length; x < g; x++) {
						let m = f[x];
						i.push(m.x, m.y, 0), s.push(0, 0, 1), a.push(m.x, m.y)
					}
					for (let x = 0, g = v.length; x < g; x++) {
						let m = v[x],
							b = m[0] + h,
							y = m[1] + h,
							E = m[2] + h;
						n.push(b, y, E), l += 3
					}
				}
			}
			toJSON() {
				let e = super.toJSON(),
					t = this.parameters.shapes;
				return vw(t, e)
			}
			static fromJSON(e, t) {
				let n = [];
				for (let i = 0, s = e.shapes.length; i < s; i++) {
					let a = t[e.shapes[i]];
					n.push(a)
				}
				return new Zi(n, e.curveSegments)
			}
		};

	function vw(r, e) {
		if (e.shapes = [], Array.isArray(r))
			for (let t = 0, n = r.length; t < n; t++) {
				let i = r[t];
				e.shapes.push(i.uuid)
			} else e.shapes.push(r.uuid);
		return e
	}
	var Kt = class extends de {
		constructor(e = 1, t = 32, n = 16, i = 0, s = Math.PI * 2, a = 0, o = Math.PI) {
			super();
			this.type = "SphereGeometry", this.parameters = {
				radius: e,
				widthSegments: t,
				heightSegments: n,
				phiStart: i,
				phiLength: s,
				thetaStart: a,
				thetaLength: o
			}, t = Math.max(3, Math.floor(t)), n = Math.max(2, Math.floor(n));
			let l = Math.min(a + o, Math.PI),
				c = 0,
				u = [],
				h = new A,
				d = new A,
				f = [],
				p = [],
				v = [],
				x = [];
			for (let g = 0; g <= n; g++) {
				let m = [],
					b = g / n,
					y = 0;
				g == 0 && a == 0 ? y = .5 / t : g == n && l == Math.PI && (y = -.5 / t);
				for (let E = 0; E <= t; E++) {
					let _ = E / t;
					h.x = -e * Math.cos(i + _ * s) * Math.sin(a + b * o), h.y = e * Math.cos(a + b * o), h.z = e * Math.sin(i + _ * s) * Math.sin(a + b * o), p.push(h.x, h.y, h.z), d.copy(h).normalize(), v.push(d.x, d.y, d.z), x.push(_ + y, 1 - b), m.push(c++)
				}
				u.push(m)
			}
			for (let g = 0; g < n; g++)
				for (let m = 0; m < t; m++) {
					let b = u[g][m + 1],
						y = u[g][m],
						E = u[g + 1][m],
						_ = u[g + 1][m + 1];
					(g !== 0 || a > 0) && f.push(b, y, _), (g !== n - 1 || l < Math.PI) && f.push(y, E, _)
				}
			this.setIndex(f), this.setAttribute("position", new ce(p, 3)), this.setAttribute("normal", new ce(v, 3)), this.setAttribute("uv", new ce(x, 2))
		}
		static fromJSON(e) {
			return new Kt(e.radius, e.widthSegments, e.heightSegments, e.phiStart, e.phiLength, e.thetaStart, e.thetaLength)
		}
	},
		Kr = class extends Mn {
			constructor(e = 1, t = 0) {
				let n = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1],
					i = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];
				super(n, i, e, t);
				this.type = "TetrahedronGeometry", this.parameters = {
					radius: e,
					detail: t
				}
			}
			static fromJSON(e) {
				return new Kr(e.radius, e.detail)
			}
		},
		$r = class extends de {
			constructor(e = 1, t = .4, n = 8, i = 6, s = Math.PI * 2) {
				super();
				this.type = "TorusGeometry", this.parameters = {
					radius: e,
					tube: t,
					radialSegments: n,
					tubularSegments: i,
					arc: s
				}, n = Math.floor(n), i = Math.floor(i);
				let a = [],
					o = [],
					l = [],
					c = [],
					u = new A,
					h = new A,
					d = new A;
				for (let f = 0; f <= n; f++)
					for (let p = 0; p <= i; p++) {
						let v = p / i * s,
							x = f / n * Math.PI * 2;
						h.x = (e + t * Math.cos(x)) * Math.cos(v), h.y = (e + t * Math.cos(x)) * Math.sin(v), h.z = t * Math.sin(x), o.push(h.x, h.y, h.z), u.x = e * Math.cos(v), u.y = e * Math.sin(v), d.subVectors(h, u).normalize(), l.push(d.x, d.y, d.z), c.push(p / i), c.push(f / n)
					}
				for (let f = 1; f <= n; f++)
					for (let p = 1; p <= i; p++) {
						let v = (i + 1) * f + p - 1,
							x = (i + 1) * (f - 1) + p - 1,
							g = (i + 1) * (f - 1) + p,
							m = (i + 1) * f + p;
						a.push(v, x, m), a.push(x, g, m)
					}
				this.setIndex(a), this.setAttribute("position", new ce(o, 3)), this.setAttribute("normal", new ce(l, 3)), this.setAttribute("uv", new ce(c, 2))
			}
			static fromJSON(e) {
				return new $r(e.radius, e.tube, e.radialSegments, e.tubularSegments, e.arc)
			}
		},
		es = class extends de {
			constructor(e = 1, t = .4, n = 64, i = 8, s = 2, a = 3) {
				super();
				this.type = "TorusKnotGeometry", this.parameters = {
					radius: e,
					tube: t,
					tubularSegments: n,
					radialSegments: i,
					p: s,
					q: a
				}, n = Math.floor(n), i = Math.floor(i);
				let o = [],
					l = [],
					c = [],
					u = [],
					h = new A,
					d = new A,
					f = new A,
					p = new A,
					v = new A,
					x = new A,
					g = new A;
				for (let b = 0; b <= n; ++b) {
					let y = b / n * s * Math.PI * 2;
					m(y, s, a, e, f), m(y + .01, s, a, e, p), x.subVectors(p, f), g.addVectors(p, f), v.crossVectors(x, g), g.crossVectors(v, x), v.normalize(), g.normalize();
					for (let E = 0; E <= i; ++E) {
						let _ = E / i * Math.PI * 2,
							w = -t * Math.cos(_),
							D = t * Math.sin(_);
						h.x = f.x + (w * g.x + D * v.x), h.y = f.y + (w * g.y + D * v.y), h.z = f.z + (w * g.z + D * v.z), l.push(h.x, h.y, h.z), d.subVectors(h, f).normalize(), c.push(d.x, d.y, d.z), u.push(b / n), u.push(E / i)
					}
				}
				for (let b = 1; b <= n; b++)
					for (let y = 1; y <= i; y++) {
						let E = (i + 1) * (b - 1) + (y - 1),
							_ = (i + 1) * b + (y - 1),
							w = (i + 1) * b + y,
							D = (i + 1) * (b - 1) + y;
						o.push(E, _, D), o.push(_, w, D)
					}
				this.setIndex(o), this.setAttribute("position", new ce(l, 3)), this.setAttribute("normal", new ce(c, 3)), this.setAttribute("uv", new ce(u, 2));

				function m(b, y, E, _, w) {
					let D = Math.cos(b),
						I = Math.sin(b),
						L = E / y * b,
						R = Math.cos(L);
					w.x = _ * (2 + R) * .5 * D, w.y = _ * (2 + R) * I * .5, w.z = _ * Math.sin(L) * .5
				}
			}
			static fromJSON(e) {
				return new es(e.radius, e.tube, e.tubularSegments, e.radialSegments, e.p, e.q)
			}
		},
		ts = class extends de {
			constructor(e = new ia(new A(-1, -1, 0), new A(-1, 1, 0), new A(1, 1, 0)), t = 64, n = 1, i = 8, s = !1) {
				super();
				this.type = "TubeGeometry", this.parameters = {
					path: e,
					tubularSegments: t,
					radius: n,
					radialSegments: i,
					closed: s
				};
				let a = e.computeFrenetFrames(t, s);
				this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals;
				let o = new A,
					l = new A,
					c = new O,
					u = new A,
					h = [],
					d = [],
					f = [],
					p = [];
				v(), this.setIndex(p), this.setAttribute("position", new ce(h, 3)), this.setAttribute("normal", new ce(d, 3)), this.setAttribute("uv", new ce(f, 2));

				function v() {
					for (let b = 0; b < t; b++) x(b);
					x(s === !1 ? t : 0), m(), g()
				}

				function x(b) {
					u = e.getPointAt(b / t, u);
					let y = a.normals[b],
						E = a.binormals[b];
					for (let _ = 0; _ <= i; _++) {
						let w = _ / i * Math.PI * 2,
							D = Math.sin(w),
							I = -Math.cos(w);
						l.x = I * y.x + D * E.x, l.y = I * y.y + D * E.y, l.z = I * y.z + D * E.z, l.normalize(), d.push(l.x, l.y, l.z), o.x = u.x + n * l.x, o.y = u.y + n * l.y, o.z = u.z + n * l.z, h.push(o.x, o.y, o.z)
					}
				}

				function g() {
					for (let b = 1; b <= t; b++)
						for (let y = 1; y <= i; y++) {
							let E = (i + 1) * (b - 1) + (y - 1),
								_ = (i + 1) * b + (y - 1),
								w = (i + 1) * b + y,
								D = (i + 1) * (b - 1) + y;
							p.push(E, _, D), p.push(_, w, D)
						}
				}

				function m() {
					for (let b = 0; b <= t; b++)
						for (let y = 0; y <= i; y++) c.x = b / t, c.y = y / i, f.push(c.x, c.y)
				}
			}
			toJSON() {
				let e = super.toJSON();
				return e.path = this.parameters.path.toJSON(), e
			}
			static fromJSON(e) {
				return new ts(new Tc[e.path.type]().fromJSON(e.path), e.tubularSegments, e.radius, e.radialSegments, e.closed)
			}
		},
		bo = class extends de {
			constructor(e = null) {
				super();
				if (this.type = "WireframeGeometry", this.parameters = {
					geometry: e
				}, e !== null) {
					let t = [],
						n = new Set,
						i = new A,
						s = new A;
					if (e.index !== null) {
						let a = e.attributes.position,
							o = e.index,
							l = e.groups;
						l.length === 0 && (l = [{
							start: 0,
							count: o.count,
							materialIndex: 0
						}]);
						for (let c = 0, u = l.length; c < u; ++c) {
							let h = l[c],
								d = h.start,
								f = h.count;
							for (let p = d, v = d + f; p < v; p += 3)
								for (let x = 0; x < 3; x++) {
									let g = o.getX(p + x),
										m = o.getX(p + (x + 1) % 3);
									i.fromBufferAttribute(a, g), s.fromBufferAttribute(a, m), Bf(i, s, n) === !0 && (t.push(i.x, i.y, i.z), t.push(s.x, s.y, s.z))
								}
						}
					} else {
						let a = e.attributes.position;
						for (let o = 0, l = a.count / 3; o < l; o++)
							for (let c = 0; c < 3; c++) {
								let u = 3 * o + c,
									h = 3 * o + (c + 1) % 3;
								i.fromBufferAttribute(a, u), s.fromBufferAttribute(a, h), Bf(i, s, n) === !0 && (t.push(i.x, i.y, i.z), t.push(s.x, s.y, s.z))
							}
					}
					this.setAttribute("position", new ce(t, 3))
				}
			}
		};

	function Bf(r, e, t) {
		let n = `${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,
			i = `${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;
		return t.has(n) === !0 || t.has(i) === !0 ? !1 : (t.add(n, i), !0)
	}
	var Uf = Object.freeze({
		__proto__: null,
		BoxGeometry: Gn,
		BoxBufferGeometry: Gn,
		CircleGeometry: Vr,
		CircleBufferGeometry: Vr,
		ConeGeometry: Wr,
		ConeBufferGeometry: Wr,
		CylinderGeometry: fi,
		CylinderBufferGeometry: fi,
		DodecahedronGeometry: Yr,
		DodecahedronBufferGeometry: Yr,
		EdgesGeometry: fo,
		ExtrudeGeometry: Sn,
		ExtrudeBufferGeometry: Sn,
		IcosahedronGeometry: Zr,
		IcosahedronBufferGeometry: Zr,
		LatheGeometry: Jr,
		LatheBufferGeometry: Jr,
		OctahedronGeometry: qi,
		OctahedronBufferGeometry: qi,
		PlaneGeometry: ki,
		PlaneBufferGeometry: ki,
		PolyhedronGeometry: Mn,
		PolyhedronBufferGeometry: Mn,
		RingGeometry: mi,
		RingBufferGeometry: mi,
		ShapeGeometry: Zi,
		ShapeBufferGeometry: Zi,
		SphereGeometry: Kt,
		SphereBufferGeometry: Kt,
		TetrahedronGeometry: Kr,
		TetrahedronBufferGeometry: Kr,
		TorusGeometry: $r,
		TorusBufferGeometry: $r,
		TorusKnotGeometry: es,
		TorusKnotBufferGeometry: es,
		TubeGeometry: ts,
		TubeBufferGeometry: ts,
		WireframeGeometry: bo
	}),
		Ao = class extends tt {
			constructor(e) {
				super();
				this.type = "ShadowMaterial", this.color = new $(0), this.transparent = !0, this.setValues(e)
			}
			copy(e) {
				return super.copy(e), this.color.copy(e.color), this
			}
		};
	Ao.prototype.isShadowMaterial = !0;
	var Ji = class extends tt {
		constructor(e) {
			super();
			this.defines = {
				STANDARD: ""
			}, this.type = "MeshStandardMaterial", this.color = new $(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new $(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Fi, this.normalScale = new O(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.setValues(e)
		}
		copy(e) {
			return super.copy(e), this.defines = {
				STANDARD: ""
			}, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapIntensity = e.envMapIntensity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this
		}
	};
	Ji.prototype.isMeshStandardMaterial = !0;
	var Eo = class extends Ji {
		constructor(e) {
			super();
			this.defines = {
				STANDARD: "",
				PHYSICAL: ""
			}, this.type = "MeshPhysicalMaterial", this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new O(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
				get: function () {
					return It(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1)
				},
				set: function (t) {
					this.ior = (1 + .4 * t) / (1 - .4 * t)
				}
			}), this.sheenColor = new $(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 0, this.attenuationColor = new $(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new $(1, 1, 1), this.specularColorMap = null, this._sheen = 0, this._clearcoat = 0, this._transmission = 0, this.setValues(e)
		}
		get sheen() {
			return this._sheen
		}
		set sheen(e) {
			this._sheen > 0 != e > 0 && this.version++, this._sheen = e
		}
		get clearcoat() {
			return this._clearcoat
		}
		set clearcoat(e) {
			this._clearcoat > 0 != e > 0 && this.version++, this._clearcoat = e
		}
		get transmission() {
			return this._transmission
		}
		set transmission(e) {
			this._transmission > 0 != e > 0 && this.version++, this._transmission = e
		}
		copy(e) {
			return super.copy(e), this.defines = {
				STANDARD: "",
				PHYSICAL: ""
			}, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.ior = e.ior, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this
		}
	};
	Eo.prototype.isMeshPhysicalMaterial = !0;
	var ns = class extends tt {
		constructor(e) {
			super();
			this.type = "MeshPhongMaterial", this.color = new $(16777215), this.specular = new $(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new $(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Fi, this.normalScale = new O(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = ws, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.setValues(e)
		}
		copy(e) {
			return super.copy(e), this.color.copy(e.color), this.specular.copy(e.specular), this.shininess = e.shininess, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this
		}
	};
	ns.prototype.isMeshPhongMaterial = !0;
	var Mo = class extends tt {
		constructor(e) {
			super();
			this.defines = {
				TOON: ""
			}, this.type = "MeshToonMaterial", this.color = new $(16777215), this.map = null, this.gradientMap = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new $(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Fi, this.normalScale = new O(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.alphaMap = null, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.setValues(e)
		}
		copy(e) {
			return super.copy(e), this.color.copy(e.color), this.map = e.map, this.gradientMap = e.gradientMap, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.alphaMap = e.alphaMap, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this
		}
	};
	Mo.prototype.isMeshToonMaterial = !0;
	var So = class extends tt {
		constructor(e) {
			super();
			this.type = "MeshNormalMaterial", this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Fi, this.normalScale = new O(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.flatShading = !1, this.setValues(e)
		}
		copy(e) {
			return super.copy(e), this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.flatShading = e.flatShading, this
		}
	};
	So.prototype.isMeshNormalMaterial = !0;
	var _o = class extends tt {
		constructor(e) {
			super();
			this.type = "MeshLambertMaterial", this.color = new $(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new $(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = ws, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.setValues(e)
		}
		copy(e) {
			return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this
		}
	};
	_o.prototype.isMeshLambertMaterial = !0;
	var To = class extends tt {
		constructor(e) {
			super();
			this.defines = {
				MATCAP: ""
			}, this.type = "MeshMatcapMaterial", this.color = new $(16777215), this.matcap = null, this.map = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Fi, this.normalScale = new O(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.alphaMap = null, this.flatShading = !1, this.setValues(e)
		}
		copy(e) {
			return super.copy(e), this.defines = {
				MATCAP: ""
			}, this.color.copy(e.color), this.matcap = e.matcap, this.map = e.map, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.alphaMap = e.alphaMap, this.flatShading = e.flatShading, this
		}
	};
	To.prototype.isMeshMatcapMaterial = !0;
	var Co = class extends Ke {
		constructor(e) {
			super();
			this.type = "LineDashedMaterial", this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.setValues(e)
		}
		copy(e) {
			return super.copy(e), this.scale = e.scale, this.dashSize = e.dashSize, this.gapSize = e.gapSize, this
		}
	};
	Co.prototype.isLineDashedMaterial = !0;
	var xw = Object.freeze({
		__proto__: null,
		ShadowMaterial: Ao,
		SpriteMaterial: Xi,
		RawShaderMaterial: Vi,
		ShaderMaterial: Ye,
		PointsMaterial: Xt,
		MeshPhysicalMaterial: Eo,
		MeshStandardMaterial: Ji,
		MeshPhongMaterial: ns,
		MeshToonMaterial: Mo,
		MeshNormalMaterial: So,
		MeshLambertMaterial: _o,
		MeshDepthMaterial: Vs,
		MeshDistanceMaterial: Ws,
		MeshBasicMaterial: zt,
		MeshMatcapMaterial: To,
		LineDashedMaterial: Co,
		LineBasicMaterial: Ke,
		Material: tt
	}),
		rt = {
			arraySlice: function (r, e, t) {
				return rt.isTypedArray(r) ? new r.constructor(r.subarray(e, t !== void 0 ? t : r.length)) : r.slice(e, t)
			},
			convertArray: function (r, e, t) {
				return !r || !t && r.constructor === e ? r : typeof e.BYTES_PER_ELEMENT == "number" ? new e(r) : Array.prototype.slice.call(r)
			},
			isTypedArray: function (r) {
				return ArrayBuffer.isView(r) && !(r instanceof DataView)
			},
			getKeyframeOrder: function (r) {
				function e(i, s) {
					return r[i] - r[s]
				}
				let t = r.length,
					n = new Array(t);
				for (let i = 0; i !== t; ++i) n[i] = i;
				return n.sort(e), n
			},
			sortedArray: function (r, e, t) {
				let n = r.length,
					i = new r.constructor(n);
				for (let s = 0, a = 0; a !== n; ++s) {
					let o = t[s] * e;
					for (let l = 0; l !== e; ++l) i[a++] = r[o + l]
				}
				return i
			},
			flattenJSON: function (r, e, t, n) {
				let i = 1,
					s = r[0];
				for (; s !== void 0 && s[n] === void 0;) s = r[i++];
				if (s === void 0) return;
				let a = s[n];
				if (a !== void 0)
					if (Array.isArray(a))
						do a = s[n], a !== void 0 && (e.push(s.time), t.push.apply(t, a)), s = r[i++]; while (s !== void 0);
					else if (a.toArray !== void 0)
						do a = s[n], a !== void 0 && (e.push(s.time), a.toArray(t, t.length)), s = r[i++]; while (s !== void 0);
					else
						do a = s[n], a !== void 0 && (e.push(s.time), t.push(a)), s = r[i++]; while (s !== void 0)
			},
			subclip: function (r, e, t, n, i = 30) {
				let s = r.clone();
				s.name = e;
				let a = [];
				for (let l = 0; l < s.tracks.length; ++l) {
					let c = s.tracks[l],
						u = c.getValueSize(),
						h = [],
						d = [];
					for (let f = 0; f < c.times.length; ++f) {
						let p = c.times[f] * i;
						if (!(p < t || p >= n)) {
							h.push(c.times[f]);
							for (let v = 0; v < u; ++v) d.push(c.values[f * u + v])
						}
					}
					h.length !== 0 && (c.times = rt.convertArray(h, c.times.constructor), c.values = rt.convertArray(d, c.values.constructor), a.push(c))
				}
				s.tracks = a;
				let o = 1 / 0;
				for (let l = 0; l < s.tracks.length; ++l) o > s.tracks[l].times[0] && (o = s.tracks[l].times[0]);
				for (let l = 0; l < s.tracks.length; ++l) s.tracks[l].shift(-1 * o);
				return s.resetDuration(), s
			},
			makeClipAdditive: function (r, e = 0, t = r, n = 30) {
				n <= 0 && (n = 30);
				let i = t.tracks.length,
					s = e / n;
				for (let a = 0; a < i; ++a) {
					let o = t.tracks[a],
						l = o.ValueTypeName;
					if (l === "bool" || l === "string") continue;
					let c = r.tracks.find(function (g) {
						return g.name === o.name && g.ValueTypeName === l
					});
					if (c === void 0) continue;
					let u = 0,
						h = o.getValueSize();
					o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (u = h / 3);
					let d = 0,
						f = c.getValueSize();
					c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (d = f / 3);
					let p = o.times.length - 1,
						v;
					if (s <= o.times[0]) {
						let g = u,
							m = h - u;
						v = rt.arraySlice(o.values, g, m)
					} else if (s >= o.times[p]) {
						let g = p * h + u,
							m = g + h - u;
						v = rt.arraySlice(o.values, g, m)
					} else {
						let g = o.createInterpolant(),
							m = u,
							b = h - u;
						g.evaluate(s), v = rt.arraySlice(g.resultBuffer, m, b)
					}
					l === "quaternion" && new yt().fromArray(v).normalize().conjugate().toArray(v);
					let x = c.times.length;
					for (let g = 0; g < x; ++g) {
						let m = g * f + d;
						if (l === "quaternion") yt.multiplyQuaternionsFlat(c.values, m, v, 0, c.values, m);
						else {
							let b = f - d * 2;
							for (let y = 0; y < b; ++y) c.values[m + y] -= v[y]
						}
					}
				}
				return r.blendMode = Sl, r
			}
		},
		_n = class {
			constructor(e, t, n, i) {
				this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = i !== void 0 ? i : new t.constructor(n), this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {}
			}
			evaluate(e) {
				let t = this.parameterPositions,
					n = this._cachedIndex,
					i = t[n],
					s = t[n - 1];
				e: {
					t: {
						let a; n: {
							i: if (!(e < i)) {
								for (let o = n + 2; ;) {
									if (i === void 0) {
										if (e < s) break i;
										return n = t.length, this._cachedIndex = n, this.afterEnd_(n - 1, e, s)
									}
									if (n === o) break;
									if (s = i, i = t[++n], e < i) break t
								}
								a = t.length;
								break n
							} if (!(e >= s)) {
								let o = t[1];
								e < o && (n = 2, s = o);
								for (let l = n - 2; ;) {
									if (s === void 0) return this._cachedIndex = 0, this.beforeStart_(0, e, i);
									if (n === l) break;
									if (i = s, s = t[--n - 1], e >= s) break t
								}
								a = n, n = 0;
								break n
							}
							break e
						}
						for (; n < a;) {
							let o = n + a >>> 1;
							e < t[o] ? a = o : n = o + 1
						}
						if (i = t[n], s = t[n - 1], s === void 0) return this._cachedIndex = 0,
							this.beforeStart_(0, e, i);
						if (i === void 0) return n = t.length,
							this._cachedIndex = n,
							this.afterEnd_(n - 1, s, e)
					}
					this._cachedIndex = n,
						this.intervalChanged_(n, s, i)
				}
				return this.interpolate_(n, s, e, i)
			}
			getSettings_() {
				return this.settings || this.DefaultSettings_
			}
			copySampleValue_(e) {
				let t = this.resultBuffer,
					n = this.sampleValues,
					i = this.valueSize,
					s = e * i;
				for (let a = 0; a !== i; ++a) t[a] = n[s + a];
				return t
			}
			interpolate_() {
				throw new Error("call to abstract method")
			}
			intervalChanged_() { }
		};
	_n.prototype.beforeStart_ = _n.prototype.copySampleValue_;
	_n.prototype.afterEnd_ = _n.prototype.copySampleValue_;
	var Pc = class extends _n {
		constructor(e, t, n, i) {
			super(e, t, n, i);
			this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
				endingStart: Bi,
				endingEnd: Bi
			}
		}
		intervalChanged_(e, t, n) {
			let i = this.parameterPositions,
				s = e - 2,
				a = e + 1,
				o = i[s],
				l = i[a];
			if (o === void 0) switch (this.getSettings_().endingStart) {
				case Ui:
					s = e, o = 2 * t - n;
					break;
				case Cs:
					s = i.length - 2, o = t + i[s] - i[s + 1];
					break;
				default:
					s = e, o = n
			}
			if (l === void 0) switch (this.getSettings_().endingEnd) {
				case Ui:
					a = e, l = 2 * n - t;
					break;
				case Cs:
					a = 1, l = n + i[1] - i[0];
					break;
				default:
					a = e - 1, l = t
			}
			let c = (n - t) * .5,
				u = this.valueSize;
			this._weightPrev = c / (t - o), this._weightNext = c / (l - n), this._offsetPrev = s * u, this._offsetNext = a * u
		}
		interpolate_(e, t, n, i) {
			let s = this.resultBuffer,
				a = this.sampleValues,
				o = this.valueSize,
				l = e * o,
				c = l - o,
				u = this._offsetPrev,
				h = this._offsetNext,
				d = this._weightPrev,
				f = this._weightNext,
				p = (n - t) / (i - t),
				v = p * p,
				x = v * p,
				g = -d * x + 2 * d * v - d * p,
				m = (1 + d) * x + (-1.5 - 2 * d) * v + (-.5 + d) * p + 1,
				b = (-1 - f) * x + (1.5 + f) * v + .5 * p,
				y = f * x - f * v;
			for (let E = 0; E !== o; ++E) s[E] = g * a[u + E] + m * a[c + E] + b * a[l + E] + y * a[h + E];
			return s
		}
	},
		Do = class extends _n {
			constructor(e, t, n, i) {
				super(e, t, n, i)
			}
			interpolate_(e, t, n, i) {
				let s = this.resultBuffer,
					a = this.sampleValues,
					o = this.valueSize,
					l = e * o,
					c = l - o,
					u = (n - t) / (i - t),
					h = 1 - u;
				for (let d = 0; d !== o; ++d) s[d] = a[c + d] * h + a[l + d] * u;
				return s
			}
		},
		Lc = class extends _n {
			constructor(e, t, n, i) {
				super(e, t, n, i)
			}
			interpolate_(e) {
				return this.copySampleValue_(e - 1)
			}
		},
		$t = class {
			constructor(e, t, n, i) {
				if (e === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
				if (t === void 0 || t.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
				this.name = e, this.times = rt.convertArray(t, this.TimeBufferType), this.values = rt.convertArray(n, this.ValueBufferType), this.setInterpolation(i || this.DefaultInterpolation)
			}
			static toJSON(e) {
				let t = e.constructor,
					n;
				if (t.toJSON !== this.toJSON) n = t.toJSON(e);
				else {
					n = {
						name: e.name,
						times: rt.convertArray(e.times, Array),
						values: rt.convertArray(e.values, Array)
					};
					let i = e.getInterpolation();
					i !== e.DefaultInterpolation && (n.interpolation = i)
				}
				return n.type = e.ValueTypeName, n
			}
			InterpolantFactoryMethodDiscrete(e) {
				return new Lc(this.times, this.values, this.getValueSize(), e)
			}
			InterpolantFactoryMethodLinear(e) {
				return new Do(this.times, this.values, this.getValueSize(), e)
			}
			InterpolantFactoryMethodSmooth(e) {
				return new Pc(this.times, this.values, this.getValueSize(), e)
			}
			setInterpolation(e) {
				let t;
				switch (e) {
					case _s:
						t = this.InterpolantFactoryMethodDiscrete;
						break;
					case Ts:
						t = this.InterpolantFactoryMethodLinear;
						break;
					case ba:
						t = this.InterpolantFactoryMethodSmooth;
						break
				}
				if (t === void 0) {
					let n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
					if (this.createInterpolant === void 0)
						if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
						else throw new Error(n);
					return console.warn("THREE.KeyframeTrack:", n), this
				}
				return this.createInterpolant = t, this
			}
			getInterpolation() {
				switch (this.createInterpolant) {
					case this.InterpolantFactoryMethodDiscrete:
						return _s;
					case this.InterpolantFactoryMethodLinear:
						return Ts;
					case this.InterpolantFactoryMethodSmooth:
						return ba
				}
			}
			getValueSize() {
				return this.values.length / this.times.length
			}
			shift(e) {
				if (e !== 0) {
					let t = this.times;
					for (let n = 0, i = t.length; n !== i; ++n) t[n] += e
				}
				return this
			}
			scale(e) {
				if (e !== 1) {
					let t = this.times;
					for (let n = 0, i = t.length; n !== i; ++n) t[n] *= e
				}
				return this
			}
			trim(e, t) {
				let n = this.times,
					i = n.length,
					s = 0,
					a = i - 1;
				for (; s !== i && n[s] < e;) ++s;
				for (; a !== -1 && n[a] > t;) --a;
				if (++a, s !== 0 || a !== i) {
					s >= a && (a = Math.max(a, 1), s = a - 1);
					let o = this.getValueSize();
					this.times = rt.arraySlice(n, s, a), this.values = rt.arraySlice(this.values, s * o, a * o)
				}
				return this
			}
			validate() {
				let e = !0,
					t = this.getValueSize();
				t - Math.floor(t) != 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), e = !1);
				let n = this.times,
					i = this.values,
					s = n.length;
				s === 0 && (console.error("THREE.KeyframeTrack: Track is empty.", this), e = !1);
				let a = null;
				for (let o = 0; o !== s; o++) {
					let l = n[o];
					if (typeof l == "number" && isNaN(l)) {
						console.error("THREE.KeyframeTrack: Time is not a valid number.", this, o, l), e = !1;
						break
					}
					if (a !== null && a > l) {
						console.error("THREE.KeyframeTrack: Out of order keys.", this, o, l, a), e = !1;
						break
					}
					a = l
				}
				if (i !== void 0 && rt.isTypedArray(i))
					for (let o = 0, l = i.length; o !== l; ++o) {
						let c = i[o];
						if (isNaN(c)) {
							console.error("THREE.KeyframeTrack: Value is not a valid number.", this, o, c), e = !1;
							break
						}
					}
				return e
			}
			optimize() {
				let e = rt.arraySlice(this.times),
					t = rt.arraySlice(this.values),
					n = this.getValueSize(),
					i = this.getInterpolation() === ba,
					s = e.length - 1,
					a = 1;
				for (let o = 1; o < s; ++o) {
					let l = !1,
						c = e[o],
						u = e[o + 1];
					if (c !== u && (o !== 1 || c !== e[0]))
						if (i) l = !0;
						else {
							let h = o * n,
								d = h - n,
								f = h + n;
							for (let p = 0; p !== n; ++p) {
								let v = t[h + p];
								if (v !== t[d + p] || v !== t[f + p]) {
									l = !0;
									break
								}
							}
						} if (l) {
							if (o !== a) {
								e[a] = e[o];
								let h = o * n,
									d = a * n;
								for (let f = 0; f !== n; ++f) t[d + f] = t[h + f]
							} ++a
						}
				}
				if (s > 0) {
					e[a] = e[s];
					for (let o = s * n, l = a * n, c = 0; c !== n; ++c) t[l + c] = t[o + c];
					++a
				}
				return a !== e.length ? (this.times = rt.arraySlice(e, 0, a), this.values = rt.arraySlice(t, 0, a * n)) : (this.times = e, this.values = t), this
			}
			clone() {
				let e = rt.arraySlice(this.times, 0),
					t = rt.arraySlice(this.values, 0),
					n = this.constructor,
					i = new n(this.name, e, t);
				return i.createInterpolant = this.createInterpolant, i
			}
		};
	$t.prototype.TimeBufferType = Float32Array;
	$t.prototype.ValueBufferType = Float32Array;
	$t.prototype.DefaultInterpolation = Ts;
	var gi = class extends $t { };
	gi.prototype.ValueTypeName = "bool";
	gi.prototype.ValueBufferType = Array;
	gi.prototype.DefaultInterpolation = _s;
	gi.prototype.InterpolantFactoryMethodLinear = void 0;
	gi.prototype.InterpolantFactoryMethodSmooth = void 0;
	var Ro = class extends $t { };
	Ro.prototype.ValueTypeName = "color";
	var is = class extends $t { };
	is.prototype.ValueTypeName = "number";
	var Ic = class extends _n {
		constructor(e, t, n, i) {
			super(e, t, n, i)
		}
		interpolate_(e, t, n, i) {
			let s = this.resultBuffer,
				a = this.sampleValues,
				o = this.valueSize,
				l = (n - t) / (i - t),
				c = e * o;
			for (let u = c + o; c !== u; c += 4) yt.slerpFlat(s, 0, a, c - o, a, c, l);
			return s
		}
	},
		Ki = class extends $t {
			InterpolantFactoryMethodLinear(e) {
				return new Ic(this.times, this.values, this.getValueSize(), e)
			}
		};
	Ki.prototype.ValueTypeName = "quaternion";
	Ki.prototype.DefaultInterpolation = Ts;
	Ki.prototype.InterpolantFactoryMethodSmooth = void 0;
	var vi = class extends $t { };
	vi.prototype.ValueTypeName = "string";
	vi.prototype.ValueBufferType = Array;
	vi.prototype.DefaultInterpolation = _s;
	vi.prototype.InterpolantFactoryMethodLinear = void 0;
	vi.prototype.InterpolantFactoryMethodSmooth = void 0;
	var rs = class extends $t { };
	rs.prototype.ValueTypeName = "vector";
	var ss = class {
		constructor(e, t = -1, n, i = Aa) {
			this.name = e, this.tracks = n, this.duration = t, this.blendMode = i, this.uuid = Wt(), this.duration < 0 && this.resetDuration()
		}
		static parse(e) {
			let t = [],
				n = e.tracks,
				i = 1 / (e.fps || 1);
			for (let a = 0, o = n.length; a !== o; ++a) t.push(ww(n[a]).scale(i));
			let s = new this(e.name, e.duration, t, e.blendMode);
			return s.uuid = e.uuid, s
		}
		static toJSON(e) {
			let t = [],
				n = e.tracks,
				i = {
					name: e.name,
					duration: e.duration,
					tracks: t,
					uuid: e.uuid,
					blendMode: e.blendMode
				};
			for (let s = 0, a = n.length; s !== a; ++s) t.push($t.toJSON(n[s]));
			return i
		}
		static CreateFromMorphTargetSequence(e, t, n, i) {
			let s = t.length,
				a = [];
			for (let o = 0; o < s; o++) {
				let l = [],
					c = [];
				l.push((o + s - 1) % s, o, (o + 1) % s), c.push(0, 1, 0);
				let u = rt.getKeyframeOrder(l);
				l = rt.sortedArray(l, 1, u), c = rt.sortedArray(c, 1, u), !i && l[0] === 0 && (l.push(s), c.push(c[0])), a.push(new is(".morphTargetInfluences[" + t[o].name + "]", l, c).scale(1 / n))
			}
			return new this(e, -1, a)
		}
		static findByName(e, t) {
			let n = e;
			if (!Array.isArray(e)) {
				let i = e;
				n = i.geometry && i.geometry.animations || i.animations
			}
			for (let i = 0; i < n.length; i++)
				if (n[i].name === t) return n[i];
			return null
		}
		static CreateClipsFromMorphTargetSequences(e, t, n) {
			let i = {},
				s = /^([\w-]*?)([\d]+)$/;
			for (let o = 0, l = e.length; o < l; o++) {
				let c = e[o],
					u = c.name.match(s);
				if (u && u.length > 1) {
					let h = u[1],
						d = i[h];
					d || (i[h] = d = []), d.push(c)
				}
			}
			let a = [];
			for (let o in i) a.push(this.CreateFromMorphTargetSequence(o, i[o], t, n));
			return a
		}
		static parseAnimation(e, t) {
			if (!e) return console.error("THREE.AnimationClip: No animation in JSONLoader data."), null;
			let n = function (h, d, f, p, v) {
				if (f.length !== 0) {
					let x = [],
						g = [];
					rt.flattenJSON(f, x, g, p), x.length !== 0 && v.push(new h(d, x, g))
				}
			},
				i = [],
				s = e.name || "default",
				a = e.fps || 30,
				o = e.blendMode,
				l = e.length || -1,
				c = e.hierarchy || [];
			for (let h = 0; h < c.length; h++) {
				let d = c[h].keys;
				if (!(!d || d.length === 0))
					if (d[0].morphTargets) {
						let f = {},
							p;
						for (p = 0; p < d.length; p++)
							if (d[p].morphTargets)
								for (let v = 0; v < d[p].morphTargets.length; v++) f[d[p].morphTargets[v]] = -1;
						for (let v in f) {
							let x = [],
								g = [];
							for (let m = 0; m !== d[p].morphTargets.length; ++m) {
								let b = d[p];
								x.push(b.time), g.push(b.morphTarget === v ? 1 : 0)
							}
							i.push(new is(".morphTargetInfluence[" + v + "]", x, g))
						}
						l = f.length * (a || 1)
					} else {
						let f = ".bones[" + t[h].name + "]";
						n(rs, f + ".position", d, "pos", i), n(Ki, f + ".quaternion", d, "rot", i), n(rs, f + ".scale", d, "scl", i)
					}
			}
			return i.length === 0 ? null : new this(s, l, i, o)
		}
		resetDuration() {
			let e = this.tracks,
				t = 0;
			for (let n = 0, i = e.length; n !== i; ++n) {
				let s = this.tracks[n];
				t = Math.max(t, s.times[s.times.length - 1])
			}
			return this.duration = t, this
		}
		trim() {
			for (let e = 0; e < this.tracks.length; e++) this.tracks[e].trim(0, this.duration);
			return this
		}
		validate() {
			let e = !0;
			for (let t = 0; t < this.tracks.length; t++) e = e && this.tracks[t].validate();
			return e
		}
		optimize() {
			for (let e = 0; e < this.tracks.length; e++) this.tracks[e].optimize();
			return this
		}
		clone() {
			let e = [];
			for (let t = 0; t < this.tracks.length; t++) e.push(this.tracks[t].clone());
			return new this.constructor(this.name, this.duration, e, this.blendMode)
		}
		toJSON() {
			return this.constructor.toJSON(this)
		}
	};

	function yw(r) {
		switch (r.toLowerCase()) {
			case "scalar":
			case "double":
			case "float":
			case "number":
			case "integer":
				return is;
			case "vector":
			case "vector2":
			case "vector3":
			case "vector4":
				return rs;
			case "color":
				return Ro;
			case "quaternion":
				return Ki;
			case "bool":
			case "boolean":
				return gi;
			case "string":
				return vi
		}
		throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + r)
	}

	function ww(r) {
		if (r.type === void 0) throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
		let e = yw(r.type);
		if (r.times === void 0) {
			let t = [],
				n = [];
			rt.flattenJSON(r.keys, t, n, "value"), r.times = t, r.values = n
		}
		return e.parse !== void 0 ? e.parse(r) : new e(r.name, r.times, r.values, r.interpolation)
	}
	var $i = {
		enabled: !1,
		files: {},
		add: function (r, e) {
			this.enabled !== !1 && (this.files[r] = e)
		},
		get: function (r) {
			if (this.enabled !== !1) return this.files[r]
		},
		remove: function (r) {
			delete this.files[r]
		},
		clear: function () {
			this.files = {}
		}
	},
		as = class {
			constructor(e, t, n) {
				let i = this,
					s = !1,
					a = 0,
					o = 0,
					l, c = [];
				this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this.itemStart = function (u) {
					o++, s === !1 && i.onStart !== void 0 && i.onStart(u, a, o), s = !0
				}, this.itemEnd = function (u) {
					a++, i.onProgress !== void 0 && i.onProgress(u, a, o), a === o && (s = !1, i.onLoad !== void 0 && i.onLoad())
				}, this.itemError = function (u) {
					i.onError !== void 0 && i.onError(u)
				}, this.resolveURL = function (u) {
					return l ? l(u) : u
				}, this.setURLModifier = function (u) {
					return l = u, this
				}, this.addHandler = function (u, h) {
					return c.push(u, h), this
				}, this.removeHandler = function (u) {
					let h = c.indexOf(u);
					return h !== -1 && c.splice(h, 2), this
				}, this.getHandler = function (u) {
					for (let h = 0, d = c.length; h < d; h += 2) {
						let f = c[h],
							p = c[h + 1];
						if (f.global && (f.lastIndex = 0), f.test(u)) return p
					}
					return null
				}
			}
		},
		Ff = new as,
		Dt = class {
			constructor(e) {
				this.manager = e !== void 0 ? e : Ff, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}
			}
			load() { }
			loadAsync(e, t) {
				let n = this;
				return new Promise(function (i, s) {
					n.load(e, i, t, s)
				})
			}
			parse() { }
			setCrossOrigin(e) {
				return this.crossOrigin = e, this
			}
			setWithCredentials(e) {
				return this.withCredentials = e, this
			}
			setPath(e) {
				return this.path = e, this
			}
			setResourcePath(e) {
				return this.resourcePath = e, this
			}
			setRequestHeader(e) {
				return this.requestHeader = e, this
			}
		},
		Wn = {},
		Qt = class extends Dt {
			constructor(e) {
				super(e)
			}
			load(e, t, n, i) {
				e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
				let s = $i.get(e);
				if (s !== void 0) return this.manager.itemStart(e), setTimeout(() => {
					t && t(s), this.manager.itemEnd(e)
				}, 0), s;
				if (Wn[e] !== void 0) {
					Wn[e].push({
						onLoad: t,
						onProgress: n,
						onError: i
					});
					return
				}
				Wn[e] = [], Wn[e].push({
					onLoad: t,
					onProgress: n,
					onError: i
				});
				let a = new Request(e, {
					headers: new Headers(this.requestHeader),
					credentials: this.withCredentials ? "include" : "same-origin"
				});
				fetch(a).then(o => {
					if (o.status === 200 || o.status === 0) {
						o.status === 0 && console.warn("THREE.FileLoader: HTTP Status 0 received.");
						let l = Wn[e],
							c = o.body.getReader(),
							u = o.headers.get("Content-Length"),
							h = u ? parseInt(u) : 0,
							d = h !== 0,
							f = 0;
						return new ReadableStream({
							start(p) {
								v();

								function v() {
									c.read().then(({
										done: x,
										value: g
									}) => {
										if (x) p.close();
										else {
											f += g.byteLength;
											let m = new ProgressEvent("progress", {
												lengthComputable: d,
												loaded: f,
												total: h
											});
											for (let b = 0, y = l.length; b < y; b++) {
												let E = l[b];
												E.onProgress && E.onProgress(m)
											}
											p.enqueue(g), v()
										}
									})
								}
							}
						})
					} else throw Error(`fetch for "${o.url}" responded with ${o.status}: ${o.statusText}`)
				}).then(o => {
					let l = new Response(o);
					switch (this.responseType) {
						case "arraybuffer":
							return l.arrayBuffer();
						case "blob":
							return l.blob();
						case "document":
							return l.text().then(c => new DOMParser().parseFromString(c, this.mimeType));
						case "json":
							return l.json();
						default:
							return l.text()
					}
				}).then(o => {
					$i.add(e, o);
					let l = Wn[e];
					delete Wn[e];
					for (let c = 0, u = l.length; c < u; c++) {
						let h = l[c];
						h.onLoad && h.onLoad(o)
					}
					this.manager.itemEnd(e)
				}).catch(o => {
					let l = Wn[e];
					delete Wn[e];
					for (let c = 0, u = l.length; c < u; c++) {
						let h = l[c];
						h.onError && h.onError(o)
					}
					this.manager.itemError(e), this.manager.itemEnd(e)
				}), this.manager.itemStart(e)
			}
			setResponseType(e) {
				return this.responseType = e, this
			}
			setMimeType(e) {
				return this.mimeType = e, this
			}
		},
		Of = class extends Dt {
			constructor(e) {
				super(e)
			}
			load(e, t, n, i) {
				let s = this,
					a = new Qt(this.manager);
				a.setPath(this.path), a.setRequestHeader(this.requestHeader), a.setWithCredentials(this.withCredentials), a.load(e, function (o) {
					try {
						t(s.parse(JSON.parse(o)))
					} catch (l) {
						i ? i(l) : console.error(l), s.manager.itemError(e)
					}
				}, n, i)
			}
			parse(e) {
				let t = [];
				for (let n = 0; n < e.length; n++) {
					let i = ss.parse(e[n]);
					t.push(i)
				}
				return t
			}
		},
		Nf = class extends Dt {
			constructor(e) {
				super(e)
			}
			load(e, t, n, i) {
				let s = this,
					a = [],
					o = new lo,
					l = new Qt(this.manager);
				l.setPath(this.path), l.setResponseType("arraybuffer"), l.setRequestHeader(this.requestHeader), l.setWithCredentials(s.withCredentials);
				let c = 0;

				function u(h) {
					l.load(e[h], function (d) {
						let f = s.parse(d, !0);
						a[h] = {
							width: f.width,
							height: f.height,
							format: f.format,
							mipmaps: f.mipmaps
						}, c += 1, c === 6 && (f.mipmapCount === 1 && (o.minFilter = et), o.image = a, o.format = f.format, o.needsUpdate = !0, t && t(o))
					}, n, i)
				}
				if (Array.isArray(e))
					for (let h = 0, d = e.length; h < d; ++h) u(h);
				else l.load(e, function (h) {
					let d = s.parse(h, !0);
					if (d.isCubemap) {
						let f = d.mipmaps.length / d.mipmapCount;
						for (let p = 0; p < f; p++) {
							a[p] = {
								mipmaps: []
							};
							for (let v = 0; v < d.mipmapCount; v++) a[p].mipmaps.push(d.mipmaps[p * d.mipmapCount + v]), a[p].format = d.format, a[p].width = d.width, a[p].height = d.height
						}
						o.image = a
					} else o.image.width = d.width, o.image.height = d.height, o.mipmaps = d.mipmaps;
					d.mipmapCount === 1 && (o.minFilter = et), o.format = d.format, o.needsUpdate = !0, t && t(o)
				}, n, i);
				return o
			}
		},
		os = class extends Dt {
			constructor(e) {
				super(e)
			}
			load(e, t, n, i) {
				this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
				let s = this,
					a = $i.get(e);
				if (a !== void 0) return s.manager.itemStart(e), setTimeout(function () {
					t && t(a), s.manager.itemEnd(e)
				}, 0), a;
				let o = Ta("img");

				function l() {
					u(), $i.add(e, this), t && t(this), s.manager.itemEnd(e)
				}

				function c(h) {
					u(), i && i(h), s.manager.itemError(e), s.manager.itemEnd(e)
				}

				function u() {
					o.removeEventListener("load", l, !1), o.removeEventListener("error", c, !1)
				}
				return o.addEventListener("load", l, !1), o.addEventListener("error", c, !1), e.substr(0, 5) !== "data:" && this.crossOrigin !== void 0 && (o.crossOrigin = this.crossOrigin), s.manager.itemStart(e), o.src = e, o
			}
		},
		Bc = class extends Dt {
			constructor(e) {
				super(e)
			}
			load(e, t, n, i) {
				let s = new Gi,
					a = new os(this.manager);
				a.setCrossOrigin(this.crossOrigin), a.setPath(this.path);
				let o = 0;

				function l(c) {
					a.load(e[c], function (u) {
						s.images[c] = u, o++, o === 6 && (s.needsUpdate = !0, t && t(s))
					}, void 0, i)
				}
				for (let c = 0; c < e.length; ++c) l(c);
				return s
			}
		},
		Uc = class extends Dt {
			constructor(e) {
				super(e)
			}
			load(e, t, n, i) {
				let s = this,
					a = new Vn,
					o = new Qt(this.manager);
				return o.setResponseType("arraybuffer"), o.setRequestHeader(this.requestHeader), o.setPath(this.path), o.setWithCredentials(s.withCredentials), o.load(e, function (l) {
					let c = s.parse(l);
					!c || (c.image !== void 0 ? a.image = c.image : c.data !== void 0 && (a.image.width = c.width, a.image.height = c.height, a.image.data = c.data), a.wrapS = c.wrapS !== void 0 ? c.wrapS : _t, a.wrapT = c.wrapT !== void 0 ? c.wrapT : _t, a.magFilter = c.magFilter !== void 0 ? c.magFilter : et, a.minFilter = c.minFilter !== void 0 ? c.minFilter : et, a.anisotropy = c.anisotropy !== void 0 ? c.anisotropy : 1, c.encoding !== void 0 && (a.encoding = c.encoding), c.flipY !== void 0 && (a.flipY = c.flipY), c.format !== void 0 && (a.format = c.format), c.type !== void 0 && (a.type = c.type), c.mipmaps !== void 0 && (a.mipmaps = c.mipmaps, a.minFilter = Pi), c.mipmapCount === 1 && (a.minFilter = et), c.generateMipmaps !== void 0 && (a.generateMipmaps = c.generateMipmaps), a.needsUpdate = !0, t && t(a, c))
				}, n, i), a
			}
		},
		en = class extends Dt {
			constructor(e) {
				super(e)
			}
			load(e, t, n, i) {
				let s = new ot,
					a = new os(this.manager);
				return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(e, function (o) {
					s.image = o, s.needsUpdate = !0, t !== void 0 && t(s)
				}, n, i), s
			}
		},
		tn = class extends _e {
			constructor(e, t = 1) {
				super();
				this.type = "Light", this.color = new $(e), this.intensity = t
			}
			dispose() { }
			copy(e) {
				return super.copy(e), this.color.copy(e.color), this.intensity = e.intensity, this
			}
			toJSON(e) {
				let t = super.toJSON(e);
				return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, this.groundColor !== void 0 && (t.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (t.object.distance = this.distance), this.angle !== void 0 && (t.object.angle = this.angle), this.decay !== void 0 && (t.object.decay = this.decay), this.penumbra !== void 0 && (t.object.penumbra = this.penumbra), this.shadow !== void 0 && (t.object.shadow = this.shadow.toJSON()), t
			}
		};
	tn.prototype.isLight = !0;
	var Po = class extends tn {
		constructor(e, t, n) {
			super(e, n);
			this.type = "HemisphereLight", this.position.copy(_e.DefaultUp), this.updateMatrix(), this.groundColor = new $(t)
		}
		copy(e) {
			return tn.prototype.copy.call(this, e), this.groundColor.copy(e.groundColor), this
		}
	};
	Po.prototype.isHemisphereLight = !0;
	var Hf = new ge,
		zf = new A,
		Gf = new A,
		Lo = class {
			constructor(e) {
				this.camera = e, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new O(512, 512), this.map = null, this.mapPass = null, this.matrix = new ge, this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Rr, this._frameExtents = new O(1, 1), this._viewportCount = 1, this._viewports = [new Ve(0, 0, 1, 1)]
			}
			getViewportCount() {
				return this._viewportCount
			}
			getFrustum() {
				return this._frustum
			}
			updateMatrices(e) {
				let t = this.camera,
					n = this.matrix;
				zf.setFromMatrixPosition(e.matrixWorld), t.position.copy(zf), Gf.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(Gf), t.updateMatrixWorld(), Hf.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Hf), n.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), n.multiply(t.projectionMatrix), n.multiply(t.matrixWorldInverse)
			}
			getViewport(e) {
				return this._viewports[e]
			}
			getFrameExtents() {
				return this._frameExtents
			}
			dispose() {
				this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose()
			}
			copy(e) {
				return this.camera = e.camera.clone(), this.bias = e.bias, this.radius = e.radius, this.mapSize.copy(e.mapSize), this
			}
			clone() {
				return new this.constructor().copy(this)
			}
			toJSON() {
				let e = {};
				return this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e
			}
		},
		Fc = class extends Lo {
			constructor() {
				super(new ct(50, 1, .5, 500));
				this.focus = 1
			}
			updateMatrices(e) {
				let t = this.camera,
					n = Ds * 2 * e.angle * this.focus,
					i = this.mapSize.width / this.mapSize.height,
					s = e.distance || t.far;
				(n !== t.fov || i !== t.aspect || s !== t.far) && (t.fov = n, t.aspect = i, t.far = s, t.updateProjectionMatrix()), super.updateMatrices(e)
			}
			copy(e) {
				return super.copy(e), this.focus = e.focus, this
			}
		};
	Fc.prototype.isSpotLightShadow = !0;
	var Io = class extends tn {
		constructor(e, t, n = 0, i = Math.PI / 3, s = 0, a = 1) {
			super(e, t);
			this.type = "SpotLight", this.position.copy(_e.DefaultUp), this.updateMatrix(), this.target = new _e, this.distance = n, this.angle = i, this.penumbra = s, this.decay = a, this.shadow = new Fc
		}
		get power() {
			return this.intensity * Math.PI
		}
		set power(e) {
			this.intensity = e / Math.PI
		}
		dispose() {
			this.shadow.dispose()
		}
		copy(e) {
			return super.copy(e), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.shadow = e.shadow.clone(), this
		}
	};
	Io.prototype.isSpotLight = !0;
	var kf = new ge,
		la = new A,
		Oc = new A,
		Nc = class extends Lo {
			constructor() {
				super(new ct(90, 1, .5, 500));
				this._frameExtents = new O(4, 2), this._viewportCount = 6, this._viewports = [new Ve(2, 1, 1, 1), new Ve(0, 1, 1, 1), new Ve(3, 1, 1, 1), new Ve(1, 1, 1, 1), new Ve(3, 0, 1, 1), new Ve(1, 0, 1, 1)], this._cubeDirections = [new A(1, 0, 0), new A(-1, 0, 0), new A(0, 0, 1), new A(0, 0, -1), new A(0, 1, 0), new A(0, -1, 0)], this._cubeUps = [new A(0, 1, 0), new A(0, 1, 0), new A(0, 1, 0), new A(0, 1, 0), new A(0, 0, 1), new A(0, 0, -1)]
			}
			updateMatrices(e, t = 0) {
				let n = this.camera,
					i = this.matrix,
					s = e.distance || n.far;
				s !== n.far && (n.far = s, n.updateProjectionMatrix()), la.setFromMatrixPosition(e.matrixWorld), n.position.copy(la), Oc.copy(n.position), Oc.add(this._cubeDirections[t]), n.up.copy(this._cubeUps[t]), n.lookAt(Oc), n.updateMatrixWorld(), i.makeTranslation(-la.x, -la.y, -la.z), kf.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(kf)
			}
		};
	Nc.prototype.isPointLightShadow = !0;
	var ls = class extends tn {
		constructor(e, t, n = 0, i = 1) {
			super(e, t);
			this.type = "PointLight", this.distance = n, this.decay = i, this.shadow = new Nc
		}
		get power() {
			return this.intensity * 4 * Math.PI
		}
		set power(e) {
			this.intensity = e / (4 * Math.PI)
		}
		dispose() {
			this.shadow.dispose()
		}
		copy(e) {
			return super.copy(e), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this
		}
	};
	ls.prototype.isPointLight = !0;
	var Hc = class extends Lo {
		constructor() {
			super(new Pr(-5, 5, 5, -5, .5, 500))
		}
	};
	Hc.prototype.isDirectionalLightShadow = !0;
	var Bo = class extends tn {
		constructor(e, t) {
			super(e, t);
			this.type = "DirectionalLight", this.position.copy(_e.DefaultUp), this.updateMatrix(), this.target = new _e, this.shadow = new Hc
		}
		dispose() {
			this.shadow.dispose()
		}
		copy(e) {
			return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this
		}
	};
	Bo.prototype.isDirectionalLight = !0;
	var cs = class extends tn {
		constructor(e, t) {
			super(e, t);
			this.type = "AmbientLight"
		}
	};
	cs.prototype.isAmbientLight = !0;
	var Uo = class extends tn {
		constructor(e, t, n = 10, i = 10) {
			super(e, t);
			this.type = "RectAreaLight", this.width = n, this.height = i
		}
		get power() {
			return this.intensity * this.width * this.height * Math.PI
		}
		set power(e) {
			this.intensity = e / (this.width * this.height * Math.PI)
		}
		copy(e) {
			return super.copy(e), this.width = e.width, this.height = e.height, this
		}
		toJSON(e) {
			let t = super.toJSON(e);
			return t.object.width = this.width, t.object.height = this.height, t
		}
	};
	Uo.prototype.isRectAreaLight = !0;
	var Fo = class {
		constructor() {
			this.coefficients = [];
			for (let e = 0; e < 9; e++) this.coefficients.push(new A)
		}
		set(e) {
			for (let t = 0; t < 9; t++) this.coefficients[t].copy(e[t]);
			return this
		}
		zero() {
			for (let e = 0; e < 9; e++) this.coefficients[e].set(0, 0, 0);
			return this
		}
		getAt(e, t) {
			let n = e.x,
				i = e.y,
				s = e.z,
				a = this.coefficients;
			return t.copy(a[0]).multiplyScalar(.282095), t.addScaledVector(a[1], .488603 * i), t.addScaledVector(a[2], .488603 * s), t.addScaledVector(a[3], .488603 * n), t.addScaledVector(a[4], 1.092548 * (n * i)), t.addScaledVector(a[5], 1.092548 * (i * s)), t.addScaledVector(a[6], .315392 * (3 * s * s - 1)), t.addScaledVector(a[7], 1.092548 * (n * s)), t.addScaledVector(a[8], .546274 * (n * n - i * i)), t
		}
		getIrradianceAt(e, t) {
			let n = e.x,
				i = e.y,
				s = e.z,
				a = this.coefficients;
			return t.copy(a[0]).multiplyScalar(.886227), t.addScaledVector(a[1], 2 * .511664 * i), t.addScaledVector(a[2], 2 * .511664 * s), t.addScaledVector(a[3], 2 * .511664 * n), t.addScaledVector(a[4], 2 * .429043 * n * i), t.addScaledVector(a[5], 2 * .429043 * i * s), t.addScaledVector(a[6], .743125 * s * s - .247708), t.addScaledVector(a[7], 2 * .429043 * n * s), t.addScaledVector(a[8], .429043 * (n * n - i * i)), t
		}
		add(e) {
			for (let t = 0; t < 9; t++) this.coefficients[t].add(e.coefficients[t]);
			return this
		}
		addScaledSH(e, t) {
			for (let n = 0; n < 9; n++) this.coefficients[n].addScaledVector(e.coefficients[n], t);
			return this
		}
		scale(e) {
			for (let t = 0; t < 9; t++) this.coefficients[t].multiplyScalar(e);
			return this
		}
		lerp(e, t) {
			for (let n = 0; n < 9; n++) this.coefficients[n].lerp(e.coefficients[n], t);
			return this
		}
		equals(e) {
			for (let t = 0; t < 9; t++)
				if (!this.coefficients[t].equals(e.coefficients[t])) return !1;
			return !0
		}
		copy(e) {
			return this.set(e.coefficients)
		}
		clone() {
			return new this.constructor().copy(this)
		}
		fromArray(e, t = 0) {
			let n = this.coefficients;
			for (let i = 0; i < 9; i++) n[i].fromArray(e, t + i * 3);
			return this
		}
		toArray(e = [], t = 0) {
			let n = this.coefficients;
			for (let i = 0; i < 9; i++) n[i].toArray(e, t + i * 3);
			return e
		}
		static getBasisAt(e, t) {
			let n = e.x,
				i = e.y,
				s = e.z;
			t[0] = .282095, t[1] = .488603 * i, t[2] = .488603 * s, t[3] = .488603 * n, t[4] = 1.092548 * n * i, t[5] = 1.092548 * i * s, t[6] = .315392 * (3 * s * s - 1), t[7] = 1.092548 * n * s, t[8] = .546274 * (n * n - i * i)
		}
	};
	Fo.prototype.isSphericalHarmonics3 = !0;
	var us = class extends tn {
		constructor(e = new Fo, t = 1) {
			super(void 0, t);
			this.sh = e
		}
		copy(e) {
			return super.copy(e), this.sh.copy(e.sh), this
		}
		fromJSON(e) {
			return this.intensity = e.intensity, this.sh.fromArray(e.sh), this
		}
		toJSON(e) {
			let t = super.toJSON(e);
			return t.object.sh = this.sh.toArray(), t
		}
	};
	us.prototype.isLightProbe = !0;
	var zc = class extends Dt {
		constructor(e) {
			super(e);
			this.textures = {}
		}
		load(e, t, n, i) {
			let s = this,
				a = new Qt(s.manager);
			a.setPath(s.path), a.setRequestHeader(s.requestHeader), a.setWithCredentials(s.withCredentials), a.load(e, function (o) {
				try {
					t(s.parse(JSON.parse(o)))
				} catch (l) {
					i ? i(l) : console.error(l), s.manager.itemError(e)
				}
			}, n, i)
		}
		parse(e) {
			let t = this.textures;

			function n(s) {
				return t[s] === void 0 && console.warn("THREE.MaterialLoader: Undefined texture", s), t[s]
			}
			let i = new xw[e.type];
			if (e.uuid !== void 0 && (i.uuid = e.uuid), e.name !== void 0 && (i.name = e.name), e.color !== void 0 && i.color !== void 0 && i.color.setHex(e.color), e.roughness !== void 0 && (i.roughness = e.roughness), e.metalness !== void 0 && (i.metalness = e.metalness), e.sheen !== void 0 && (i.sheen = e.sheen), e.sheenColor !== void 0 && (i.sheenColor = new $().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (i.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && i.emissive !== void 0 && i.emissive.setHex(e.emissive), e.specular !== void 0 && i.specular !== void 0 && i.specular.setHex(e.specular), e.specularIntensity !== void 0 && (i.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && i.specularColor !== void 0 && i.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (i.shininess = e.shininess), e.clearcoat !== void 0 && (i.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (i.clearcoatRoughness = e.clearcoatRoughness), e.transmission !== void 0 && (i.transmission = e.transmission), e.thickness !== void 0 && (i.thickness = e.thickness), e.attenuationDistance !== void 0 && (i.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && i.attenuationColor !== void 0 && i.attenuationColor.setHex(e.attenuationColor), e.fog !== void 0 && (i.fog = e.fog), e.flatShading !== void 0 && (i.flatShading = e.flatShading), e.blending !== void 0 && (i.blending = e.blending), e.combine !== void 0 && (i.combine = e.combine), e.side !== void 0 && (i.side = e.side), e.shadowSide !== void 0 && (i.shadowSide = e.shadowSide), e.opacity !== void 0 && (i.opacity = e.opacity), e.format !== void 0 && (i.format = e.format), e.transparent !== void 0 && (i.transparent = e.transparent), e.alphaTest !== void 0 && (i.alphaTest = e.alphaTest), e.depthTest !== void 0 && (i.depthTest = e.depthTest), e.depthWrite !== void 0 && (i.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (i.colorWrite = e.colorWrite), e.stencilWrite !== void 0 && (i.stencilWrite = e.stencilWrite), e.stencilWriteMask !== void 0 && (i.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (i.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (i.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (i.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (i.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (i.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (i.stencilZPass = e.stencilZPass), e.wireframe !== void 0 && (i.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (i.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (i.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (i.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (i.rotation = e.rotation), e.linewidth !== 1 && (i.linewidth = e.linewidth), e.dashSize !== void 0 && (i.dashSize = e.dashSize), e.gapSize !== void 0 && (i.gapSize = e.gapSize), e.scale !== void 0 && (i.scale = e.scale), e.polygonOffset !== void 0 && (i.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (i.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (i.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (i.dithering = e.dithering), e.alphaToCoverage !== void 0 && (i.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (i.premultipliedAlpha = e.premultipliedAlpha), e.visible !== void 0 && (i.visible = e.visible), e.toneMapped !== void 0 && (i.toneMapped = e.toneMapped), e.userData !== void 0 && (i.userData = e.userData), e.vertexColors !== void 0 && (typeof e.vertexColors == "number" ? i.vertexColors = e.vertexColors > 0 : i.vertexColors = e.vertexColors), e.uniforms !== void 0)
				for (let s in e.uniforms) {
					let a = e.uniforms[s];
					switch (i.uniforms[s] = {}, a.type) {
						case "t":
							i.uniforms[s].value = n(a.value);
							break;
						case "c":
							i.uniforms[s].value = new $().setHex(a.value);
							break;
						case "v2":
							i.uniforms[s].value = new O().fromArray(a.value);
							break;
						case "v3":
							i.uniforms[s].value = new A().fromArray(a.value);
							break;
						case "v4":
							i.uniforms[s].value = new Ve().fromArray(a.value);
							break;
						case "m3":
							i.uniforms[s].value = new Et().fromArray(a.value);
							break;
						case "m4":
							i.uniforms[s].value = new ge().fromArray(a.value);
							break;
						default:
							i.uniforms[s].value = a.value
					}
				}
			if (e.defines !== void 0 && (i.defines = e.defines), e.vertexShader !== void 0 && (i.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (i.fragmentShader = e.fragmentShader), e.extensions !== void 0)
				for (let s in e.extensions) i.extensions[s] = e.extensions[s];
			if (e.shading !== void 0 && (i.flatShading = e.shading === 1), e.size !== void 0 && (i.size = e.size), e.sizeAttenuation !== void 0 && (i.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (i.map = n(e.map)), e.matcap !== void 0 && (i.matcap = n(e.matcap)), e.alphaMap !== void 0 && (i.alphaMap = n(e.alphaMap)), e.bumpMap !== void 0 && (i.bumpMap = n(e.bumpMap)), e.bumpScale !== void 0 && (i.bumpScale = e.bumpScale), e.normalMap !== void 0 && (i.normalMap = n(e.normalMap)), e.normalMapType !== void 0 && (i.normalMapType = e.normalMapType), e.normalScale !== void 0) {
				let s = e.normalScale;
				Array.isArray(s) === !1 && (s = [s, s]), i.normalScale = new O().fromArray(s)
			}
			return e.displacementMap !== void 0 && (i.displacementMap = n(e.displacementMap)), e.displacementScale !== void 0 && (i.displacementScale = e.displacementScale), e.displacementBias !== void 0 && (i.displacementBias = e.displacementBias), e.roughnessMap !== void 0 && (i.roughnessMap = n(e.roughnessMap)), e.metalnessMap !== void 0 && (i.metalnessMap = n(e.metalnessMap)), e.emissiveMap !== void 0 && (i.emissiveMap = n(e.emissiveMap)), e.emissiveIntensity !== void 0 && (i.emissiveIntensity = e.emissiveIntensity), e.specularMap !== void 0 && (i.specularMap = n(e.specularMap)), e.specularIntensityMap !== void 0 && (i.specularIntensityMap = n(e.specularIntensityMap)), e.specularColorMap !== void 0 && (i.specularColorMap = n(e.specularColorMap)), e.envMap !== void 0 && (i.envMap = n(e.envMap)), e.envMapIntensity !== void 0 && (i.envMapIntensity = e.envMapIntensity), e.reflectivity !== void 0 && (i.reflectivity = e.reflectivity), e.refractionRatio !== void 0 && (i.refractionRatio = e.refractionRatio), e.lightMap !== void 0 && (i.lightMap = n(e.lightMap)), e.lightMapIntensity !== void 0 && (i.lightMapIntensity = e.lightMapIntensity), e.aoMap !== void 0 && (i.aoMap = n(e.aoMap)), e.aoMapIntensity !== void 0 && (i.aoMapIntensity = e.aoMapIntensity), e.gradientMap !== void 0 && (i.gradientMap = n(e.gradientMap)), e.clearcoatMap !== void 0 && (i.clearcoatMap = n(e.clearcoatMap)), e.clearcoatRoughnessMap !== void 0 && (i.clearcoatRoughnessMap = n(e.clearcoatRoughnessMap)), e.clearcoatNormalMap !== void 0 && (i.clearcoatNormalMap = n(e.clearcoatNormalMap)), e.clearcoatNormalScale !== void 0 && (i.clearcoatNormalScale = new O().fromArray(e.clearcoatNormalScale)), e.transmissionMap !== void 0 && (i.transmissionMap = n(e.transmissionMap)), e.thicknessMap !== void 0 && (i.thicknessMap = n(e.thicknessMap)), e.sheenColorMap !== void 0 && (i.sheenColorMap = n(e.sheenColorMap)), e.sheenRoughnessMap !== void 0 && (i.sheenRoughnessMap = n(e.sheenRoughnessMap)), i
		}
		setTextures(e) {
			return this.textures = e, this
		}
	},
		ca = class {
			static decodeText(e) {
				if (typeof TextDecoder != "undefined") return new TextDecoder().decode(e);
				let t = "";
				for (let n = 0, i = e.length; n < i; n++) t += String.fromCharCode(e[n]);
				try {
					return decodeURIComponent(escape(t))
				} catch (n) {
					return t
				}
			}
			static extractUrlBase(e) {
				let t = e.lastIndexOf("/");
				return t === -1 ? "./" : e.substr(0, t + 1)
			}
			static resolveURL(e, t) {
				return typeof e != "string" || e === "" ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e)
			}
		},
		Oo = class extends de {
			constructor() {
				super();
				this.type = "InstancedBufferGeometry", this.instanceCount = 1 / 0
			}
			copy(e) {
				return super.copy(e), this.instanceCount = e.instanceCount, this
			}
			clone() {
				return new this.constructor().copy(this)
			}
			toJSON() {
				let e = super.toJSON(this);
				return e.instanceCount = this.instanceCount, e.isInstancedBufferGeometry = !0, e
			}
		};
	Oo.prototype.isInstancedBufferGeometry = !0;
	var Gc = class extends Dt {
		constructor(e) {
			super(e)
		}
		load(e, t, n, i) {
			let s = this,
				a = new Qt(s.manager);
			a.setPath(s.path), a.setRequestHeader(s.requestHeader), a.setWithCredentials(s.withCredentials), a.load(e, function (o) {
				try {
					t(s.parse(JSON.parse(o)))
				} catch (l) {
					i ? i(l) : console.error(l), s.manager.itemError(e)
				}
			}, n, i)
		}
		parse(e) {
			let t = {},
				n = {};

			function i(f, p) {
				if (t[p] !== void 0) return t[p];
				let x = f.interleavedBuffers[p],
					g = s(f, x.buffer),
					m = mr(x.type, g),
					b = new hi(m, x.stride);
				return b.uuid = x.uuid, t[p] = b, b
			}

			function s(f, p) {
				if (n[p] !== void 0) return n[p];
				let x = f.arrayBuffers[p],
					g = new Uint32Array(x).buffer;
				return n[p] = g, g
			}
			let a = e.isInstancedBufferGeometry ? new Oo : new de,
				o = e.data.index;
			if (o !== void 0) {
				let f = mr(o.type, o.array);
				a.setIndex(new pe(f, 1))
			}
			let l = e.data.attributes;
			for (let f in l) {
				let p = l[f],
					v;
				if (p.isInterleavedBufferAttribute) {
					let x = i(e.data, p.data);
					v = new kn(x, p.itemSize, p.offset, p.normalized)
				} else {
					let x = mr(p.type, p.array),
						g = p.isInstancedBufferAttribute ? di : pe;
					v = new g(x, p.itemSize, p.normalized)
				}
				p.name !== void 0 && (v.name = p.name), p.usage !== void 0 && v.setUsage(p.usage), p.updateRange !== void 0 && (v.updateRange.offset = p.updateRange.offset, v.updateRange.count = p.updateRange.count), a.setAttribute(f, v)
			}
			let c = e.data.morphAttributes;
			if (c)
				for (let f in c) {
					let p = c[f],
						v = [];
					for (let x = 0, g = p.length; x < g; x++) {
						let m = p[x],
							b;
						if (m.isInterleavedBufferAttribute) {
							let y = i(e.data, m.data);
							b = new kn(y, m.itemSize, m.offset, m.normalized)
						} else {
							let y = mr(m.type, m.array);
							b = new pe(y, m.itemSize, m.normalized)
						}
						m.name !== void 0 && (b.name = m.name), v.push(b)
					}
					a.morphAttributes[f] = v
				}
			e.data.morphTargetsRelative && (a.morphTargetsRelative = !0);
			let h = e.data.groups || e.data.drawcalls || e.data.offsets;
			if (h !== void 0)
				for (let f = 0, p = h.length; f !== p; ++f) {
					let v = h[f];
					a.addGroup(v.start, v.count, v.materialIndex)
				}
			let d = e.data.boundingSphere;
			if (d !== void 0) {
				let f = new A;
				d.center !== void 0 && f.fromArray(d.center), a.boundingSphere = new Un(f, d.radius)
			}
			return e.name && (a.name = e.name), e.userData && (a.userData = e.userData), a
		}
	},
		Vf = class extends Dt {
			constructor(e) {
				super(e)
			}
			load(e, t, n, i) {
				let s = this,
					a = this.path === "" ? ca.extractUrlBase(e) : this.path;
				this.resourcePath = this.resourcePath || a;
				let o = new Qt(this.manager);
				o.setPath(this.path), o.setRequestHeader(this.requestHeader), o.setWithCredentials(this.withCredentials), o.load(e, function (l) {
					let c = null;
					try {
						c = JSON.parse(l)
					} catch (h) {
						i !== void 0 && i(h), console.error("THREE:ObjectLoader: Can't parse " + e + ".", h.message);
						return
					}
					let u = c.metadata;
					if (u === void 0 || u.type === void 0 || u.type.toLowerCase() === "geometry") {
						console.error("THREE.ObjectLoader: Can't load " + e);
						return
					}
					s.parse(c, t)
				}, n, i)
			}
			loadAsync(e, t) {
				return qt(this, null, function* () {
					let n = this,
						i = this.path === "" ? ca.extractUrlBase(e) : this.path;
					this.resourcePath = this.resourcePath || i;
					let s = new Qt(this.manager);
					s.setPath(this.path), s.setRequestHeader(this.requestHeader), s.setWithCredentials(this.withCredentials);
					let a = yield s.loadAsync(e, t), o = JSON.parse(a), l = o.metadata;
					if (l === void 0 || l.type === void 0 || l.type.toLowerCase() === "geometry") throw new Error("THREE.ObjectLoader: Can't load " + e);
					return yield n.parseAsync(o)
				})
			}
			parse(e, t) {
				let n = this.parseAnimations(e.animations),
					i = this.parseShapes(e.shapes),
					s = this.parseGeometries(e.geometries, i),
					a = this.parseImages(e.images, function () {
						t !== void 0 && t(c)
					}),
					o = this.parseTextures(e.textures, a),
					l = this.parseMaterials(e.materials, o),
					c = this.parseObject(e.object, s, l, o, n),
					u = this.parseSkeletons(e.skeletons, c);
				if (this.bindSkeletons(c, u), t !== void 0) {
					let h = !1;
					for (let d in a)
						if (a[d] instanceof HTMLImageElement) {
							h = !0;
							break
						} h === !1 && t(c)
				}
				return c
			}
			parseAsync(e) {
				return qt(this, null, function* () {
					let t = this.parseAnimations(e.animations),
						n = this.parseShapes(e.shapes),
						i = this.parseGeometries(e.geometries, n),
						s = yield this.parseImagesAsync(e.images), a = this.parseTextures(e.textures, s), o = this.parseMaterials(e.materials, a), l = this.parseObject(e.object, i, o, a, t), c = this.parseSkeletons(e.skeletons, l);
					return this.bindSkeletons(l, c), l
				})
			}
			parseShapes(e) {
				let t = {};
				if (e !== void 0)
					for (let n = 0, i = e.length; n < i; n++) {
						let s = new gn().fromJSON(e[n]);
						t[s.uuid] = s
					}
				return t
			}
			parseSkeletons(e, t) {
				let n = {},
					i = {};
				if (t.traverse(function (s) {
					s.isBone && (i[s.uuid] = s)
				}), e !== void 0)
					for (let s = 0, a = e.length; s < a; s++) {
						let o = new Js().fromJSON(e[s], i);
						n[o.uuid] = o
					}
				return n
			}
			parseGeometries(e, t) {
				let n = {};
				if (e !== void 0) {
					let i = new Gc;
					for (let s = 0, a = e.length; s < a; s++) {
						let o, l = e[s];
						switch (l.type) {
							case "BufferGeometry":
							case "InstancedBufferGeometry":
								o = i.parse(l);
								break;
							case "Geometry":
								console.error("THREE.ObjectLoader: The legacy Geometry type is no longer supported.");
								break;
							default:
								l.type in Uf ? o = Uf[l.type].fromJSON(l, t) : console.warn(`THREE.ObjectLoader: Unsupported geometry type "${l.type}"`)
						}
						o.uuid = l.uuid, l.name !== void 0 && (o.name = l.name), o.isBufferGeometry === !0 && l.userData !== void 0 && (o.userData = l.userData), n[l.uuid] = o
					}
				}
				return n
			}
			parseMaterials(e, t) {
				let n = {},
					i = {};
				if (e !== void 0) {
					let s = new zc;
					s.setTextures(t);
					for (let a = 0, o = e.length; a < o; a++) {
						let l = e[a];
						if (l.type === "MultiMaterial") {
							let c = [];
							for (let u = 0; u < l.materials.length; u++) {
								let h = l.materials[u];
								n[h.uuid] === void 0 && (n[h.uuid] = s.parse(h)), c.push(n[h.uuid])
							}
							i[l.uuid] = c
						} else n[l.uuid] === void 0 && (n[l.uuid] = s.parse(l)), i[l.uuid] = n[l.uuid]
					}
				}
				return i
			}
			parseAnimations(e) {
				let t = {};
				if (e !== void 0)
					for (let n = 0; n < e.length; n++) {
						let i = e[n],
							s = ss.parse(i);
						t[s.uuid] = s
					}
				return t
			}
			parseImages(e, t) {
				let n = this,
					i = {},
					s;

				function a(l) {
					return n.manager.itemStart(l), s.load(l, function () {
						n.manager.itemEnd(l)
					}, void 0, function () {
						n.manager.itemError(l), n.manager.itemEnd(l)
					})
				}

				function o(l) {
					if (typeof l == "string") {
						let c = l,
							u = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(c) ? c : n.resourcePath + c;
						return a(u)
					} else return l.data ? {
						data: mr(l.type, l.data),
						width: l.width,
						height: l.height
					} : null
				}
				if (e !== void 0 && e.length > 0) {
					let l = new as(t);
					s = new os(l), s.setCrossOrigin(this.crossOrigin);
					for (let c = 0, u = e.length; c < u; c++) {
						let h = e[c],
							d = h.url;
						if (Array.isArray(d)) {
							i[h.uuid] = [];
							for (let f = 0, p = d.length; f < p; f++) {
								let v = d[f],
									x = o(v);
								x !== null && (x instanceof HTMLImageElement ? i[h.uuid].push(x) : i[h.uuid].push(new Vn(x.data, x.width, x.height)))
							}
						} else {
							let f = o(h.url);
							f !== null && (i[h.uuid] = f)
						}
					}
				}
				return i
			}
			parseImagesAsync(e) {
				return qt(this, null, function* () {
					let t = this,
						n = {},
						i;

					function s(a) {
						return qt(this, null, function* () {
							if (typeof a == "string") {
								let o = a,
									l = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(o) ? o : t.resourcePath + o;
								return yield i.loadAsync(l)
							} else return a.data ? {
								data: mr(a.type, a.data),
								width: a.width,
								height: a.height
							} : null
						})
					}
					if (e !== void 0 && e.length > 0) {
						i = new os(this.manager), i.setCrossOrigin(this.crossOrigin);
						for (let a = 0, o = e.length; a < o; a++) {
							let l = e[a],
								c = l.url;
							if (Array.isArray(c)) {
								n[l.uuid] = [];
								for (let u = 0, h = c.length; u < h; u++) {
									let d = c[u],
										f = yield s(d);
									f !== null && (f instanceof HTMLImageElement ? n[l.uuid].push(f) : n[l.uuid].push(new Vn(f.data, f.width, f.height)))
								}
							} else {
								let u = yield s(l.url);
								u !== null && (n[l.uuid] = u)
							}
						}
					}
					return n
				})
			}
			parseTextures(e, t) {
				function n(s, a) {
					return typeof s == "number" ? s : (console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.", s), a[s])
				}
				let i = {};
				if (e !== void 0)
					for (let s = 0, a = e.length; s < a; s++) {
						let o = e[s];
						o.image === void 0 && console.warn('THREE.ObjectLoader: No "image" specified for', o.uuid), t[o.image] === void 0 && console.warn("THREE.ObjectLoader: Undefined image", o.image);
						let l, c = t[o.image];
						Array.isArray(c) ? (l = new Gi(c), c.length === 6 && (l.needsUpdate = !0)) : (c && c.data ? l = new Vn(c.data, c.width, c.height) : l = new ot(c), c && (l.needsUpdate = !0)), l.uuid = o.uuid, o.name !== void 0 && (l.name = o.name), o.mapping !== void 0 && (l.mapping = n(o.mapping, bw)), o.offset !== void 0 && l.offset.fromArray(o.offset), o.repeat !== void 0 && l.repeat.fromArray(o.repeat), o.center !== void 0 && l.center.fromArray(o.center), o.rotation !== void 0 && (l.rotation = o.rotation), o.wrap !== void 0 && (l.wrapS = n(o.wrap[0], Wf), l.wrapT = n(o.wrap[1], Wf)), o.format !== void 0 && (l.format = o.format), o.type !== void 0 && (l.type = o.type), o.encoding !== void 0 && (l.encoding = o.encoding), o.minFilter !== void 0 && (l.minFilter = n(o.minFilter, Yf)), o.magFilter !== void 0 && (l.magFilter = n(o.magFilter, Yf)), o.anisotropy !== void 0 && (l.anisotropy = o.anisotropy), o.flipY !== void 0 && (l.flipY = o.flipY), o.premultiplyAlpha !== void 0 && (l.premultiplyAlpha = o.premultiplyAlpha), o.unpackAlignment !== void 0 && (l.unpackAlignment = o.unpackAlignment), o.userData !== void 0 && (l.userData = o.userData), i[o.uuid] = l
					}
				return i
			}
			parseObject(e, t, n, i, s) {
				let a;

				function o(d) {
					return t[d] === void 0 && console.warn("THREE.ObjectLoader: Undefined geometry", d), t[d]
				}

				function l(d) {
					if (d !== void 0) {
						if (Array.isArray(d)) {
							let f = [];
							for (let p = 0, v = d.length; p < v; p++) {
								let x = d[p];
								n[x] === void 0 && console.warn("THREE.ObjectLoader: Undefined material", x), f.push(n[x])
							}
							return f
						}
						return n[d] === void 0 && console.warn("THREE.ObjectLoader: Undefined material", d), n[d]
					}
				}

				function c(d) {
					return i[d] === void 0 && console.warn("THREE.ObjectLoader: Undefined texture", d), i[d]
				}
				let u, h;
				switch (e.type) {
					case "Scene":
						a = new mn, e.background !== void 0 && (Number.isInteger(e.background) ? a.background = new $(e.background) : a.background = c(e.background)), e.environment !== void 0 && (a.environment = c(e.environment)), e.fog !== void 0 && (e.fog.type === "Fog" ? a.fog = new Or(e.fog.color, e.fog.near, e.fog.far) : e.fog.type === "FogExp2" && (a.fog = new Fr(e.fog.color, e.fog.density)));
						break;
					case "PerspectiveCamera":
						a = new ct(e.fov, e.aspect, e.near, e.far), e.focus !== void 0 && (a.focus = e.focus), e.zoom !== void 0 && (a.zoom = e.zoom), e.filmGauge !== void 0 && (a.filmGauge = e.filmGauge), e.filmOffset !== void 0 && (a.filmOffset = e.filmOffset), e.view !== void 0 && (a.view = Object.assign({}, e.view));
						break;
					case "OrthographicCamera":
						a = new Pr(e.left, e.right, e.top, e.bottom, e.near, e.far), e.zoom !== void 0 && (a.zoom = e.zoom), e.view !== void 0 && (a.view = Object.assign({}, e.view));
						break;
					case "AmbientLight":
						a = new cs(e.color, e.intensity);
						break;
					case "DirectionalLight":
						a = new Bo(e.color, e.intensity);
						break;
					case "PointLight":
						a = new ls(e.color, e.intensity, e.distance, e.decay);
						break;
					case "RectAreaLight":
						a = new Uo(e.color, e.intensity, e.width, e.height);
						break;
					case "SpotLight":
						a = new Io(e.color, e.intensity, e.distance, e.angle, e.penumbra, e.decay);
						break;
					case "HemisphereLight":
						a = new Po(e.color, e.groundColor, e.intensity);
						break;
					case "LightProbe":
						a = new us().fromJSON(e);
						break;
					case "SkinnedMesh":
						u = o(e.geometry), h = l(e.material), a = new qs(u, h), e.bindMode !== void 0 && (a.bindMode = e.bindMode), e.bindMatrix !== void 0 && a.bindMatrix.fromArray(e.bindMatrix), e.skeleton !== void 0 && (a.skeleton = e.skeleton);
						break;
					case "Mesh":
						u = o(e.geometry), h = l(e.material), a = new ze(u, h);
						break;
					case "InstancedMesh":
						u = o(e.geometry), h = l(e.material);
						let d = e.count,
							f = e.instanceMatrix,
							p = e.instanceColor;
						a = new io(u, h, d), a.instanceMatrix = new di(new Float32Array(f.array), 16), p !== void 0 && (a.instanceColor = new di(new Float32Array(p.array), p.itemSize));
						break;
					case "LOD":
						a = new kr;
						break;
					case "Line":
						a = new kt(o(e.geometry), l(e.material));
						break;
					case "LineLoop":
						a = new so(o(e.geometry), l(e.material));
						break;
					case "LineSegments":
						a = new Mt(o(e.geometry), l(e.material));
						break;
					case "PointCloud":
					case "Points":
						a = new Ot(o(e.geometry), l(e.material));
						break;
					case "Sprite":
						a = new Qi(l(e.material));
						break;
					case "Group":
						a = new En;
						break;
					case "Bone":
						a = new Zs;
						break;
					default:
						a = new _e
				}
				if (a.uuid = e.uuid, e.name !== void 0 && (a.name = e.name), e.matrix !== void 0 ? (a.matrix.fromArray(e.matrix), e.matrixAutoUpdate !== void 0 && (a.matrixAutoUpdate = e.matrixAutoUpdate), a.matrixAutoUpdate && a.matrix.decompose(a.position, a.quaternion, a.scale)) : (e.position !== void 0 && a.position.fromArray(e.position), e.rotation !== void 0 && a.rotation.fromArray(e.rotation), e.quaternion !== void 0 && a.quaternion.fromArray(e.quaternion), e.scale !== void 0 && a.scale.fromArray(e.scale)), e.castShadow !== void 0 && (a.castShadow = e.castShadow), e.receiveShadow !== void 0 && (a.receiveShadow = e.receiveShadow), e.shadow && (e.shadow.bias !== void 0 && (a.shadow.bias = e.shadow.bias), e.shadow.normalBias !== void 0 && (a.shadow.normalBias = e.shadow.normalBias), e.shadow.radius !== void 0 && (a.shadow.radius = e.shadow.radius), e.shadow.mapSize !== void 0 && a.shadow.mapSize.fromArray(e.shadow.mapSize), e.shadow.camera !== void 0 && (a.shadow.camera = this.parseObject(e.shadow.camera))), e.visible !== void 0 && (a.visible = e.visible), e.frustumCulled !== void 0 && (a.frustumCulled = e.frustumCulled), e.renderOrder !== void 0 && (a.renderOrder = e.renderOrder), e.userData !== void 0 && (a.userData = e.userData), e.layers !== void 0 && (a.layers.mask = e.layers), e.children !== void 0) {
					let d = e.children;
					for (let f = 0; f < d.length; f++) a.add(this.parseObject(d[f], t, n, i, s))
				}
				if (e.animations !== void 0) {
					let d = e.animations;
					for (let f = 0; f < d.length; f++) {
						let p = d[f];
						a.animations.push(s[p])
					}
				}
				if (e.type === "LOD") {
					e.autoUpdate !== void 0 && (a.autoUpdate = e.autoUpdate);
					let d = e.levels;
					for (let f = 0; f < d.length; f++) {
						let p = d[f],
							v = a.getObjectByProperty("uuid", p.object);
						v !== void 0 && a.addLevel(v, p.distance)
					}
				}
				return a
			}
			bindSkeletons(e, t) {
				Object.keys(t).length !== 0 && e.traverse(function (n) {
					if (n.isSkinnedMesh === !0 && n.skeleton !== void 0) {
						let i = t[n.skeleton];
						i === void 0 ? console.warn("THREE.ObjectLoader: No skeleton found with UUID:", n.skeleton) : n.bind(i, n.bindMatrix)
					}
				})
			}
			setTexturePath(e) {
				return console.warn("THREE.ObjectLoader: .setTexturePath() has been renamed to .setResourcePath()."), this.setResourcePath(e)
			}
		},
		bw = {
			UVMapping: xa,
			CubeReflectionMapping: Di,
			CubeRefractionMapping: Ri,
			EquirectangularReflectionMapping: bs,
			EquirectangularRefractionMapping: As,
			CubeUVReflectionMapping: dr,
			CubeUVRefractionMapping: Es
		},
		Wf = {
			RepeatWrapping: Ms,
			ClampToEdgeWrapping: _t,
			MirroredRepeatWrapping: Ss
		},
		Yf = {
			NearestFilter: At,
			NearestMipmapNearestFilter: ya,
			NearestMipmapLinearFilter: wa,
			LinearFilter: et,
			LinearMipmapNearestFilter: pl,
			LinearMipmapLinearFilter: Pi
		},
		kc = class extends Dt {
			constructor(e) {
				super(e);
				typeof createImageBitmap == "undefined" && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."), typeof fetch == "undefined" && console.warn("THREE.ImageBitmapLoader: fetch() not supported."), this.options = {
					premultiplyAlpha: "none"
				}
			}
			setOptions(e) {
				return this.options = e, this
			}
			load(e, t, n, i) {
				e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
				let s = this,
					a = $i.get(e);
				if (a !== void 0) return s.manager.itemStart(e), setTimeout(function () {
					t && t(a), s.manager.itemEnd(e)
				}, 0), a;
				let o = {};
				o.credentials = this.crossOrigin === "anonymous" ? "same-origin" : "include", o.headers = this.requestHeader, fetch(e, o).then(function (l) {
					return l.blob()
				}).then(function (l) {
					return createImageBitmap(l, Object.assign(s.options, {
						colorSpaceConversion: "none"
					}))
				}).then(function (l) {
					$i.add(e, l), t && t(l), s.manager.itemEnd(e)
				}).catch(function (l) {
					i && i(l), s.manager.itemError(e), s.manager.itemEnd(e)
				}), s.manager.itemStart(e)
			}
		};
	kc.prototype.isImageBitmapLoader = !0;
	var No, Vc = {
		getContext: function () {
			return No === void 0 && (No = new (window.AudioContext || window.webkitAudioContext)), No
		},
		setContext: function (r) {
			No = r
		}
	},
		Wc = class extends Dt {
			constructor(e) {
				super(e)
			}
			load(e, t, n, i) {
				let s = this,
					a = new Qt(this.manager);
				a.setResponseType("arraybuffer"), a.setPath(this.path), a.setRequestHeader(this.requestHeader), a.setWithCredentials(this.withCredentials), a.load(e, function (o) {
					try {
						let l = o.slice(0);
						Vc.getContext().decodeAudioData(l, function (u) {
							t(u)
						})
					} catch (l) {
						i ? i(l) : console.error(l), s.manager.itemError(e)
					}
				}, n, i)
			}
		},
		Yc = class extends us {
			constructor(e, t, n = 1) {
				super(void 0, n);
				let i = new $().set(e),
					s = new $().set(t),
					a = new A(i.r, i.g, i.b),
					o = new A(s.r, s.g, s.b),
					l = Math.sqrt(Math.PI),
					c = l * Math.sqrt(.75);
				this.sh.coefficients[0].copy(a).add(o).multiplyScalar(l), this.sh.coefficients[1].copy(a).sub(o).multiplyScalar(c)
			}
		};
	Yc.prototype.isHemisphereLightProbe = !0;
	var jc = class extends us {
		constructor(e, t = 1) {
			super(void 0, t);
			let n = new $().set(e);
			this.sh.coefficients[0].set(n.r, n.g, n.b).multiplyScalar(2 * Math.sqrt(Math.PI))
		}
	};
	jc.prototype.isAmbientLightProbe = !0;
	var jf = new ge,
		Xf = new ge,
		er = new ge,
		Qf = class {
			constructor() {
				this.type = "StereoCamera", this.aspect = 1, this.eyeSep = .064, this.cameraL = new ct, this.cameraL.layers.enable(1), this.cameraL.matrixAutoUpdate = !1, this.cameraR = new ct, this.cameraR.layers.enable(2), this.cameraR.matrixAutoUpdate = !1, this._cache = {
					focus: null,
					fov: null,
					aspect: null,
					near: null,
					far: null,
					zoom: null,
					eyeSep: null
				}
			}
			update(e) {
				let t = this._cache;
				if (t.focus !== e.focus || t.fov !== e.fov || t.aspect !== e.aspect * this.aspect || t.near !== e.near || t.far !== e.far || t.zoom !== e.zoom || t.eyeSep !== this.eyeSep) {
					t.focus = e.focus, t.fov = e.fov, t.aspect = e.aspect * this.aspect, t.near = e.near, t.far = e.far, t.zoom = e.zoom, t.eyeSep = this.eyeSep, er.copy(e.projectionMatrix);
					let i = t.eyeSep / 2,
						s = i * t.near / t.focus,
						a = t.near * Math.tan(Oi * t.fov * .5) / t.zoom,
						o, l;
					Xf.elements[12] = -i, jf.elements[12] = i, o = -a * t.aspect + s, l = a * t.aspect + s, er.elements[0] = 2 * t.near / (l - o), er.elements[8] = (l + o) / (l - o), this.cameraL.projectionMatrix.copy(er), o = -a * t.aspect - s, l = a * t.aspect - s, er.elements[0] = 2 * t.near / (l - o), er.elements[8] = (l + o) / (l - o), this.cameraR.projectionMatrix.copy(er)
				}
				this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(Xf), this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(jf)
			}
		},
		Xc = class {
			constructor(e = !0) {
				this.autoStart = e, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1
			}
			start() {
				this.startTime = qf(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0
			}
			stop() {
				this.getElapsedTime(), this.running = !1, this.autoStart = !1
			}
			getElapsedTime() {
				return this.getDelta(), this.elapsedTime
			}
			getDelta() {
				let e = 0;
				if (this.autoStart && !this.running) return this.start(), 0;
				if (this.running) {
					let t = qf();
					e = (t - this.oldTime) / 1e3, this.oldTime = t, this.elapsedTime += e
				}
				return e
			}
		};

	function qf() {
		return (typeof performance == "undefined" ? Date : performance).now()
	}
	var tr = new A,
		Zf = new yt,
		Aw = new A,
		nr = new A,
		Jf = class extends _e {
			constructor() {
				super();
				this.type = "AudioListener", this.context = Vc.getContext(), this.gain = this.context.createGain(), this.gain.connect(this.context.destination), this.filter = null, this.timeDelta = 0, this._clock = new Xc
			}
			getInput() {
				return this.gain
			}
			removeFilter() {
				return this.filter !== null && (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination), this.gain.connect(this.context.destination), this.filter = null), this
			}
			getFilter() {
				return this.filter
			}
			setFilter(e) {
				return this.filter !== null ? (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination), this.filter = e, this.gain.connect(this.filter), this.filter.connect(this.context.destination), this
			}
			getMasterVolume() {
				return this.gain.gain.value
			}
			setMasterVolume(e) {
				return this.gain.gain.setTargetAtTime(e, this.context.currentTime, .01), this
			}
			updateMatrixWorld(e) {
				super.updateMatrixWorld(e);
				let t = this.context.listener,
					n = this.up;
				if (this.timeDelta = this._clock.getDelta(), this.matrixWorld.decompose(tr, Zf, Aw), nr.set(0, 0, -1).applyQuaternion(Zf), t.positionX) {
					let i = this.context.currentTime + this.timeDelta;
					t.positionX.linearRampToValueAtTime(tr.x, i), t.positionY.linearRampToValueAtTime(tr.y, i), t.positionZ.linearRampToValueAtTime(tr.z, i), t.forwardX.linearRampToValueAtTime(nr.x, i), t.forwardY.linearRampToValueAtTime(nr.y, i), t.forwardZ.linearRampToValueAtTime(nr.z, i), t.upX.linearRampToValueAtTime(n.x, i), t.upY.linearRampToValueAtTime(n.y, i), t.upZ.linearRampToValueAtTime(n.z, i)
				} else t.setPosition(tr.x, tr.y, tr.z), t.setOrientation(nr.x, nr.y, nr.z, n.x, n.y, n.z)
			}
		},
		Ho = class extends _e {
			constructor(e) {
				super();
				this.type = "Audio", this.listener = e, this.context = e.context, this.gain = this.context.createGain(), this.gain.connect(e.getInput()), this.autoplay = !1, this.buffer = null, this.detune = 0, this.loop = !1, this.loopStart = 0, this.loopEnd = 0, this.offset = 0, this.duration = void 0, this.playbackRate = 1, this.isPlaying = !1, this.hasPlaybackControl = !0, this.source = null, this.sourceType = "empty", this._startedAt = 0, this._progress = 0, this._connected = !1, this.filters = []
			}
			getOutput() {
				return this.gain
			}
			setNodeSource(e) {
				return this.hasPlaybackControl = !1, this.sourceType = "audioNode", this.source = e, this.connect(), this
			}
			setMediaElementSource(e) {
				return this.hasPlaybackControl = !1, this.sourceType = "mediaNode", this.source = this.context.createMediaElementSource(e), this.connect(), this
			}
			setMediaStreamSource(e) {
				return this.hasPlaybackControl = !1, this.sourceType = "mediaStreamNode", this.source = this.context.createMediaStreamSource(e), this.connect(), this
			}
			setBuffer(e) {
				return this.buffer = e, this.sourceType = "buffer", this.autoplay && this.play(), this
			}
			play(e = 0) {
				if (this.isPlaying === !0) {
					console.warn("THREE.Audio: Audio is already playing.");
					return
				}
				if (this.hasPlaybackControl === !1) {
					console.warn("THREE.Audio: this Audio has no playback control.");
					return
				}
				this._startedAt = this.context.currentTime + e;
				let t = this.context.createBufferSource();
				return t.buffer = this.buffer, t.loop = this.loop, t.loopStart = this.loopStart, t.loopEnd = this.loopEnd, t.onended = this.onEnded.bind(this), t.start(this._startedAt, this._progress + this.offset, this.duration), this.isPlaying = !0, this.source = t, this.setDetune(this.detune), this.setPlaybackRate(this.playbackRate), this.connect()
			}
			pause() {
				if (this.hasPlaybackControl === !1) {
					console.warn("THREE.Audio: this Audio has no playback control.");
					return
				}
				return this.isPlaying === !0 && (this._progress += Math.max(this.context.currentTime - this._startedAt, 0) * this.playbackRate, this.loop === !0 && (this._progress = this._progress % (this.duration || this.buffer.duration)), this.source.stop(), this.source.onended = null, this.isPlaying = !1), this
			}
			stop() {
				if (this.hasPlaybackControl === !1) {
					console.warn("THREE.Audio: this Audio has no playback control.");
					return
				}
				return this._progress = 0, this.source.stop(), this.source.onended = null, this.isPlaying = !1, this
			}
			connect() {
				if (this.filters.length > 0) {
					this.source.connect(this.filters[0]);
					for (let e = 1, t = this.filters.length; e < t; e++) this.filters[e - 1].connect(this.filters[e]);
					this.filters[this.filters.length - 1].connect(this.getOutput())
				} else this.source.connect(this.getOutput());
				return this._connected = !0, this
			}
			disconnect() {
				if (this.filters.length > 0) {
					this.source.disconnect(this.filters[0]);
					for (let e = 1, t = this.filters.length; e < t; e++) this.filters[e - 1].disconnect(this.filters[e]);
					this.filters[this.filters.length - 1].disconnect(this.getOutput())
				} else this.source.disconnect(this.getOutput());
				return this._connected = !1, this
			}
			getFilters() {
				return this.filters
			}
			setFilters(e) {
				return e || (e = []), this._connected === !0 ? (this.disconnect(), this.filters = e.slice(), this.connect()) : this.filters = e.slice(), this
			}
			setDetune(e) {
				if (this.detune = e, this.source.detune !== void 0) return this.isPlaying === !0 && this.source.detune.setTargetAtTime(this.detune, this.context.currentTime, .01), this
			}
			getDetune() {
				return this.detune
			}
			getFilter() {
				return this.getFilters()[0]
			}
			setFilter(e) {
				return this.setFilters(e ? [e] : [])
			}
			setPlaybackRate(e) {
				if (this.hasPlaybackControl === !1) {
					console.warn("THREE.Audio: this Audio has no playback control.");
					return
				}
				return this.playbackRate = e, this.isPlaying === !0 && this.source.playbackRate.setTargetAtTime(this.playbackRate, this.context.currentTime, .01), this
			}
			getPlaybackRate() {
				return this.playbackRate
			}
			onEnded() {
				this.isPlaying = !1
			}
			getLoop() {
				return this.hasPlaybackControl === !1 ? (console.warn("THREE.Audio: this Audio has no playback control."), !1) : this.loop
			}
			setLoop(e) {
				if (this.hasPlaybackControl === !1) {
					console.warn("THREE.Audio: this Audio has no playback control.");
					return
				}
				return this.loop = e, this.isPlaying === !0 && (this.source.loop = this.loop), this
			}
			setLoopStart(e) {
				return this.loopStart = e, this
			}
			setLoopEnd(e) {
				return this.loopEnd = e, this
			}
			getVolume() {
				return this.gain.gain.value
			}
			setVolume(e) {
				return this.gain.gain.setTargetAtTime(e, this.context.currentTime, .01), this
			}
		},
		ir = new A,
		Kf = new yt,
		Ew = new A,
		rr = new A,
		$f = class extends Ho {
			constructor(e) {
				super(e);
				this.panner = this.context.createPanner(), this.panner.panningModel = "HRTF", this.panner.connect(this.gain)
			}
			getOutput() {
				return this.panner
			}
			getRefDistance() {
				return this.panner.refDistance
			}
			setRefDistance(e) {
				return this.panner.refDistance = e, this
			}
			getRolloffFactor() {
				return this.panner.rolloffFactor
			}
			setRolloffFactor(e) {
				return this.panner.rolloffFactor = e, this
			}
			getDistanceModel() {
				return this.panner.distanceModel
			}
			setDistanceModel(e) {
				return this.panner.distanceModel = e, this
			}
			getMaxDistance() {
				return this.panner.maxDistance
			}
			setMaxDistance(e) {
				return this.panner.maxDistance = e, this
			}
			setDirectionalCone(e, t, n) {
				return this.panner.coneInnerAngle = e, this.panner.coneOuterAngle = t, this.panner.coneOuterGain = n, this
			}
			updateMatrixWorld(e) {
				if (super.updateMatrixWorld(e), this.hasPlaybackControl === !0 && this.isPlaying === !1) return;
				this.matrixWorld.decompose(ir, Kf, Ew), rr.set(0, 0, 1).applyQuaternion(Kf);
				let t = this.panner;
				if (t.positionX) {
					let n = this.context.currentTime + this.listener.timeDelta;
					t.positionX.linearRampToValueAtTime(ir.x, n), t.positionY.linearRampToValueAtTime(ir.y, n), t.positionZ.linearRampToValueAtTime(ir.z, n), t.orientationX.linearRampToValueAtTime(rr.x, n), t.orientationY.linearRampToValueAtTime(rr.y, n), t.orientationZ.linearRampToValueAtTime(rr.z, n)
				} else t.setPosition(ir.x, ir.y, ir.z), t.setOrientation(rr.x, rr.y, rr.z)
			}
		},
		Qc = class {
			constructor(e, t = 2048) {
				this.analyser = e.context.createAnalyser(), this.analyser.fftSize = t, this.data = new Uint8Array(this.analyser.frequencyBinCount), e.getOutput().connect(this.analyser)
			}
			getFrequencyData() {
				return this.analyser.getByteFrequencyData(this.data), this.data
			}
			getAverageFrequency() {
				let e = 0,
					t = this.getFrequencyData();
				for (let n = 0; n < t.length; n++) e += t[n];
				return e / t.length
			}
		},
		qc = class {
			constructor(e, t, n) {
				this.binding = e, this.valueSize = n;
				let i, s, a;
				switch (t) {
					case "quaternion":
						i = this._slerp, s = this._slerpAdditive, a = this._setAdditiveIdentityQuaternion, this.buffer = new Float64Array(n * 6), this._workIndex = 5;
						break;
					case "string":
					case "bool":
						i = this._select, s = this._select, a = this._setAdditiveIdentityOther, this.buffer = new Array(n * 5);
						break;
					default:
						i = this._lerp, s = this._lerpAdditive, a = this._setAdditiveIdentityNumeric, this.buffer = new Float64Array(n * 5)
				}
				this._mixBufferRegion = i, this._mixBufferRegionAdditive = s, this._setIdentity = a, this._origIndex = 3, this._addIndex = 4, this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, this.useCount = 0, this.referenceCount = 0
			}
			accumulate(e, t) {
				let n = this.buffer,
					i = this.valueSize,
					s = e * i + i,
					a = this.cumulativeWeight;
				if (a === 0) {
					for (let o = 0; o !== i; ++o) n[s + o] = n[o];
					a = t
				} else {
					a += t;
					let o = t / a;
					this._mixBufferRegion(n, s, 0, o, i)
				}
				this.cumulativeWeight = a
			}
			accumulateAdditive(e) {
				let t = this.buffer,
					n = this.valueSize,
					i = n * this._addIndex;
				this.cumulativeWeightAdditive === 0 && this._setIdentity(), this._mixBufferRegionAdditive(t, i, 0, e, n), this.cumulativeWeightAdditive += e
			}
			apply(e) {
				let t = this.valueSize,
					n = this.buffer,
					i = e * t + t,
					s = this.cumulativeWeight,
					a = this.cumulativeWeightAdditive,
					o = this.binding;
				if (this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, s < 1) {
					let l = t * this._origIndex;
					this._mixBufferRegion(n, i, l, 1 - s, t)
				}
				a > 0 && this._mixBufferRegionAdditive(n, i, this._addIndex * t, 1, t);
				for (let l = t, c = t + t; l !== c; ++l)
					if (n[l] !== n[l + t]) {
						o.setValue(n, i);
						break
					}
			}
			saveOriginalState() {
				let e = this.binding,
					t = this.buffer,
					n = this.valueSize,
					i = n * this._origIndex;
				e.getValue(t, i);
				for (let s = n, a = i; s !== a; ++s) t[s] = t[i + s % n];
				this._setIdentity(), this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0
			}
			restoreOriginalState() {
				let e = this.valueSize * 3;
				this.binding.setValue(this.buffer, e)
			}
			_setAdditiveIdentityNumeric() {
				let e = this._addIndex * this.valueSize,
					t = e + this.valueSize;
				for (let n = e; n < t; n++) this.buffer[n] = 0
			}
			_setAdditiveIdentityQuaternion() {
				this._setAdditiveIdentityNumeric(), this.buffer[this._addIndex * this.valueSize + 3] = 1
			}
			_setAdditiveIdentityOther() {
				let e = this._origIndex * this.valueSize,
					t = this._addIndex * this.valueSize;
				for (let n = 0; n < this.valueSize; n++) this.buffer[t + n] = this.buffer[e + n]
			}
			_select(e, t, n, i, s) {
				if (i >= .5)
					for (let a = 0; a !== s; ++a) e[t + a] = e[n + a]
			}
			_slerp(e, t, n, i) {
				yt.slerpFlat(e, t, e, t, e, n, i)
			}
			_slerpAdditive(e, t, n, i, s) {
				let a = this._workIndex * s;
				yt.multiplyQuaternionsFlat(e, a, e, t, e, n), yt.slerpFlat(e, t, e, t, e, a, i)
			}
			_lerp(e, t, n, i, s) {
				let a = 1 - i;
				for (let o = 0; o !== s; ++o) {
					let l = t + o;
					e[l] = e[l] * a + e[n + o] * i
				}
			}
			_lerpAdditive(e, t, n, i, s) {
				for (let a = 0; a !== s; ++a) {
					let o = t + a;
					e[o] = e[o] + e[n + a] * i
				}
			}
		},
		Zc = "\\[\\]\\.:\\/",
		Mw = new RegExp("[" + Zc + "]", "g"),
		Jc = "[^" + Zc + "]",
		Sw = "[^" + Zc.replace("\\.", "") + "]",
		_w = /((?:WC+[\/:])*)/.source.replace("WC", Jc),
		Tw = /(WCOD+)?/.source.replace("WCOD", Sw),
		Cw = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Jc),
		Dw = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Jc),
		Rw = new RegExp("^" + _w + Tw + Cw + Dw + "$"),
		Pw = ["material", "materials", "bones"],
		ep = class {
			constructor(e, t, n) {
				let i = n || Ge.parseTrackName(t);
				this._targetGroup = e, this._bindings = e.subscribe_(t, i)
			}
			getValue(e, t) {
				this.bind();
				let n = this._targetGroup.nCachedObjects_,
					i = this._bindings[n];
				i !== void 0 && i.getValue(e, t)
			}
			setValue(e, t) {
				let n = this._bindings;
				for (let i = this._targetGroup.nCachedObjects_, s = n.length; i !== s; ++i) n[i].setValue(e, t)
			}
			bind() {
				let e = this._bindings;
				for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].bind()
			}
			unbind() {
				let e = this._bindings;
				for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].unbind()
			}
		},
		Ge = class {
			constructor(e, t, n) {
				this.path = t, this.parsedPath = n || Ge.parseTrackName(t), this.node = Ge.findNode(e, this.parsedPath.nodeName) || e, this.rootNode = e, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound
			}
			static create(e, t, n) {
				return e && e.isAnimationObjectGroup ? new Ge.Composite(e, t, n) : new Ge(e, t, n)
			}
			static sanitizeNodeName(e) {
				return e.replace(/\s/g, "_").replace(Mw, "")
			}
			static parseTrackName(e) {
				let t = Rw.exec(e);
				if (!t) throw new Error("PropertyBinding: Cannot parse trackName: " + e);
				let n = {
					nodeName: t[2],
					objectName: t[3],
					objectIndex: t[4],
					propertyName: t[5],
					propertyIndex: t[6]
				},
					i = n.nodeName && n.nodeName.lastIndexOf(".");
				if (i !== void 0 && i !== -1) {
					let s = n.nodeName.substring(i + 1);
					Pw.indexOf(s) !== -1 && (n.nodeName = n.nodeName.substring(0, i), n.objectName = s)
				}
				if (n.propertyName === null || n.propertyName.length === 0) throw new Error("PropertyBinding: can not parse propertyName from trackName: " + e);
				return n
			}
			static findNode(e, t) {
				if (!t || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid) return e;
				if (e.skeleton) {
					let n = e.skeleton.getBoneByName(t);
					if (n !== void 0) return n
				}
				if (e.children) {
					let n = function (s) {
						for (let a = 0; a < s.length; a++) {
							let o = s[a];
							if (o.name === t || o.uuid === t) return o;
							let l = n(o.children);
							if (l) return l
						}
						return null
					},
						i = n(e.children);
					if (i) return i
				}
				return null
			}
			_getValue_unavailable() { }
			_setValue_unavailable() { }
			_getValue_direct(e, t) {
				e[t] = this.targetObject[this.propertyName]
			}
			_getValue_array(e, t) {
				let n = this.resolvedProperty;
				for (let i = 0, s = n.length; i !== s; ++i) e[t++] = n[i]
			}
			_getValue_arrayElement(e, t) {
				e[t] = this.resolvedProperty[this.propertyIndex]
			}
			_getValue_toArray(e, t) {
				this.resolvedProperty.toArray(e, t)
			}
			_setValue_direct(e, t) {
				this.targetObject[this.propertyName] = e[t]
			}
			_setValue_direct_setNeedsUpdate(e, t) {
				this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0
			}
			_setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
				this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0
			}
			_setValue_array(e, t) {
				let n = this.resolvedProperty;
				for (let i = 0, s = n.length; i !== s; ++i) n[i] = e[t++]
			}
			_setValue_array_setNeedsUpdate(e, t) {
				let n = this.resolvedProperty;
				for (let i = 0, s = n.length; i !== s; ++i) n[i] = e[t++];
				this.targetObject.needsUpdate = !0
			}
			_setValue_array_setMatrixWorldNeedsUpdate(e, t) {
				let n = this.resolvedProperty;
				for (let i = 0, s = n.length; i !== s; ++i) n[i] = e[t++];
				this.targetObject.matrixWorldNeedsUpdate = !0
			}
			_setValue_arrayElement(e, t) {
				this.resolvedProperty[this.propertyIndex] = e[t]
			}
			_setValue_arrayElement_setNeedsUpdate(e, t) {
				this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0
			}
			_setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
				this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0
			}
			_setValue_fromArray(e, t) {
				this.resolvedProperty.fromArray(e, t)
			}
			_setValue_fromArray_setNeedsUpdate(e, t) {
				this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0
			}
			_setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
				this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0
			}
			_getValue_unbound(e, t) {
				this.bind(), this.getValue(e, t)
			}
			_setValue_unbound(e, t) {
				this.bind(), this.setValue(e, t)
			}
			bind() {
				let e = this.node,
					t = this.parsedPath,
					n = t.objectName,
					i = t.propertyName,
					s = t.propertyIndex;
				if (e || (e = Ge.findNode(this.rootNode, t.nodeName) || this.rootNode, this.node = e), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !e) {
					console.error("THREE.PropertyBinding: Trying to update node for track: " + this.path + " but it wasn't found.");
					return
				}
				if (n) {
					let c = t.objectIndex;
					switch (n) {
						case "materials":
							if (!e.material) {
								console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
								return
							}
							if (!e.material.materials) {
								console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
								return
							}
							e = e.material.materials;
							break;
						case "bones":
							if (!e.skeleton) {
								console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
								return
							}
							e = e.skeleton.bones;
							for (let u = 0; u < e.length; u++)
								if (e[u].name === c) {
									c = u;
									break
								} break;
						default:
							if (e[n] === void 0) {
								console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
								return
							}
							e = e[n]
					}
					if (c !== void 0) {
						if (e[c] === void 0) {
							console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, e);
							return
						}
						e = e[c]
					}
				}
				let a = e[i];
				if (a === void 0) {
					let c = t.nodeName;
					console.error("THREE.PropertyBinding: Trying to update property for track: " + c + "." + i + " but it wasn't found.", e);
					return
				}
				let o = this.Versioning.None;
				this.targetObject = e, e.needsUpdate !== void 0 ? o = this.Versioning.NeedsUpdate : e.matrixWorldNeedsUpdate !== void 0 && (o = this.Versioning.MatrixWorldNeedsUpdate);
				let l = this.BindingType.Direct;
				if (s !== void 0) {
					if (i === "morphTargetInfluences") {
						if (!e.geometry) {
							console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
							return
						}
						if (e.geometry.isBufferGeometry) {
							if (!e.geometry.morphAttributes) {
								console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
								return
							}
							e.morphTargetDictionary[s] !== void 0 && (s = e.morphTargetDictionary[s])
						} else {
							console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.", this);
							return
						}
					}
					l = this.BindingType.ArrayElement, this.resolvedProperty = a, this.propertyIndex = s
				} else a.fromArray !== void 0 && a.toArray !== void 0 ? (l = this.BindingType.HasFromToArray, this.resolvedProperty = a) : Array.isArray(a) ? (l = this.BindingType.EntireArray, this.resolvedProperty = a) : this.propertyName = i;
				this.getValue = this.GetterByBindingType[l], this.setValue = this.SetterByBindingTypeAndVersioning[l][o]
			}
			unbind() {
				this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound
			}
		};
	Ge.Composite = ep;
	Ge.prototype.BindingType = {
		Direct: 0,
		EntireArray: 1,
		ArrayElement: 2,
		HasFromToArray: 3
	};
	Ge.prototype.Versioning = {
		None: 0,
		NeedsUpdate: 1,
		MatrixWorldNeedsUpdate: 2
	};
	Ge.prototype.GetterByBindingType = [Ge.prototype._getValue_direct, Ge.prototype._getValue_array, Ge.prototype._getValue_arrayElement, Ge.prototype._getValue_toArray];
	Ge.prototype.SetterByBindingTypeAndVersioning = [
		[Ge.prototype._setValue_direct, Ge.prototype._setValue_direct_setNeedsUpdate, Ge.prototype._setValue_direct_setMatrixWorldNeedsUpdate],
		[Ge.prototype._setValue_array, Ge.prototype._setValue_array_setNeedsUpdate, Ge.prototype._setValue_array_setMatrixWorldNeedsUpdate],
		[Ge.prototype._setValue_arrayElement, Ge.prototype._setValue_arrayElement_setNeedsUpdate, Ge.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],
		[Ge.prototype._setValue_fromArray, Ge.prototype._setValue_fromArray_setNeedsUpdate, Ge.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]
	];
	var Kc = class {
		constructor() {
			this.uuid = Wt(), this._objects = Array.prototype.slice.call(arguments), this.nCachedObjects_ = 0;
			let e = {};
			this._indicesByUUID = e;
			for (let n = 0, i = arguments.length; n !== i; ++n) e[arguments[n].uuid] = n;
			this._paths = [], this._parsedPaths = [], this._bindings = [], this._bindingsIndicesByPath = {};
			let t = this;
			this.stats = {
				objects: {
					get total() {
						return t._objects.length
					},
					get inUse() {
						return this.total - t.nCachedObjects_
					}
				},
				get bindingsPerObject() {
					return t._bindings.length
				}
			}
		}
		add() {
			let e = this._objects,
				t = this._indicesByUUID,
				n = this._paths,
				i = this._parsedPaths,
				s = this._bindings,
				a = s.length,
				o, l = e.length,
				c = this.nCachedObjects_;
			for (let u = 0, h = arguments.length; u !== h; ++u) {
				let d = arguments[u],
					f = d.uuid,
					p = t[f];
				if (p === void 0) {
					p = l++, t[f] = p, e.push(d);
					for (let v = 0, x = a; v !== x; ++v) s[v].push(new Ge(d, n[v], i[v]))
				} else if (p < c) {
					o = e[p];
					let v = --c,
						x = e[v];
					t[x.uuid] = p, e[p] = x, t[f] = v, e[v] = d;
					for (let g = 0, m = a; g !== m; ++g) {
						let b = s[g],
							y = b[v],
							E = b[p];
						b[p] = y, E === void 0 && (E = new Ge(d, n[g], i[g])), b[v] = E
					}
				} else e[p] !== o && console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")
			}
			this.nCachedObjects_ = c
		}
		remove() {
			let e = this._objects,
				t = this._indicesByUUID,
				n = this._bindings,
				i = n.length,
				s = this.nCachedObjects_;
			for (let a = 0, o = arguments.length; a !== o; ++a) {
				let l = arguments[a],
					c = l.uuid,
					u = t[c];
				if (u !== void 0 && u >= s) {
					let h = s++,
						d = e[h];
					t[d.uuid] = u, e[u] = d, t[c] = h, e[h] = l;
					for (let f = 0, p = i; f !== p; ++f) {
						let v = n[f],
							x = v[h],
							g = v[u];
						v[u] = x, v[h] = g
					}
				}
			}
			this.nCachedObjects_ = s
		}
		uncache() {
			let e = this._objects,
				t = this._indicesByUUID,
				n = this._bindings,
				i = n.length,
				s = this.nCachedObjects_,
				a = e.length;
			for (let o = 0, l = arguments.length; o !== l; ++o) {
				let c = arguments[o],
					u = c.uuid,
					h = t[u];
				if (h !== void 0)
					if (delete t[u], h < s) {
						let d = --s,
							f = e[d],
							p = --a,
							v = e[p];
						t[f.uuid] = h, e[h] = f, t[v.uuid] = d, e[d] = v, e.pop();
						for (let x = 0, g = i; x !== g; ++x) {
							let m = n[x],
								b = m[d],
								y = m[p];
							m[h] = b, m[d] = y, m.pop()
						}
					} else {
						let d = --a,
							f = e[d];
						d > 0 && (t[f.uuid] = h), e[h] = f, e.pop();
						for (let p = 0, v = i; p !== v; ++p) {
							let x = n[p];
							x[h] = x[d], x.pop()
						}
					}
			}
			this.nCachedObjects_ = s
		}
		subscribe_(e, t) {
			let n = this._bindingsIndicesByPath,
				i = n[e],
				s = this._bindings;
			if (i !== void 0) return s[i];
			let a = this._paths,
				o = this._parsedPaths,
				l = this._objects,
				c = l.length,
				u = this.nCachedObjects_,
				h = new Array(c);
			i = s.length, n[e] = i, a.push(e), o.push(t), s.push(h);
			for (let d = u, f = l.length; d !== f; ++d) {
				let p = l[d];
				h[d] = new Ge(p, e, t)
			}
			return h
		}
		unsubscribe_(e) {
			let t = this._bindingsIndicesByPath,
				n = t[e];
			if (n !== void 0) {
				let i = this._paths,
					s = this._parsedPaths,
					a = this._bindings,
					o = a.length - 1,
					l = a[o],
					c = e[o];
				t[c] = n, a[n] = l, a.pop(), s[n] = s[o], s.pop(), i[n] = i[o], i.pop()
			}
		}
	};
	Kc.prototype.isAnimationObjectGroup = !0;
	var tp = class {
		constructor(e, t, n = null, i = t.blendMode) {
			this._mixer = e, this._clip = t, this._localRoot = n, this.blendMode = i;
			let s = t.tracks,
				a = s.length,
				o = new Array(a),
				l = {
					endingStart: Bi,
					endingEnd: Bi
				};
			for (let c = 0; c !== a; ++c) {
				let u = s[c].createInterpolant(null);
				o[c] = u, u.settings = l
			}
			this._interpolantSettings = l, this._interpolants = o, this._propertyBindings = new Array(a), this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, this._weightInterpolant = null, this.loop = rd, this._loopCount = -1, this._startTime = null, this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, this._effectiveWeight = 1, this.repetitions = 1 / 0, this.paused = !1, this.enabled = !0, this.clampWhenFinished = !1, this.zeroSlopeAtStart = !0, this.zeroSlopeAtEnd = !0
		}
		play() {
			return this._mixer._activateAction(this), this
		}
		stop() {
			return this._mixer._deactivateAction(this), this.reset()
		}
		reset() {
			return this.paused = !1, this.enabled = !0, this.time = 0, this._loopCount = -1, this._startTime = null, this.stopFading().stopWarping()
		}
		isRunning() {
			return this.enabled && !this.paused && this.timeScale !== 0 && this._startTime === null && this._mixer._isActiveAction(this)
		}
		isScheduled() {
			return this._mixer._isActiveAction(this)
		}
		startAt(e) {
			return this._startTime = e, this
		}
		setLoop(e, t) {
			return this.loop = e, this.repetitions = t, this
		}
		setEffectiveWeight(e) {
			return this.weight = e, this._effectiveWeight = this.enabled ? e : 0, this.stopFading()
		}
		getEffectiveWeight() {
			return this._effectiveWeight
		}
		fadeIn(e) {
			return this._scheduleFading(e, 0, 1)
		}
		fadeOut(e) {
			return this._scheduleFading(e, 1, 0)
		}
		crossFadeFrom(e, t, n) {
			if (e.fadeOut(t), this.fadeIn(t), n) {
				let i = this._clip.duration,
					s = e._clip.duration,
					a = s / i,
					o = i / s;
				e.warp(1, a, t), this.warp(o, 1, t)
			}
			return this
		}
		crossFadeTo(e, t, n) {
			return e.crossFadeFrom(this, t, n)
		}
		stopFading() {
			let e = this._weightInterpolant;
			return e !== null && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(e)), this
		}
		setEffectiveTimeScale(e) {
			return this.timeScale = e, this._effectiveTimeScale = this.paused ? 0 : e, this.stopWarping()
		}
		getEffectiveTimeScale() {
			return this._effectiveTimeScale
		}
		setDuration(e) {
			return this.timeScale = this._clip.duration / e, this.stopWarping()
		}
		syncWith(e) {
			return this.time = e.time, this.timeScale = e.timeScale, this.stopWarping()
		}
		halt(e) {
			return this.warp(this._effectiveTimeScale, 0, e)
		}
		warp(e, t, n) {
			let i = this._mixer,
				s = i.time,
				a = this.timeScale,
				o = this._timeScaleInterpolant;
			o === null && (o = i._lendControlInterpolant(), this._timeScaleInterpolant = o);
			let l = o.parameterPositions,
				c = o.sampleValues;
			return l[0] = s, l[1] = s + n, c[0] = e / a, c[1] = t / a, this
		}
		stopWarping() {
			let e = this._timeScaleInterpolant;
			return e !== null && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(e)), this
		}
		getMixer() {
			return this._mixer
		}
		getClip() {
			return this._clip
		}
		getRoot() {
			return this._localRoot || this._mixer._root
		}
		_update(e, t, n, i) {
			if (!this.enabled) {
				this._updateWeight(e);
				return
			}
			let s = this._startTime;
			if (s !== null) {
				let l = (e - s) * n;
				if (l < 0 || n === 0) return;
				this._startTime = null, t = n * l
			}
			t *= this._updateTimeScale(e);
			let a = this._updateTime(t),
				o = this._updateWeight(e);
			if (o > 0) {
				let l = this._interpolants,
					c = this._propertyBindings;
				switch (this.blendMode) {
					case Sl:
						for (let u = 0, h = l.length; u !== h; ++u) l[u].evaluate(a), c[u].accumulateAdditive(o);
						break;
					case Aa:
					default:
						for (let u = 0, h = l.length; u !== h; ++u) l[u].evaluate(a), c[u].accumulate(i, o)
				}
			}
		}
		_updateWeight(e) {
			let t = 0;
			if (this.enabled) {
				t = this.weight;
				let n = this._weightInterpolant;
				if (n !== null) {
					let i = n.evaluate(e)[0];
					t *= i, e > n.parameterPositions[1] && (this.stopFading(), i === 0 && (this.enabled = !1))
				}
			}
			return this._effectiveWeight = t, t
		}
		_updateTimeScale(e) {
			let t = 0;
			if (!this.paused) {
				t = this.timeScale;
				let n = this._timeScaleInterpolant;
				n !== null && (t *= n.evaluate(e)[0], e > n.parameterPositions[1] && (this.stopWarping(), t === 0 ? this.paused = !0 : this.timeScale = t))
			}
			return this._effectiveTimeScale = t, t
		}
		_updateTime(e) {
			let t = this._clip.duration,
				n = this.loop,
				i = this.time + e,
				s = this._loopCount,
				a = n === sd;
			if (e === 0) return s === -1 ? i : a && (s & 1) == 1 ? t - i : i;
			if (n === id) {
				s === -1 && (this._loopCount = 0, this._setEndings(!0, !0, !1));
				e: {
					if (i >= t) i = t;
					else if (i < 0) i = 0;
					else {
						this.time = i;
						break e
					}
					this.clampWhenFinished ? this.paused = !0 : this.enabled = !1,
						this.time = i,
						this._mixer.dispatchEvent({
							type: "finished",
							action: this,
							direction: e < 0 ? -1 : 1
						})
				}
			} else {
				if (s === -1 && (e >= 0 ? (s = 0, this._setEndings(!0, this.repetitions === 0, a)) : this._setEndings(this.repetitions === 0, !0, a)), i >= t || i < 0) {
					let o = Math.floor(i / t);
					i -= t * o, s += Math.abs(o);
					let l = this.repetitions - s;
					if (l <= 0) this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, i = e > 0 ? t : 0, this.time = i, this._mixer.dispatchEvent({
						type: "finished",
						action: this,
						direction: e > 0 ? 1 : -1
					});
					else {
						if (l === 1) {
							let c = e < 0;
							this._setEndings(c, !c, a)
						} else this._setEndings(!1, !1, a);
						this._loopCount = s, this.time = i, this._mixer.dispatchEvent({
							type: "loop",
							action: this,
							loopDelta: o
						})
					}
				} else this.time = i;
				if (a && (s & 1) == 1) return t - i
			}
			return i
		}
		_setEndings(e, t, n) {
			let i = this._interpolantSettings;
			n ? (i.endingStart = Ui, i.endingEnd = Ui) : (e ? i.endingStart = this.zeroSlopeAtStart ? Ui : Bi : i.endingStart = Cs, t ? i.endingEnd = this.zeroSlopeAtEnd ? Ui : Bi : i.endingEnd = Cs)
		}
		_scheduleFading(e, t, n) {
			let i = this._mixer,
				s = i.time,
				a = this._weightInterpolant;
			a === null && (a = i._lendControlInterpolant(), this._weightInterpolant = a);
			let o = a.parameterPositions,
				l = a.sampleValues;
			return o[0] = s, l[0] = t, o[1] = s + e, l[1] = n, this
		}
	},
		$c = class extends Pt {
			constructor(e) {
				super();
				this._root = e, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1
			}
			_bindAction(e, t) {
				let n = e._localRoot || this._root,
					i = e._clip.tracks,
					s = i.length,
					a = e._propertyBindings,
					o = e._interpolants,
					l = n.uuid,
					c = this._bindingsByRootAndName,
					u = c[l];
				u === void 0 && (u = {}, c[l] = u);
				for (let h = 0; h !== s; ++h) {
					let d = i[h],
						f = d.name,
						p = u[f];
					if (p !== void 0) a[h] = p;
					else {
						if (p = a[h], p !== void 0) {
							p._cacheIndex === null && (++p.referenceCount, this._addInactiveBinding(p, l, f));
							continue
						}
						let v = t && t._propertyBindings[h].binding.parsedPath;
						p = new qc(Ge.create(n, f, v), d.ValueTypeName, d.getValueSize()), ++p.referenceCount, this._addInactiveBinding(p, l, f), a[h] = p
					}
					o[h].resultBuffer = p.buffer
				}
			}
			_activateAction(e) {
				if (!this._isActiveAction(e)) {
					if (e._cacheIndex === null) {
						let n = (e._localRoot || this._root).uuid,
							i = e._clip.uuid,
							s = this._actionsByClip[i];
						this._bindAction(e, s && s.knownActions[0]), this._addInactiveAction(e, i, n)
					}
					let t = e._propertyBindings;
					for (let n = 0, i = t.length; n !== i; ++n) {
						let s = t[n];
						s.useCount++ == 0 && (this._lendBinding(s), s.saveOriginalState())
					}
					this._lendAction(e)
				}
			}
			_deactivateAction(e) {
				if (this._isActiveAction(e)) {
					let t = e._propertyBindings;
					for (let n = 0, i = t.length; n !== i; ++n) {
						let s = t[n];
						--s.useCount == 0 && (s.restoreOriginalState(), this._takeBackBinding(s))
					}
					this._takeBackAction(e)
				}
			}
			_initMemoryManager() {
				this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], this._nActiveControlInterpolants = 0;
				let e = this;
				this.stats = {
					actions: {
						get total() {
							return e._actions.length
						},
						get inUse() {
							return e._nActiveActions
						}
					},
					bindings: {
						get total() {
							return e._bindings.length
						},
						get inUse() {
							return e._nActiveBindings
						}
					},
					controlInterpolants: {
						get total() {
							return e._controlInterpolants.length
						},
						get inUse() {
							return e._nActiveControlInterpolants
						}
					}
				}
			}
			_isActiveAction(e) {
				let t = e._cacheIndex;
				return t !== null && t < this._nActiveActions
			}
			_addInactiveAction(e, t, n) {
				let i = this._actions,
					s = this._actionsByClip,
					a = s[t];
				if (a === void 0) a = {
					knownActions: [e],
					actionByRoot: {}
				}, e._byClipCacheIndex = 0, s[t] = a;
				else {
					let o = a.knownActions;
					e._byClipCacheIndex = o.length, o.push(e)
				}
				e._cacheIndex = i.length, i.push(e), a.actionByRoot[n] = e
			}
			_removeInactiveAction(e) {
				let t = this._actions,
					n = t[t.length - 1],
					i = e._cacheIndex;
				n._cacheIndex = i, t[i] = n, t.pop(), e._cacheIndex = null;
				let s = e._clip.uuid,
					a = this._actionsByClip,
					o = a[s],
					l = o.knownActions,
					c = l[l.length - 1],
					u = e._byClipCacheIndex;
				c._byClipCacheIndex = u, l[u] = c, l.pop(), e._byClipCacheIndex = null;
				let h = o.actionByRoot,
					d = (e._localRoot || this._root).uuid;
				delete h[d], l.length === 0 && delete a[s], this._removeInactiveBindingsForAction(e)
			}
			_removeInactiveBindingsForAction(e) {
				let t = e._propertyBindings;
				for (let n = 0, i = t.length; n !== i; ++n) {
					let s = t[n];
					--s.referenceCount == 0 && this._removeInactiveBinding(s)
				}
			}
			_lendAction(e) {
				let t = this._actions,
					n = e._cacheIndex,
					i = this._nActiveActions++,
					s = t[i];
				e._cacheIndex = i, t[i] = e, s._cacheIndex = n, t[n] = s
			}
			_takeBackAction(e) {
				let t = this._actions,
					n = e._cacheIndex,
					i = --this._nActiveActions,
					s = t[i];
				e._cacheIndex = i, t[i] = e, s._cacheIndex = n, t[n] = s
			}
			_addInactiveBinding(e, t, n) {
				let i = this._bindingsByRootAndName,
					s = this._bindings,
					a = i[t];
				a === void 0 && (a = {}, i[t] = a), a[n] = e, e._cacheIndex = s.length, s.push(e)
			}
			_removeInactiveBinding(e) {
				let t = this._bindings,
					n = e.binding,
					i = n.rootNode.uuid,
					s = n.path,
					a = this._bindingsByRootAndName,
					o = a[i],
					l = t[t.length - 1],
					c = e._cacheIndex;
				l._cacheIndex = c, t[c] = l, t.pop(), delete o[s], Object.keys(o).length === 0 && delete a[i]
			}
			_lendBinding(e) {
				let t = this._bindings,
					n = e._cacheIndex,
					i = this._nActiveBindings++,
					s = t[i];
				e._cacheIndex = i, t[i] = e, s._cacheIndex = n, t[n] = s
			}
			_takeBackBinding(e) {
				let t = this._bindings,
					n = e._cacheIndex,
					i = --this._nActiveBindings,
					s = t[i];
				e._cacheIndex = i, t[i] = e, s._cacheIndex = n, t[n] = s
			}
			_lendControlInterpolant() {
				let e = this._controlInterpolants,
					t = this._nActiveControlInterpolants++,
					n = e[t];
				return n === void 0 && (n = new Do(new Float32Array(2), new Float32Array(2), 1, this._controlInterpolantsResultBuffer), n.__cacheIndex = t, e[t] = n), n
			}
			_takeBackControlInterpolant(e) {
				let t = this._controlInterpolants,
					n = e.__cacheIndex,
					i = --this._nActiveControlInterpolants,
					s = t[i];
				e.__cacheIndex = i, t[i] = e, s.__cacheIndex = n, t[n] = s
			}
			clipAction(e, t, n) {
				let i = t || this._root,
					s = i.uuid,
					a = typeof e == "string" ? ss.findByName(i, e) : e,
					o = a !== null ? a.uuid : e,
					l = this._actionsByClip[o],
					c = null;
				if (n === void 0 && (a !== null ? n = a.blendMode : n = Aa), l !== void 0) {
					let h = l.actionByRoot[s];
					if (h !== void 0 && h.blendMode === n) return h;
					c = l.knownActions[0], a === null && (a = c._clip)
				}
				if (a === null) return null;
				let u = new tp(this, a, t, n);
				return this._bindAction(u, c), this._addInactiveAction(u, o, s), u
			}
			existingAction(e, t) {
				let n = t || this._root,
					i = n.uuid,
					s = typeof e == "string" ? ss.findByName(n, e) : e,
					a = s ? s.uuid : e,
					o = this._actionsByClip[a];
				return o !== void 0 && o.actionByRoot[i] || null
			}
			stopAllAction() {
				let e = this._actions,
					t = this._nActiveActions;
				for (let n = t - 1; n >= 0; --n) e[n].stop();
				return this
			}
			update(e) {
				e *= this.timeScale;
				let t = this._actions,
					n = this._nActiveActions,
					i = this.time += e,
					s = Math.sign(e),
					a = this._accuIndex ^= 1;
				for (let c = 0; c !== n; ++c) t[c]._update(i, e, s, a);
				let o = this._bindings,
					l = this._nActiveBindings;
				for (let c = 0; c !== l; ++c) o[c].apply(a);
				return this
			}
			setTime(e) {
				this.time = 0;
				for (let t = 0; t < this._actions.length; t++) this._actions[t].time = 0;
				return this.update(e)
			}
			getRoot() {
				return this._root
			}
			uncacheClip(e) {
				let t = this._actions,
					n = e.uuid,
					i = this._actionsByClip,
					s = i[n];
				if (s !== void 0) {
					let a = s.knownActions;
					for (let o = 0, l = a.length; o !== l; ++o) {
						let c = a[o];
						this._deactivateAction(c);
						let u = c._cacheIndex,
							h = t[t.length - 1];
						c._cacheIndex = null, c._byClipCacheIndex = null, h._cacheIndex = u, t[u] = h, t.pop(), this._removeInactiveBindingsForAction(c)
					}
					delete i[n]
				}
			}
			uncacheRoot(e) {
				let t = e.uuid,
					n = this._actionsByClip;
				for (let a in n) {
					let o = n[a].actionByRoot,
						l = o[t];
					l !== void 0 && (this._deactivateAction(l), this._removeInactiveAction(l))
				}
				let i = this._bindingsByRootAndName,
					s = i[t];
				if (s !== void 0)
					for (let a in s) {
						let o = s[a];
						o.restoreOriginalState(), this._removeInactiveBinding(o)
					}
			}
			uncacheAction(e, t) {
				let n = this.existingAction(e, t);
				n !== null && (this._deactivateAction(n), this._removeInactiveAction(n))
			}
		};
	$c.prototype._controlInterpolantsResultBuffer = new Float32Array(1);
	var De = class {
		constructor(e) {
			typeof e == "string" && (console.warn("THREE.Uniform: Type parameter is no longer needed."), e = arguments[1]), this.value = e
		}
		clone() {
			return new De(this.value.clone === void 0 ? this.value : this.value.clone())
		}
	},
		eu = class extends hi {
			constructor(e, t, n = 1) {
				super(e, t);
				this.meshPerAttribute = n
			}
			copy(e) {
				return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this
			}
			clone(e) {
				let t = super.clone(e);
				return t.meshPerAttribute = this.meshPerAttribute, t
			}
			toJSON(e) {
				let t = super.toJSON(e);
				return t.isInstancedInterleavedBuffer = !0, t.meshPerAttribute = this.meshPerAttribute, t
			}
		};
	eu.prototype.isInstancedInterleavedBuffer = !0;
	var tu = class {
		constructor(e, t, n, i, s) {
			this.buffer = e, this.type = t, this.itemSize = n, this.elementSize = i, this.count = s, this.version = 0
		}
		set needsUpdate(e) {
			e === !0 && this.version++
		}
		setBuffer(e) {
			return this.buffer = e, this
		}
		setType(e, t) {
			return this.type = e, this.elementSize = t, this
		}
		setItemSize(e) {
			return this.itemSize = e, this
		}
		setCount(e) {
			return this.count = e, this
		}
	};
	tu.prototype.isGLBufferAttribute = !0;
	var np = class {
		constructor(e, t, n = 0, i = 1 / 0) {
			this.ray = new On(e, t), this.near = n, this.far = i, this.camera = null, this.layers = new Ia, this.params = {
				Mesh: {},
				Line: {
					threshold: 1
				},
				LOD: {},
				Points: {
					threshold: 1
				},
				Sprite: {}
			}
		}
		set(e, t) {
			this.ray.set(e, t)
		}
		setFromCamera(e, t) {
			t && t.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(e.x, e.y, .5).unproject(t).sub(this.ray.origin).normalize(), this.camera = t) : t && t.isOrthographicCamera ? (this.ray.origin.set(e.x, e.y, (t.near + t.far) / (t.near - t.far)).unproject(t), this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld), this.camera = t) : console.error("THREE.Raycaster: Unsupported camera type: " + t.type)
		}
		intersectObject(e, t = !0, n = []) {
			return nu(e, this, n, t), n.sort(ip), n
		}
		intersectObjects(e, t = !0, n = []) {
			for (let i = 0, s = e.length; i < s; i++) nu(e[i], this, n, t);
			return n.sort(ip), n
		}
	};

	function ip(r, e) {
		return r.distance - e.distance
	}

	function nu(r, e, t, n) {
		if (r.layers.test(e.layers) && r.raycast(e, t), n === !0) {
			let i = r.children;
			for (let s = 0, a = i.length; s < a; s++) nu(i[s], e, t, !0)
		}
	}
	var ua = class {
		constructor(e = 1, t = 0, n = 0) {
			return this.radius = e, this.phi = t, this.theta = n, this
		}
		set(e, t, n) {
			return this.radius = e, this.phi = t, this.theta = n, this
		}
		copy(e) {
			return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this
		}
		makeSafe() {
			let e = 1e-6;
			return this.phi = Math.max(e, Math.min(Math.PI - e, this.phi)), this
		}
		setFromVector3(e) {
			return this.setFromCartesianCoords(e.x, e.y, e.z)
		}
		setFromCartesianCoords(e, t, n) {
			return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(It(t / this.radius, -1, 1))), this
		}
		clone() {
			return new this.constructor().copy(this)
		}
	},
		rp = class {
			constructor(e = 1, t = 0, n = 0) {
				return this.radius = e, this.theta = t, this.y = n, this
			}
			set(e, t, n) {
				return this.radius = e, this.theta = t, this.y = n, this
			}
			copy(e) {
				return this.radius = e.radius, this.theta = e.theta, this.y = e.y, this
			}
			setFromVector3(e) {
				return this.setFromCartesianCoords(e.x, e.y, e.z)
			}
			setFromCartesianCoords(e, t, n) {
				return this.radius = Math.sqrt(e * e + n * n), this.theta = Math.atan2(e, n), this.y = t, this
			}
			clone() {
				return new this.constructor().copy(this)
			}
		},
		sp = new O,
		sr = class {
			constructor(e = new O(1 / 0, 1 / 0), t = new O(-1 / 0, -1 / 0)) {
				this.min = e, this.max = t
			}
			set(e, t) {
				return this.min.copy(e), this.max.copy(t), this
			}
			setFromPoints(e) {
				this.makeEmpty();
				for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
				return this
			}
			setFromCenterAndSize(e, t) {
				let n = sp.copy(t).multiplyScalar(.5);
				return this.min.copy(e).sub(n), this.max.copy(e).add(n), this
			}
			clone() {
				return new this.constructor().copy(this)
			}
			copy(e) {
				return this.min.copy(e.min), this.max.copy(e.max), this
			}
			makeEmpty() {
				return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -1 / 0, this
			}
			isEmpty() {
				return this.max.x < this.min.x || this.max.y < this.min.y
			}
			getCenter(e) {
				return this.isEmpty() ? e.set(0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5)
			}
			getSize(e) {
				return this.isEmpty() ? e.set(0, 0) : e.subVectors(this.max, this.min)
			}
			expandByPoint(e) {
				return this.min.min(e), this.max.max(e), this
			}
			expandByVector(e) {
				return this.min.sub(e), this.max.add(e), this
			}
			expandByScalar(e) {
				return this.min.addScalar(-e), this.max.addScalar(e), this
			}
			containsPoint(e) {
				return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y)
			}
			containsBox(e) {
				return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y
			}
			getParameter(e, t) {
				return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y))
			}
			intersectsBox(e) {
				return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y)
			}
			clampPoint(e, t) {
				return t.copy(e).clamp(this.min, this.max)
			}
			distanceToPoint(e) {
				return sp.copy(e).clamp(this.min, this.max).sub(e).length()
			}
			intersect(e) {
				return this.min.max(e.min), this.max.min(e.max), this
			}
			union(e) {
				return this.min.min(e.min), this.max.max(e.max), this
			}
			translate(e) {
				return this.min.add(e), this.max.add(e), this
			}
			equals(e) {
				return e.min.equals(this.min) && e.max.equals(this.max)
			}
		};
	sr.prototype.isBox2 = !0;
	var ap = new A,
		zo = new A,
		iu = class {
			constructor(e = new A, t = new A) {
				this.start = e, this.end = t
			}
			set(e, t) {
				return this.start.copy(e), this.end.copy(t), this
			}
			copy(e) {
				return this.start.copy(e.start), this.end.copy(e.end), this
			}
			getCenter(e) {
				return e.addVectors(this.start, this.end).multiplyScalar(.5)
			}
			delta(e) {
				return e.subVectors(this.end, this.start)
			}
			distanceSq() {
				return this.start.distanceToSquared(this.end)
			}
			distance() {
				return this.start.distanceTo(this.end)
			}
			at(e, t) {
				return this.delta(t).multiplyScalar(e).add(this.start)
			}
			closestPointToPointParameter(e, t) {
				ap.subVectors(e, this.start), zo.subVectors(this.end, this.start);
				let n = zo.dot(zo),
					s = zo.dot(ap) / n;
				return t && (s = It(s, 0, 1)), s
			}
			closestPointToPoint(e, t, n) {
				let i = this.closestPointToPointParameter(e, t);
				return this.delta(n).multiplyScalar(i).add(this.start)
			}
			applyMatrix4(e) {
				return this.start.applyMatrix4(e), this.end.applyMatrix4(e), this
			}
			equals(e) {
				return e.start.equals(this.start) && e.end.equals(this.end)
			}
			clone() {
				return new this.constructor().copy(this)
			}
		},
		op = new A,
		lp = class extends _e {
			constructor(e, t) {
				super();
				this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.color = t;
				let n = new de,
					i = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1];
				for (let a = 0, o = 1, l = 32; a < l; a++, o++) {
					let c = a / l * Math.PI * 2,
						u = o / l * Math.PI * 2;
					i.push(Math.cos(c), Math.sin(c), 1, Math.cos(u), Math.sin(u), 1)
				}
				n.setAttribute("position", new ce(i, 3));
				let s = new Ke({
					fog: !1,
					toneMapped: !1
				});
				this.cone = new Mt(n, s), this.add(this.cone), this.update()
			}
			dispose() {
				this.cone.geometry.dispose(), this.cone.material.dispose()
			}
			update() {
				this.light.updateMatrixWorld();
				let e = this.light.distance ? this.light.distance : 1e3,
					t = e * Math.tan(this.light.angle);
				this.cone.scale.set(t, t, e), op.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(op), this.color !== void 0 ? this.cone.material.color.set(this.color) : this.cone.material.color.copy(this.light.color)
			}
		},
		xi = new A,
		Go = new ge,
		ru = new ge,
		su = class extends Mt {
			constructor(e) {
				let t = cp(e),
					n = new de,
					i = [],
					s = [],
					a = new $(0, 0, 1),
					o = new $(0, 1, 0);
				for (let c = 0; c < t.length; c++) {
					let u = t[c];
					u.parent && u.parent.isBone && (i.push(0, 0, 0), i.push(0, 0, 0), s.push(a.r, a.g, a.b), s.push(o.r, o.g, o.b))
				}
				n.setAttribute("position", new ce(i, 3)), n.setAttribute("color", new ce(s, 3));
				let l = new Ke({
					vertexColors: !0,
					depthTest: !1,
					depthWrite: !1,
					toneMapped: !1,
					transparent: !0
				});
				super(n, l);
				this.type = "SkeletonHelper", this.isSkeletonHelper = !0, this.root = e, this.bones = t, this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
			}
			updateMatrixWorld(e) {
				let t = this.bones,
					n = this.geometry,
					i = n.getAttribute("position");
				ru.copy(this.root.matrixWorld).invert();
				for (let s = 0, a = 0; s < t.length; s++) {
					let o = t[s];
					o.parent && o.parent.isBone && (Go.multiplyMatrices(ru, o.matrixWorld), xi.setFromMatrixPosition(Go), i.setXYZ(a, xi.x, xi.y, xi.z), Go.multiplyMatrices(ru, o.parent.matrixWorld), xi.setFromMatrixPosition(Go), i.setXYZ(a + 1, xi.x, xi.y, xi.z), a += 2)
				}
				n.getAttribute("position").needsUpdate = !0, super.updateMatrixWorld(e)
			}
		};

	function cp(r) {
		let e = [];
		r && r.isBone && e.push(r);
		for (let t = 0; t < r.children.length; t++) e.push.apply(e, cp(r.children[t]));
		return e
	}
	var up = class extends ze {
		constructor(e, t, n) {
			let i = new Kt(t, 4, 2),
				s = new zt({
					wireframe: !0,
					fog: !1,
					toneMapped: !1
				});
			super(i, s);
			this.light = e, this.light.updateMatrixWorld(), this.color = n, this.type = "PointLightHelper", this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1, this.update()
		}
		dispose() {
			this.geometry.dispose(), this.material.dispose()
		}
		update() {
			this.color !== void 0 ? this.material.color.set(this.color) : this.material.color.copy(this.light.color)
		}
	},
		Lw = new A,
		hp = new $,
		dp = new $,
		fp = class extends _e {
			constructor(e, t, n) {
				super();
				this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.color = n;
				let i = new qi(t);
				i.rotateY(Math.PI * .5), this.material = new zt({
					wireframe: !0,
					fog: !1,
					toneMapped: !1
				}), this.color === void 0 && (this.material.vertexColors = !0);
				let s = i.getAttribute("position"),
					a = new Float32Array(s.count * 3);
				i.setAttribute("color", new pe(a, 3)), this.add(new ze(i, this.material)), this.update()
			}
			dispose() {
				this.children[0].geometry.dispose(), this.children[0].material.dispose()
			}
			update() {
				let e = this.children[0];
				if (this.color !== void 0) this.material.color.set(this.color);
				else {
					let t = e.geometry.getAttribute("color");
					hp.copy(this.light.color), dp.copy(this.light.groundColor);
					for (let n = 0, i = t.count; n < i; n++) {
						let s = n < i / 2 ? hp : dp;
						t.setXYZ(n, s.r, s.g, s.b)
					}
					t.needsUpdate = !0
				}
				e.lookAt(Lw.setFromMatrixPosition(this.light.matrixWorld).negate())
			}
		},
		ar = class extends Mt {
			constructor(e = 10, t = 10, n = 4473924, i = 8947848) {
				n = new $(n), i = new $(i);
				let s = t / 2,
					a = e / t,
					o = e / 2,
					l = [],
					c = [];
				for (let d = 0, f = 0, p = -o; d <= t; d++, p += a) {
					l.push(-o, 0, p, o, 0, p), l.push(p, 0, -o, p, 0, o);
					let v = d === s ? n : i;
					v.toArray(c, f), f += 3, v.toArray(c, f), f += 3, v.toArray(c, f), f += 3, v.toArray(c, f), f += 3
				}
				let u = new de;
				u.setAttribute("position", new ce(l, 3)), u.setAttribute("color", new ce(c, 3));
				let h = new Ke({
					vertexColors: !0,
					toneMapped: !1
				});
				super(u, h);
				this.type = "GridHelper"
			}
		},
		pp = class extends Mt {
			constructor(e = 10, t = 16, n = 8, i = 64, s = 4473924, a = 8947848) {
				s = new $(s), a = new $(a);
				let o = [],
					l = [];
				for (let h = 0; h <= t; h++) {
					let d = h / t * (Math.PI * 2),
						f = Math.sin(d) * e,
						p = Math.cos(d) * e;
					o.push(0, 0, 0), o.push(f, 0, p);
					let v = h & 1 ? s : a;
					l.push(v.r, v.g, v.b), l.push(v.r, v.g, v.b)
				}
				for (let h = 0; h <= n; h++) {
					let d = h & 1 ? s : a,
						f = e - e / n * h;
					for (let p = 0; p < i; p++) {
						let v = p / i * (Math.PI * 2),
							x = Math.sin(v) * f,
							g = Math.cos(v) * f;
						o.push(x, 0, g), l.push(d.r, d.g, d.b), v = (p + 1) / i * (Math.PI * 2), x = Math.sin(v) * f, g = Math.cos(v) * f, o.push(x, 0, g), l.push(d.r, d.g, d.b)
					}
				}
				let c = new de;
				c.setAttribute("position", new ce(o, 3)), c.setAttribute("color", new ce(l, 3));
				let u = new Ke({
					vertexColors: !0,
					toneMapped: !1
				});
				super(c, u);
				this.type = "PolarGridHelper"
			}
		},
		mp = new A,
		ko = new A,
		gp = new A,
		vp = class extends _e {
			constructor(e, t, n) {
				super();
				this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.color = n, t === void 0 && (t = 1);
				let i = new de;
				i.setAttribute("position", new ce([-t, t, 0, t, t, 0, t, -t, 0, -t, -t, 0, -t, t, 0], 3));
				let s = new Ke({
					fog: !1,
					toneMapped: !1
				});
				this.lightPlane = new kt(i, s), this.add(this.lightPlane), i = new de, i.setAttribute("position", new ce([0, 0, 0, 0, 0, 1], 3)), this.targetLine = new kt(i, s), this.add(this.targetLine), this.update()
			}
			dispose() {
				this.lightPlane.geometry.dispose(), this.lightPlane.material.dispose(), this.targetLine.geometry.dispose(), this.targetLine.material.dispose()
			}
			update() {
				mp.setFromMatrixPosition(this.light.matrixWorld), ko.setFromMatrixPosition(this.light.target.matrixWorld), gp.subVectors(ko, mp), this.lightPlane.lookAt(ko), this.color !== void 0 ? (this.lightPlane.material.color.set(this.color), this.targetLine.material.color.set(this.color)) : (this.lightPlane.material.color.copy(this.light.color), this.targetLine.material.color.copy(this.light.color)), this.targetLine.lookAt(ko), this.targetLine.scale.z = gp.length()
			}
		},
		Vo = new A,
		mt = new oi,
		xp = class extends Mt {
			constructor(e) {
				let t = new de,
					n = new Ke({
						color: 16777215,
						vertexColors: !0,
						toneMapped: !1
					}),
					i = [],
					s = [],
					a = {},
					o = new $(16755200),
					l = new $(16711680),
					c = new $(43775),
					u = new $(16777215),
					h = new $(3355443);
				d("n1", "n2", o), d("n2", "n4", o), d("n4", "n3", o), d("n3", "n1", o), d("f1", "f2", o), d("f2", "f4", o), d("f4", "f3", o), d("f3", "f1", o), d("n1", "f1", o), d("n2", "f2", o), d("n3", "f3", o), d("n4", "f4", o), d("p", "n1", l), d("p", "n2", l), d("p", "n3", l), d("p", "n4", l), d("u1", "u2", c), d("u2", "u3", c), d("u3", "u1", c), d("c", "t", u), d("p", "c", h), d("cn1", "cn2", h), d("cn3", "cn4", h), d("cf1", "cf2", h), d("cf3", "cf4", h);

				function d(p, v, x) {
					f(p, x), f(v, x)
				}

				function f(p, v) {
					i.push(0, 0, 0), s.push(v.r, v.g, v.b), a[p] === void 0 && (a[p] = []), a[p].push(i.length / 3 - 1)
				}
				t.setAttribute("position", new ce(i, 3)), t.setAttribute("color", new ce(s, 3));
				super(t, n);
				this.type = "CameraHelper", this.camera = e, this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = a, this.update()
			}
			update() {
				let e = this.geometry,
					t = this.pointMap,
					n = 1,
					i = 1;
				mt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse), bt("c", t, e, mt, 0, 0, -1), bt("t", t, e, mt, 0, 0, 1), bt("n1", t, e, mt, -n, -i, -1), bt("n2", t, e, mt, n, -i, -1), bt("n3", t, e, mt, -n, i, -1), bt("n4", t, e, mt, n, i, -1), bt("f1", t, e, mt, -n, -i, 1), bt("f2", t, e, mt, n, -i, 1), bt("f3", t, e, mt, -n, i, 1), bt("f4", t, e, mt, n, i, 1), bt("u1", t, e, mt, n * .7, i * 1.1, -1), bt("u2", t, e, mt, -n * .7, i * 1.1, -1), bt("u3", t, e, mt, 0, i * 2, -1), bt("cf1", t, e, mt, -n, 0, 1), bt("cf2", t, e, mt, n, 0, 1), bt("cf3", t, e, mt, 0, -i, 1), bt("cf4", t, e, mt, 0, i, 1), bt("cn1", t, e, mt, -n, 0, -1), bt("cn2", t, e, mt, n, 0, -1), bt("cn3", t, e, mt, 0, -i, -1), bt("cn4", t, e, mt, 0, i, -1), e.getAttribute("position").needsUpdate = !0
			}
			dispose() {
				this.geometry.dispose(), this.material.dispose()
			}
		};

	function bt(r, e, t, n, i, s, a) {
		Vo.set(i, s, a).unproject(n);
		let o = e[r];
		if (o !== void 0) {
			let l = t.getAttribute("position");
			for (let c = 0, u = o.length; c < u; c++) l.setXYZ(o[c], Vo.x, Vo.y, Vo.z)
		}
	}
	var Wo = new Bt,
		au = class extends Mt {
			constructor(e, t = 16776960) {
				let n = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
					i = new Float32Array(8 * 3),
					s = new de;
				s.setIndex(new pe(n, 1)), s.setAttribute("position", new pe(i, 3));
				super(s, new Ke({
					color: t,
					toneMapped: !1
				}));
				this.object = e, this.type = "BoxHelper", this.matrixAutoUpdate = !1, this.update()
			}
			update(e) {
				if (e !== void 0 && console.warn("THREE.BoxHelper: .update() has no longer arguments."), this.object !== void 0 && Wo.setFromObject(this.object), Wo.isEmpty()) return;
				let t = Wo.min,
					n = Wo.max,
					i = this.geometry.attributes.position,
					s = i.array;
				s[0] = n.x, s[1] = n.y, s[2] = n.z, s[3] = t.x, s[4] = n.y, s[5] = n.z, s[6] = t.x, s[7] = t.y, s[8] = n.z, s[9] = n.x, s[10] = t.y, s[11] = n.z, s[12] = n.x, s[13] = n.y, s[14] = t.z, s[15] = t.x, s[16] = n.y, s[17] = t.z, s[18] = t.x, s[19] = t.y, s[20] = t.z, s[21] = n.x, s[22] = t.y, s[23] = t.z, i.needsUpdate = !0, this.geometry.computeBoundingSphere()
			}
			setFromObject(e) {
				return this.object = e, this.update(), this
			}
			copy(e) {
				return Mt.prototype.copy.call(this, e), this.object = e.object, this
			}
		},
		yp = class extends Mt {
			constructor(e, t = 16776960) {
				let n = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
					i = [1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1],
					s = new de;
				s.setIndex(new pe(n, 1)), s.setAttribute("position", new ce(i, 3));
				super(s, new Ke({
					color: t,
					toneMapped: !1
				}));
				this.box = e, this.type = "Box3Helper", this.geometry.computeBoundingSphere()
			}
			updateMatrixWorld(e) {
				let t = this.box;
				t.isEmpty() || (t.getCenter(this.position), t.getSize(this.scale), this.scale.multiplyScalar(.5), super.updateMatrixWorld(e))
			}
		},
		wp = class extends kt {
			constructor(e, t = 1, n = 16776960) {
				let i = n,
					s = [1, -1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
					a = new de;
				a.setAttribute("position", new ce(s, 3)), a.computeBoundingSphere();
				super(a, new Ke({
					color: i,
					toneMapped: !1
				}));
				this.type = "PlaneHelper", this.plane = e, this.size = t;
				let o = [1, 1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 1, 1, -1, 1],
					l = new de;
				l.setAttribute("position", new ce(o, 3)), l.computeBoundingSphere(), this.add(new ze(l, new zt({
					color: i,
					opacity: .2,
					transparent: !0,
					depthWrite: !1,
					toneMapped: !1
				})))
			}
			updateMatrixWorld(e) {
				let t = -this.plane.constant;
				Math.abs(t) < 1e-8 && (t = 1e-8), this.scale.set(.5 * this.size, .5 * this.size, t), this.children[0].material.side = t < 0 ? Qe : Rn, this.lookAt(this.plane.normal), super.updateMatrixWorld(e)
			}
		},
		bp = new A,
		Yo, ou, Ap = class extends _e {
			constructor(e = new A(0, 0, 1), t = new A(0, 0, 0), n = 1, i = 16776960, s = n * .2, a = s * .2) {
				super();
				this.type = "ArrowHelper", Yo === void 0 && (Yo = new de, Yo.setAttribute("position", new ce([0, 0, 0, 0, 1, 0], 3)), ou = new fi(0, .5, 1, 5, 1), ou.translate(0, -.5, 0)), this.position.copy(t), this.line = new kt(Yo, new Ke({
					color: i,
					toneMapped: !1
				})), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new ze(ou, new zt({
					color: i,
					toneMapped: !1
				})), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(e), this.setLength(n, s, a)
			}
			setDirection(e) {
				if (e.y > .99999) this.quaternion.set(0, 0, 0, 1);
				else if (e.y < -.99999) this.quaternion.set(1, 0, 0, 0);
				else {
					bp.set(e.z, 0, -e.x).normalize();
					let t = Math.acos(e.y);
					this.quaternion.setFromAxisAngle(bp, t)
				}
			}
			setLength(e, t = e * .2, n = t * .2) {
				this.line.scale.set(1, Math.max(1e-4, e - t), 1), this.line.updateMatrix(), this.cone.scale.set(n, t, n), this.cone.position.y = e, this.cone.updateMatrix()
			}
			setColor(e) {
				this.line.material.color.set(e), this.cone.material.color.set(e)
			}
			copy(e) {
				return super.copy(e, !1), this.line.copy(e.line), this.cone.copy(e.cone), this
			}
		},
		ha = class extends Mt {
			constructor(e = 1) {
				let t = [0, 0, 0, e, 0, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 0, e],
					n = [1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1],
					i = new de;
				i.setAttribute("position", new ce(t, 3)), i.setAttribute("color", new ce(n, 3));
				let s = new Ke({
					vertexColors: !0,
					toneMapped: !1
				});
				super(i, s);
				this.type = "AxesHelper"
			}
			setColors(e, t, n) {
				let i = new $,
					s = this.geometry.attributes.color.array;
				return i.set(e), i.toArray(s, 0), i.toArray(s, 3), i.set(t), i.toArray(s, 6), i.toArray(s, 9), i.set(n), i.toArray(s, 12), i.toArray(s, 15), this.geometry.attributes.color.needsUpdate = !0, this
			}
			dispose() {
				this.geometry.dispose(), this.material.dispose()
			}
		},
		Ep = class {
			constructor() {
				this.type = "ShapePath", this.color = new $, this.subPaths = [], this.currentPath = null
			}
			moveTo(e, t) {
				return this.currentPath = new Qr, this.subPaths.push(this.currentPath), this.currentPath.moveTo(e, t), this
			}
			lineTo(e, t) {
				return this.currentPath.lineTo(e, t), this
			}
			quadraticCurveTo(e, t, n, i) {
				return this.currentPath.quadraticCurveTo(e, t, n, i), this
			}
			bezierCurveTo(e, t, n, i, s, a) {
				return this.currentPath.bezierCurveTo(e, t, n, i, s, a), this
			}
			splineThru(e) {
				return this.currentPath.splineThru(e), this
			}
			toShapes(e, t) {
				function n(m) {
					let b = [];
					for (let y = 0, E = m.length; y < E; y++) {
						let _ = m[y],
							w = new gn;
						w.curves = _.curves, b.push(w)
					}
					return b
				}

				function i(m, b) {
					let y = b.length,
						E = !1;
					for (let _ = y - 1, w = 0; w < y; _ = w++) {
						let D = b[_],
							I = b[w],
							L = I.x - D.x,
							R = I.y - D.y;
						if (Math.abs(R) > Number.EPSILON) {
							if (R < 0 && (D = b[w], L = -L, I = b[_], R = -R), m.y < D.y || m.y > I.y) continue;
							if (m.y === D.y) {
								if (m.x === D.x) return !0
							} else {
								let Z = R * (m.x - D.x) - L * (m.y - D.y);
								if (Z === 0) return !0;
								if (Z < 0) continue;
								E = !E
							}
						} else {
							if (m.y !== D.y) continue;
							if (I.x <= m.x && m.x <= D.x || D.x <= m.x && m.x <= I.x) return !0
						}
					}
					return E
				}
				let s = vn.isClockWise,
					a = this.subPaths;
				if (a.length === 0) return [];
				if (t === !0) return n(a);
				let o, l, c, u = [];
				if (a.length === 1) return l = a[0], c = new gn, c.curves = l.curves, u.push(c), u;
				let h = !s(a[0].getPoints());
				h = e ? !h : h;
				let d = [],
					f = [],
					p = [],
					v = 0,
					x;
				f[v] = void 0, p[v] = [];
				for (let m = 0, b = a.length; m < b; m++) l = a[m], x = l.getPoints(), o = s(x), o = e ? !o : o, o ? (!h && f[v] && v++, f[v] = {
					s: new gn,
					p: x
				}, f[v].s.curves = l.curves, h && v++, p[v] = []) : p[v].push({
					h: l,
					p: x[0]
				});
				if (!f[0]) return n(a);
				if (f.length > 1) {
					let m = !1,
						b = [];
					for (let y = 0, E = f.length; y < E; y++) d[y] = [];
					for (let y = 0, E = f.length; y < E; y++) {
						let _ = p[y];
						for (let w = 0; w < _.length; w++) {
							let D = _[w],
								I = !0;
							for (let L = 0; L < f.length; L++) i(D.p, f[L].p) && (y !== L && b.push({
								froms: y,
								tos: L,
								hole: w
							}), I ? (I = !1, d[L].push(D)) : m = !0);
							I && d[y].push(D)
						}
					}
					b.length > 0 && (m || (p = d))
				}
				let g;
				for (let m = 0, b = f.length; m < b; m++) {
					c = f[m].s, u.push(c), g = p[m];
					for (let y = 0, E = g.length; y < E; y++) c.holes.push(g[y].h)
				}
				return u
			}
		},
		Mp = new Float32Array(1),
		Iw = new Int32Array(Mp.buffer),
		Sp = class {
			static toHalfFloat(e) {
				e > 65504 && (console.warn("THREE.DataUtils.toHalfFloat(): value exceeds 65504."), e = 65504), Mp[0] = e;
				let t = Iw[0],
					n = t >> 16 & 32768,
					i = t >> 12 & 2047,
					s = t >> 23 & 255;
				return s < 103 ? n : s > 142 ? (n |= 31744, n |= (s == 255 ? 0 : 1) && t & 8388607, n) : s < 113 ? (i |= 2048, n |= (i >> 114 - s) + (i >> 113 - s & 1), n) : (n |= s - 112 << 10 | i >> 1, n += i & 1, n)
			}
		},
		Bw = 0,
		Uw = 1,
		Fw = 0,
		Ow = 1,
		Nw = 2;

	function Hw(r) {
		return console.warn("THREE.MeshFaceMaterial has been removed. Use an Array instead."), r
	}

	function zw(r = []) {
		return console.warn("THREE.MultiMaterial has been removed. Use an Array instead."), r.isMultiMaterial = !0, r.materials = r, r.clone = function () {
			return r.slice()
		}, r
	}

	function Gw(r, e) {
		return console.warn("THREE.PointCloud has been renamed to THREE.Points."), new Ot(r, e)
	}

	function kw(r) {
		return console.warn("THREE.Particle has been renamed to THREE.Sprite."), new Qi(r)
	}

	function Vw(r, e) {
		return console.warn("THREE.ParticleSystem has been renamed to THREE.Points."), new Ot(r, e)
	}

	function Ww(r) {
		return console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial."), new Xt(r)
	}

	function Yw(r) {
		return console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial."), new Xt(r)
	}

	function jw(r) {
		return console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial."), new Xt(r)
	}

	function Xw(r, e, t) {
		return console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead."), new A(r, e, t)
	}

	function Qw(r, e) {
		return console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setUsage( THREE.DynamicDrawUsage ) instead."), new pe(r, e).setUsage(In)
	}

	function qw(r, e) {
		return console.warn("THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead."), new ql(r, e)
	}

	function Zw(r, e) {
		return console.warn("THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead."), new Zl(r, e)
	}

	function Jw(r, e) {
		return console.warn("THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead."), new Jl(r, e)
	}

	function Kw(r, e) {
		return console.warn("THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead."), new Kl(r, e)
	}

	function $w(r, e) {
		return console.warn("THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead."), new Bs(r, e)
	}

	function eb(r, e) {
		return console.warn("THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead."), new $l(r, e)
	}

	function tb(r, e) {
		return console.warn("THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead."), new Us(r, e)
	}

	function nb(r, e) {
		return console.warn("THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead."), new ce(r, e)
	}

	function ib(r, e) {
		return console.warn("THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead."), new tc(r, e)
	}
	Vt.create = function (r, e) {
		return console.log("THREE.Curve.create() has been deprecated"), r.prototype = Object.create(Vt.prototype), r.prototype.constructor = r, r.prototype.getPoint = e, r
	};
	Qr.prototype.fromPoints = function (r) {
		return console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."), this.setFromPoints(r)
	};

	function rb(r) {
		return console.warn("THREE.AxisHelper has been renamed to THREE.AxesHelper."), new ha(r)
	}

	function sb(r, e) {
		return console.warn("THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead."), new au(r, e)
	}

	function ab(r, e) {
		return console.warn("THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead."), new Mt(new fo(r.geometry), new Ke({
			color: e !== void 0 ? e : 16777215
		}))
	}
	ar.prototype.setColors = function () {
		console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")
	};
	su.prototype.update = function () {
		console.error("THREE.SkeletonHelper: update() no longer needs to be called.")
	};

	function ob(r, e) {
		return console.warn("THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead."), new Mt(new bo(r.geometry), new Ke({
			color: e !== void 0 ? e : 16777215
		}))
	}
	Dt.prototype.extractUrlBase = function (r) {
		return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."), ca.extractUrlBase(r)
	};
	Dt.Handlers = {
		add: function () {
			console.error("THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.")
		},
		get: function () {
			console.error("THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.")
		}
	};

	function lb(r) {
		return console.warn("THREE.XHRLoader has been renamed to THREE.FileLoader."), new Qt(r)
	}

	function cb(r) {
		return console.warn("THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader."), new Uc(r)
	}
	sr.prototype.center = function (r) {
		return console.warn("THREE.Box2: .center() has been renamed to .getCenter()."), this.getCenter(r)
	};
	sr.prototype.empty = function () {
		return console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."), this.isEmpty()
	};
	sr.prototype.isIntersectionBox = function (r) {
		return console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(r)
	};
	sr.prototype.size = function (r) {
		return console.warn("THREE.Box2: .size() has been renamed to .getSize()."), this.getSize(r)
	};
	Bt.prototype.center = function (r) {
		return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."), this.getCenter(r)
	};
	Bt.prototype.empty = function () {
		return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."), this.isEmpty()
	};
	Bt.prototype.isIntersectionBox = function (r) {
		return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(r)
	};
	Bt.prototype.isIntersectionSphere = function (r) {
		return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(r)
	};
	Bt.prototype.size = function (r) {
		return console.warn("THREE.Box3: .size() has been renamed to .getSize()."), this.getSize(r)
	};
	Un.prototype.empty = function () {
		return console.warn("THREE.Sphere: .empty() has been renamed to .isEmpty()."), this.isEmpty()
	};
	Rr.prototype.setFromMatrix = function (r) {
		return console.warn("THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."), this.setFromProjectionMatrix(r)
	};
	iu.prototype.center = function (r) {
		return console.warn("THREE.Line3: .center() has been renamed to .getCenter()."), this.getCenter(r)
	};
	Et.prototype.flattenToArrayOffset = function (r, e) {
		return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(r, e)
	};
	Et.prototype.multiplyVector3 = function (r) {
		return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), r.applyMatrix3(this)
	};
	Et.prototype.multiplyVector3Array = function () {
		console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")
	};
	Et.prototype.applyToBufferAttribute = function (r) {
		return console.warn("THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."), r.applyMatrix3(this)
	};
	Et.prototype.applyToVector3Array = function () {
		console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")
	};
	Et.prototype.getInverse = function (r) {
		return console.warn("THREE.Matrix3: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."), this.copy(r).invert()
	};
	ge.prototype.extractPosition = function (r) {
		return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(r)
	};
	ge.prototype.flattenToArrayOffset = function (r, e) {
		return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(r, e)
	};
	ge.prototype.getPosition = function () {
		return console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."), new A().setFromMatrixColumn(this, 3)
	};
	ge.prototype.setRotationFromQuaternion = function (r) {
		return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), this.makeRotationFromQuaternion(r)
	};
	ge.prototype.multiplyToArray = function () {
		console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")
	};
	ge.prototype.multiplyVector3 = function (r) {
		return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."), r.applyMatrix4(this)
	};
	ge.prototype.multiplyVector4 = function (r) {
		return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), r.applyMatrix4(this)
	};
	ge.prototype.multiplyVector3Array = function () {
		console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")
	};
	ge.prototype.rotateAxis = function (r) {
		console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), r.transformDirection(this)
	};
	ge.prototype.crossVector = function (r) {
		return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), r.applyMatrix4(this)
	};
	ge.prototype.translate = function () {
		console.error("THREE.Matrix4: .translate() has been removed.")
	};
	ge.prototype.rotateX = function () {
		console.error("THREE.Matrix4: .rotateX() has been removed.")
	};
	ge.prototype.rotateY = function () {
		console.error("THREE.Matrix4: .rotateY() has been removed.")
	};
	ge.prototype.rotateZ = function () {
		console.error("THREE.Matrix4: .rotateZ() has been removed.")
	};
	ge.prototype.rotateByAxis = function () {
		console.error("THREE.Matrix4: .rotateByAxis() has been removed.")
	};
	ge.prototype.applyToBufferAttribute = function (r) {
		return console.warn("THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."), r.applyMatrix4(this)
	};
	ge.prototype.applyToVector3Array = function () {
		console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")
	};
	ge.prototype.makeFrustum = function (r, e, t, n, i, s) {
		return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."), this.makePerspective(r, e, n, t, i, s)
	};
	ge.prototype.getInverse = function (r) {
		return console.warn("THREE.Matrix4: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."), this.copy(r).invert()
	};
	fn.prototype.isIntersectionLine = function (r) {
		return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."), this.intersectsLine(r)
	};
	yt.prototype.multiplyVector3 = function (r) {
		return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), r.applyQuaternion(this)
	};
	yt.prototype.inverse = function () {
		return console.warn("THREE.Quaternion: .inverse() has been renamed to invert()."), this.invert()
	};
	On.prototype.isIntersectionBox = function (r) {
		return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(r)
	};
	On.prototype.isIntersectionPlane = function (r) {
		return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."), this.intersectsPlane(r)
	};
	On.prototype.isIntersectionSphere = function (r) {
		return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(r)
	};
	pt.prototype.area = function () {
		return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."), this.getArea()
	};
	pt.prototype.barycoordFromPoint = function (r, e) {
		return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."), this.getBarycoord(r, e)
	};
	pt.prototype.midpoint = function (r) {
		return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."), this.getMidpoint(r)
	};
	pt.prototypenormal = function (r) {
		return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."), this.getNormal(r)
	};
	pt.prototype.plane = function (r) {
		return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."), this.getPlane(r)
	};
	pt.barycoordFromPoint = function (r, e, t, n, i) {
		return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."), pt.getBarycoord(r, e, t, n, i)
	};
	pt.normal = function (r, e, t, n) {
		return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."), pt.getNormal(r, e, t, n)
	};
	gn.prototype.extractAllPoints = function (r) {
		return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."), this.extractPoints(r)
	};
	gn.prototype.extrude = function (r) {
		return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."), new Sn(this, r)
	};
	gn.prototype.makeGeometry = function (r) {
		return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."), new Zi(this, r)
	};
	O.prototype.fromAttribute = function (r, e, t) {
		return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(r, e, t)
	};
	O.prototype.distanceToManhattan = function (r) {
		return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."), this.manhattanDistanceTo(r)
	};
	O.prototype.lengthManhattan = function () {
		return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength()
	};
	A.prototype.setEulerFromRotationMatrix = function () {
		console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
	};
	A.prototype.setEulerFromQuaternion = function () {
		console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
	};
	A.prototype.getPositionFromMatrix = function (r) {
		return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), this.setFromMatrixPosition(r)
	};
	A.prototype.getScaleFromMatrix = function (r) {
		return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), this.setFromMatrixScale(r)
	};
	A.prototype.getColumnFromMatrix = function (r, e) {
		return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), this.setFromMatrixColumn(e, r)
	};
	A.prototype.applyProjection = function (r) {
		return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."), this.applyMatrix4(r)
	};
	A.prototype.fromAttribute = function (r, e, t) {
		return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(r, e, t)
	};
	A.prototype.distanceToManhattan = function (r) {
		return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."), this.manhattanDistanceTo(r)
	};
	A.prototype.lengthManhattan = function () {
		return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength()
	};
	Ve.prototype.fromAttribute = function (r, e, t) {
		return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(r, e, t)
	};
	Ve.prototype.lengthManhattan = function () {
		return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength()
	};
	_e.prototype.getChildByName = function (r) {
		return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(r)
	};
	_e.prototype.renderDepth = function () {
		console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")
	};
	_e.prototype.translate = function (r, e) {
		return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), this.translateOnAxis(e, r)
	};
	_e.prototype.getWorldRotation = function () {
		console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")
	};
	_e.prototype.applyMatrix = function (r) {
		return console.warn("THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."), this.applyMatrix4(r)
	};
	Object.defineProperties(_e.prototype, {
		eulerOrder: {
			get: function () {
				return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order
			},
			set: function (r) {
				console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order = r
			}
		},
		useQuaternion: {
			get: function () {
				console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
			},
			set: function () {
				console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
			}
		}
	});
	ze.prototype.setDrawMode = function () {
		console.error("THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")
	};
	Object.defineProperties(ze.prototype, {
		drawMode: {
			get: function () {
				return console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."), ad
			},
			set: function () {
				console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")
			}
		}
	});
	qs.prototype.initBones = function () {
		console.error("THREE.SkinnedMesh: initBones() has been removed.")
	};
	ct.prototype.setLens = function (r, e) {
		console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."), e !== void 0 && (this.filmGauge = e), this.setFocalLength(r)
	};
	Object.defineProperties(tn.prototype, {
		onlyShadow: {
			set: function () {
				console.warn("THREE.Light: .onlyShadow has been removed.")
			}
		},
		shadowCameraFov: {
			set: function (r) {
				console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."), this.shadow.camera.fov = r
			}
		},
		shadowCameraLeft: {
			set: function (r) {
				console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."), this.shadow.camera.left = r
			}
		},
		shadowCameraRight: {
			set: function (r) {
				console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."), this.shadow.camera.right = r
			}
		},
		shadowCameraTop: {
			set: function (r) {
				console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."), this.shadow.camera.top = r
			}
		},
		shadowCameraBottom: {
			set: function (r) {
				console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."), this.shadow.camera.bottom = r
			}
		},
		shadowCameraNear: {
			set: function (r) {
				console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."), this.shadow.camera.near = r
			}
		},
		shadowCameraFar: {
			set: function (r) {
				console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."), this.shadow.camera.far = r
			}
		},
		shadowCameraVisible: {
			set: function () {
				console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")
			}
		},
		shadowBias: {
			set: function (r) {
				console.warn("THREE.Light: .shadowBias is now .shadow.bias."), this.shadow.bias = r
			}
		},
		shadowDarkness: {
			set: function () {
				console.warn("THREE.Light: .shadowDarkness has been removed.")
			}
		},
		shadowMapWidth: {
			set: function (r) {
				console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."), this.shadow.mapSize.width = r
			}
		},
		shadowMapHeight: {
			set: function (r) {
				console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."), this.shadow.mapSize.height = r
			}
		}
	});
	Object.defineProperties(pe.prototype, {
		length: {
			get: function () {
				return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."), this.array.length
			}
		},
		dynamic: {
			get: function () {
				return console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."), this.usage === In
			},
			set: function () {
				console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."), this.setUsage(In)
			}
		}
	});
	pe.prototype.setDynamic = function (r) {
		return console.warn("THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."), this.setUsage(r === !0 ? In : pr), this
	};
	pe.prototype.copyIndicesArray = function () {
		console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")
	}, pe.prototype.setArray = function () {
		console.error("THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")
	};
	de.prototype.addIndex = function (r) {
		console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."), this.setIndex(r)
	};
	de.prototype.addAttribute = function (r, e) {
		return console.warn("THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."), !(e && e.isBufferAttribute) && !(e && e.isInterleavedBufferAttribute) ? (console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), this.setAttribute(r, new pe(arguments[1], arguments[2]))) : r === "index" ? (console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."), this.setIndex(e), this) : this.setAttribute(r, e)
	};
	de.prototype.addDrawCall = function (r, e, t) {
		t !== void 0 && console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."), console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."), this.addGroup(r, e)
	};
	de.prototype.clearDrawCalls = function () {
		console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."), this.clearGroups()
	};
	de.prototype.computeOffsets = function () {
		console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")
	};
	de.prototype.removeAttribute = function (r) {
		return console.warn("THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."), this.deleteAttribute(r)
	};
	de.prototype.applyMatrix = function (r) {
		return console.warn("THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."), this.applyMatrix4(r)
	};
	Object.defineProperties(de.prototype, {
		drawcalls: {
			get: function () {
				return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."), this.groups
			}
		},
		offsets: {
			get: function () {
				return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."), this.groups
			}
		}
	});
	hi.prototype.setDynamic = function (r) {
		return console.warn("THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."), this.setUsage(r === !0 ? In : pr), this
	};
	hi.prototype.setArray = function () {
		console.error("THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")
	};
	Sn.prototype.getArrays = function () {
		console.error("THREE.ExtrudeGeometry: .getArrays() has been removed.")
	};
	Sn.prototype.addShapeList = function () {
		console.error("THREE.ExtrudeGeometry: .addShapeList() has been removed.")
	};
	Sn.prototype.addShape = function () {
		console.error("THREE.ExtrudeGeometry: .addShape() has been removed.")
	};
	mn.prototype.dispose = function () {
		console.error("THREE.Scene: .dispose() has been removed.")
	};
	De.prototype.onUpdate = function () {
		return console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."), this
	};
	Object.defineProperties(tt.prototype, {
		wrapAround: {
			get: function () {
				console.warn("THREE.Material: .wrapAround has been removed.")
			},
			set: function () {
				console.warn("THREE.Material: .wrapAround has been removed.")
			}
		},
		overdraw: {
			get: function () {
				console.warn("THREE.Material: .overdraw has been removed.")
			},
			set: function () {
				console.warn("THREE.Material: .overdraw has been removed.")
			}
		},
		wrapRGB: {
			get: function () {
				return console.warn("THREE.Material: .wrapRGB has been removed."), new $
			}
		},
		shading: {
			get: function () {
				console.error("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead.")
			},
			set: function (r) {
				console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = r === ol
			}
		},
		stencilMask: {
			get: function () {
				return console.warn("THREE." + this.type + ": .stencilMask has been removed. Use .stencilFuncMask instead."), this.stencilFuncMask
			},
			set: function (r) {
				console.warn("THREE." + this.type + ": .stencilMask has been removed. Use .stencilFuncMask instead."), this.stencilFuncMask = r
			}
		},
		vertexTangents: {
			get: function () {
				console.warn("THREE." + this.type + ": .vertexTangents has been removed.")
			},
			set: function () {
				console.warn("THREE." + this.type + ": .vertexTangents has been removed.")
			}
		}
	});
	Object.defineProperties(Ye.prototype, {
		derivatives: {
			get: function () {
				return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives
			},
			set: function (r) {
				console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives = r
			}
		}
	});
	Ze.prototype.clearTarget = function (r, e, t, n) {
		console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."), this.setRenderTarget(r), this.clear(e, t, n)
	};
	Ze.prototype.animate = function (r) {
		console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."), this.setAnimationLoop(r)
	};
	Ze.prototype.getCurrentRenderTarget = function () {
		return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."), this.getRenderTarget()
	};
	Ze.prototype.getMaxAnisotropy = function () {
		return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."), this.capabilities.getMaxAnisotropy()
	};
	Ze.prototype.getPrecision = function () {
		return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."), this.capabilities.precision
	};
	Ze.prototype.resetGLState = function () {
		return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."), this.state.reset()
	};
	Ze.prototype.supportsFloatTextures = function () {
		return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."), this.extensions.get("OES_texture_float")
	};
	Ze.prototype.supportsHalfFloatTextures = function () {
		return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."), this.extensions.get("OES_texture_half_float")
	};
	Ze.prototype.supportsStandardDerivatives = function () {
		return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."), this.extensions.get("OES_standard_derivatives")
	};
	Ze.prototype.supportsCompressedTextureS3TC = function () {
		return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."), this.extensions.get("WEBGL_compressed_texture_s3tc")
	};
	Ze.prototype.supportsCompressedTexturePVRTC = function () {
		return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."), this.extensions.get("WEBGL_compressed_texture_pvrtc")
	};
	Ze.prototype.supportsBlendMinMax = function () {
		return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."), this.extensions.get("EXT_blend_minmax")
	};
	Ze.prototype.supportsVertexTextures = function () {
		return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."), this.capabilities.vertexTextures
	};
	Ze.prototype.supportsInstancedArrays = function () {
		return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."), this.extensions.get("ANGLE_instanced_arrays")
	};
	Ze.prototype.enableScissorTest = function (r) {
		console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."), this.setScissorTest(r)
	};
	Ze.prototype.initMaterial = function () {
		console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
	};
	Ze.prototype.addPrePlugin = function () {
		console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
	};
	Ze.prototype.addPostPlugin = function () {
		console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
	};
	Ze.prototype.updateShadowMap = function () {
		console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
	};
	Ze.prototype.setFaceCulling = function () {
		console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")
	};
	Ze.prototype.allocTextureUnit = function () {
		console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.")
	};
	Ze.prototype.setTexture = function () {
		console.warn("THREE.WebGLRenderer: .setTexture() has been removed.")
	};
	Ze.prototype.setTexture2D = function () {
		console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.")
	};
	Ze.prototype.setTextureCube = function () {
		console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.")
	};
	Ze.prototype.getActiveMipMapLevel = function () {
		return console.warn("THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."), this.getActiveMipmapLevel()
	};
	Object.defineProperties(Ze.prototype, {
		shadowMapEnabled: {
			get: function () {
				return this.shadowMap.enabled
			},
			set: function (r) {
				console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."), this.shadowMap.enabled = r
			}
		},
		shadowMapType: {
			get: function () {
				return this.shadowMap.type
			},
			set: function (r) {
				console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."), this.shadowMap.type = r
			}
		},
		shadowMapCullFace: {
			get: function () {
				console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")
			},
			set: function () {
				console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")
			}
		},
		context: {
			get: function () {
				return console.warn("THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."), this.getContext()
			}
		},
		vr: {
			get: function () {
				return console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"), this.xr
			}
		},
		gammaInput: {
			get: function () {
				return console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."), !1
			},
			set: function () {
				console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.")
			}
		},
		gammaOutput: {
			get: function () {
				return console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."), !1
			},
			set: function (r) {
				console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."), this.outputEncoding = r === !0 ? qe : ft
			}
		},
		toneMappingWhitePoint: {
			get: function () {
				return console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."), 1
			},
			set: function () {
				console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed.")
			}
		}
	});
	Object.defineProperties(af.prototype, {
		cullFace: {
			get: function () {
				console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")
			},
			set: function () {
				console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")
			}
		},
		renderReverseSided: {
			get: function () {
				console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")
			},
			set: function () {
				console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")
			}
		},
		renderSingleSided: {
			get: function () {
				console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")
			},
			set: function () {
				console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")
			}
		}
	});

	function ub(r, e, t) {
		return console.warn("THREE.WebGLRenderTargetCube( width, height, options ) is now WebGLCubeRenderTarget( size, options )."), new Ns(r, t)
	}
	Object.defineProperties(We.prototype, {
		wrapS: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS
			},
			set: function (r) {
				console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS = r
			}
		},
		wrapT: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT
			},
			set: function (r) {
				console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT = r
			}
		},
		magFilter: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter
			},
			set: function (r) {
				console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter = r
			}
		},
		minFilter: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter
			},
			set: function (r) {
				console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter = r
			}
		},
		anisotropy: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy
			},
			set: function (r) {
				console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy = r
			}
		},
		offset: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset
			},
			set: function (r) {
				console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset = r
			}
		},
		repeat: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat
			},
			set: function (r) {
				console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat = r
			}
		},
		format: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format
			},
			set: function (r) {
				console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format = r
			}
		},
		type: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type
			},
			set: function (r) {
				console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type = r
			}
		},
		generateMipmaps: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps
			},
			set: function (r) {
				console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps = r
			}
		}
	});
	Ho.prototype.load = function (r) {
		console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");
		let e = this;
		return new Wc().load(r, function (n) {
			e.setBuffer(n)
		}), this
	};
	Qc.prototype.getData = function () {
		return console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData()."), this.getFrequencyData()
	};
	Os.prototype.updateCubeMap = function (r, e) {
		return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."), this.update(r, e)
	};
	Os.prototype.clear = function (r, e, t, n) {
		return console.warn("THREE.CubeCamera: .clear() is now .renderTarget.clear()."), this.renderTarget.clear(r, e, t, n)
	};
	Kn.crossOrigin = void 0;
	Kn.loadTexture = function (r, e, t, n) {
		console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
		let i = new en;
		i.setCrossOrigin(this.crossOrigin);
		let s = i.load(r, t, void 0, n);
		return e && (s.mapping = e), s
	};
	Kn.loadTextureCube = function (r, e, t, n) {
		console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");
		let i = new Bc;
		i.setCrossOrigin(this.crossOrigin);
		let s = i.load(r, t, void 0, n);
		return e && (s.mapping = e), s
	};
	Kn.loadCompressedTexture = function () {
		console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
	};
	Kn.loadCompressedTextureCube = function () {
		console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
	};

	function hb() {
		console.error("THREE.CanvasRenderer has been removed")
	}

	function db() {
		console.error("THREE.JSONLoader has been removed.")
	}
	var fb = {
		createMultiMaterialObject: function () {
			console.error("THREE.SceneUtils has been moved to /examples/jsm/utils/SceneUtils.js")
		},
		detach: function () {
			console.error("THREE.SceneUtils has been moved to /examples/jsm/utils/SceneUtils.js")
		},
		attach: function () {
			console.error("THREE.SceneUtils has been moved to /examples/jsm/utils/SceneUtils.js")
		}
	};

	function pb() {
		console.error("THREE.LensFlare has been moved to /examples/jsm/objects/Lensflare.js")
	}

	function mb() {
		return console.error("THREE.ParametricGeometry has been moved to /examples/jsm/geometries/ParametricGeometry.js"), new de
	}

	function gb() {
		return console.error("THREE.TextGeometry has been moved to /examples/jsm/geometries/TextGeometry.js"), new de
	}

	function vb() {
		console.error("THREE.FontLoader has been moved to /examples/jsm/loaders/FontLoader.js")
	}

	function xb() {
		console.error("THREE.Font has been moved to /examples/jsm/loaders/FontLoader.js")
	}

	function yb() {
		console.error("THREE.ImmediateRenderObject has been removed.")
	}
	typeof __THREE_DEVTOOLS__ != "undefined" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", {
		detail: {
			revision: bn
		}
	}));
	typeof window != "undefined" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = bn);
	var _p = {
		type: "change"
	},
		cu = {
			type: "start"
		},
		Tp = {
			type: "end"
		},
		uu = class extends Pt {
			constructor(e, t) {
				super();
				t === void 0 && console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'), t === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), this.object = e, this.domElement = t, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new A, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
					LEFT: "ArrowLeft",
					UP: "ArrowUp",
					RIGHT: "ArrowRight",
					BOTTOM: "ArrowDown"
				}, this.mouseButtons = {
					LEFT: Zt.ROTATE,
					MIDDLE: Zt.DOLLY,
					RIGHT: Zt.PAN
				}, this.touches = {
					ONE: on.ROTATE,
					TWO: on.DOLLY_PAN
				}, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function () {
					return o.phi
				}, this.getAzimuthalAngle = function () {
					return o.theta
				}, this.getDistance = function () {
					return this.object.position.distanceTo(this.target)
				}, this.listenToKeyEvents = function (T) {
					T.addEventListener("keydown", C), this._domElementKeyEvents = T
				}, this.saveState = function () {
					n.target0.copy(n.target), n.position0.copy(n.object.position), n.zoom0 = n.object.zoom
				}, this.reset = function () {
					n.target.copy(n.target0), n.object.position.copy(n.position0), n.object.zoom = n.zoom0, n.object.updateProjectionMatrix(), n.dispatchEvent(_p), n.update(), s = i.NONE
				}, this.update = function () {
					let T = new A,
						V = new yt().setFromUnitVectors(e.up, new A(0, 1, 0)),
						K = V.clone().invert(),
						re = new A,
						le = new yt,
						Ee = 2 * Math.PI;
					return function () {
						let Ne = n.object.position;
						T.copy(Ne).sub(n.target), T.applyQuaternion(V), o.setFromVector3(T), n.autoRotate && s === i.NONE && I(w()), n.enableDamping ? (o.theta += l.theta * n.dampingFactor, o.phi += l.phi * n.dampingFactor) : (o.theta += l.theta, o.phi += l.phi);
						let gt = n.minAzimuthAngle,
							vt = n.maxAzimuthAngle;
						return isFinite(gt) && isFinite(vt) && (gt < -Math.PI ? gt += Ee : gt > Math.PI && (gt -= Ee), vt < -Math.PI ? vt += Ee : vt > Math.PI && (vt -= Ee), gt <= vt ? o.theta = Math.max(gt, Math.min(vt, o.theta)) : o.theta = o.theta > (gt + vt) / 2 ? Math.max(gt, o.theta) : Math.min(vt, o.theta)), o.phi = Math.max(n.minPolarAngle, Math.min(n.maxPolarAngle, o.phi)), o.makeSafe(), o.radius *= c, o.radius = Math.max(n.minDistance, Math.min(n.maxDistance, o.radius)), n.enableDamping === !0 ? n.target.addScaledVector(u, n.dampingFactor) : n.target.add(u), T.setFromSpherical(o), T.applyQuaternion(K), Ne.copy(n.target).add(T), n.object.lookAt(n.target), n.enableDamping === !0 ? (l.theta *= 1 - n.dampingFactor, l.phi *= 1 - n.dampingFactor, u.multiplyScalar(1 - n.dampingFactor)) : (l.set(0, 0, 0), u.set(0, 0, 0)), c = 1, h || re.distanceToSquared(n.object.position) > a || 8 * (1 - le.dot(n.object.quaternion)) > a ? (n.dispatchEvent(_p), re.copy(n.object.position), le.copy(n.object.quaternion), h = !1, !0) : !1
					}
				}(), this.dispose = function () {
					n.domElement.removeEventListener("contextmenu", Q), n.domElement.removeEventListener("pointerdown", te), n.domElement.removeEventListener("pointercancel", Me), n.domElement.removeEventListener("wheel", Je), n.domElement.removeEventListener("pointermove", he), n.domElement.removeEventListener("pointerup", ae), n._domElementKeyEvents !== null && n._domElementKeyEvents.removeEventListener("keydown", C)
				};
				let n = this,
					i = {
						NONE: -1,
						ROTATE: 0,
						DOLLY: 1,
						PAN: 2,
						TOUCH_ROTATE: 3,
						TOUCH_PAN: 4,
						TOUCH_DOLLY_PAN: 5,
						TOUCH_DOLLY_ROTATE: 6
					},
					s = i.NONE,
					a = 1e-6,
					o = new ua,
					l = new ua,
					c = 1,
					u = new A,
					h = !1,
					d = new O,
					f = new O,
					p = new O,
					v = new O,
					x = new O,
					g = new O,
					m = new O,
					b = new O,
					y = new O,
					E = [],
					_ = {};

				function w() {
					return 2 * Math.PI / 60 / 60 * n.autoRotateSpeed
				}

				function D() {
					return Math.pow(.95, n.zoomSpeed)
				}

				function I(T) {
					l.theta -= T
				}

				function L(T) {
					l.phi -= T
				}
				let R = function () {
					let T = new A;
					return function (K, re) {
						T.setFromMatrixColumn(re, 0), T.multiplyScalar(-K), u.add(T)
					}
				}(),
					Z = function () {
						let T = new A;
						return function (K, re) {
							n.screenSpacePanning === !0 ? T.setFromMatrixColumn(re, 1) : (T.setFromMatrixColumn(re, 0), T.crossVectors(n.object.up, T)), T.multiplyScalar(K), u.add(T)
						}
					}(),
					F = function () {
						let T = new A;
						return function (K, re) {
							let le = n.domElement;
							if (n.object.isPerspectiveCamera) {
								let Ee = n.object.position;
								T.copy(Ee).sub(n.target);
								let $e = T.length();
								$e *= Math.tan(n.object.fov / 2 * Math.PI / 180), R(2 * K * $e / le.clientHeight, n.object.matrix), Z(2 * re * $e / le.clientHeight, n.object.matrix)
							} else n.object.isOrthographicCamera ? (R(K * (n.object.right - n.object.left) / n.object.zoom / le.clientWidth, n.object.matrix), Z(re * (n.object.top - n.object.bottom) / n.object.zoom / le.clientHeight, n.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), n.enablePan = !1)
						}
					}();

				function U(T) {
					n.object.isPerspectiveCamera ? c /= T : n.object.isOrthographicCamera ? (n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom * T)), n.object.updateProjectionMatrix(), h = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), n.enableZoom = !1)
				}

				function z(T) {
					n.object.isPerspectiveCamera ? c *= T : n.object.isOrthographicCamera ? (n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / T)), n.object.updateProjectionMatrix(), h = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), n.enableZoom = !1)
				}

				function N(T) {
					d.set(T.clientX, T.clientY)
				}

				function G(T) {
					m.set(T.clientX, T.clientY)
				}

				function ne(T) {
					v.set(T.clientX, T.clientY)
				}

				function fe(T) {
					f.set(T.clientX, T.clientY), p.subVectors(f, d).multiplyScalar(n.rotateSpeed);
					let V = n.domElement;
					I(2 * Math.PI * p.x / V.clientHeight), L(2 * Math.PI * p.y / V.clientHeight), d.copy(f), n.update()
				}

				function Y(T) {
					b.set(T.clientX, T.clientY), y.subVectors(b, m), y.y > 0 ? U(D()) : y.y < 0 && z(D()), m.copy(b), n.update()
				}

				function j(T) {
					x.set(T.clientX, T.clientY), g.subVectors(x, v).multiplyScalar(n.panSpeed), F(g.x, g.y), v.copy(x), n.update()
				}

				function ue(T) {
					T.deltaY < 0 ? z(D()) : T.deltaY > 0 && U(D()), n.update()
				}

				function oe(T) {
					let V = !1;
					switch (T.code) {
						case n.keys.UP:
							F(0, n.keyPanSpeed), V = !0;
							break;
						case n.keys.BOTTOM:
							F(0, -n.keyPanSpeed), V = !0;
							break;
						case n.keys.LEFT:
							F(n.keyPanSpeed, 0), V = !0;
							break;
						case n.keys.RIGHT:
							F(-n.keyPanSpeed, 0), V = !0;
							break
					}
					V && (T.preventDefault(), n.update())
				}

				function ve() {
					if (E.length === 1) d.set(E[0].pageX, E[0].pageY);
					else {
						let T = .5 * (E[0].pageX + E[1].pageX),
							V = .5 * (E[0].pageY + E[1].pageY);
						d.set(T, V)
					}
				}

				function Oe() {
					if (E.length === 1) v.set(E[0].pageX, E[0].pageY);
					else {
						let T = .5 * (E[0].pageX + E[1].pageX),
							V = .5 * (E[0].pageY + E[1].pageY);
						v.set(T, V)
					}
				}

				function J() {
					let T = E[0].pageX - E[1].pageX,
						V = E[0].pageY - E[1].pageY,
						K = Math.sqrt(T * T + V * V);
					m.set(0, K)
				}

				function Re() {
					n.enableZoom && J(), n.enablePan && Oe()
				}

				function be() {
					n.enableZoom && J(), n.enableRotate && ve()
				}

				function xe(T) {
					if (E.length == 1) f.set(T.pageX, T.pageY);
					else {
						let K = ie(T),
							re = .5 * (T.pageX + K.x),
							le = .5 * (T.pageY + K.y);
						f.set(re, le)
					}
					p.subVectors(f, d).multiplyScalar(n.rotateSpeed);
					let V = n.domElement;
					I(2 * Math.PI * p.x / V.clientHeight), L(2 * Math.PI * p.y / V.clientHeight), d.copy(f)
				}

				function we(T) {
					if (E.length === 1) x.set(T.pageX, T.pageY);
					else {
						let V = ie(T),
							K = .5 * (T.pageX + V.x),
							re = .5 * (T.pageY + V.y);
						x.set(K, re)
					}
					g.subVectors(x, v).multiplyScalar(n.panSpeed), F(g.x, g.y), v.copy(x)
				}

				function Ue(T) {
					let V = ie(T),
						K = T.pageX - V.x,
						re = T.pageY - V.y,
						le = Math.sqrt(K * K + re * re);
					b.set(0, le), y.set(0, Math.pow(b.y / m.y, n.zoomSpeed)), U(y.y), m.copy(b)
				}

				function W(T) {
					n.enableZoom && Ue(T), n.enablePan && we(T)
				}

				function ee(T) {
					n.enableZoom && Ue(T), n.enableRotate && xe(T)
				}

				function te(T) {
					n.enabled !== !1 && (E.length === 0 && (n.domElement.setPointerCapture(T.pointerId), n.domElement.addEventListener("pointermove", he), n.domElement.addEventListener("pointerup", ae)), ye(T), T.pointerType === "touch" ? S(T) : Se(T))
				}

				function he(T) {
					n.enabled !== !1 && (T.pointerType === "touch" ? q(T) : Pe(T))
				}

				function ae(T) {
					me(T), E.length === 0 && (n.domElement.releasePointerCapture(T.pointerId), n.domElement.removeEventListener("pointermove", he), n.domElement.removeEventListener("pointerup", ae)), n.dispatchEvent(Tp), s = i.NONE
				}

				function Me(T) {
					me(T)
				}

				function Se(T) {
					let V;
					switch (T.button) {
						case 0:
							V = n.mouseButtons.LEFT;
							break;
						case 1:
							V = n.mouseButtons.MIDDLE;
							break;
						case 2:
							V = n.mouseButtons.RIGHT;
							break;
						default:
							V = -1
					}
					switch (V) {
						case Zt.DOLLY:
							if (n.enableZoom === !1) return;
							G(T), s = i.DOLLY;
							break;
						case Zt.ROTATE:
							if (T.ctrlKey || T.metaKey || T.shiftKey) {
								if (n.enablePan === !1) return;
								ne(T), s = i.PAN
							} else {
								if (n.enableRotate === !1) return;
								N(T), s = i.ROTATE
							}
							break;
						case Zt.PAN:
							if (T.ctrlKey || T.metaKey || T.shiftKey) {
								if (n.enableRotate === !1) return;
								N(T), s = i.ROTATE
							} else {
								if (n.enablePan === !1) return;
								ne(T), s = i.PAN
							}
							break;
						default:
							s = i.NONE
					}
					s !== i.NONE && n.dispatchEvent(cu)
				}

				function Pe(T) {
					if (n.enabled !== !1) switch (s) {
						case i.ROTATE:
							if (n.enableRotate === !1) return;
							fe(T);
							break;
						case i.DOLLY:
							if (n.enableZoom === !1) return;
							Y(T);
							break;
						case i.PAN:
							if (n.enablePan === !1) return;
							j(T);
							break
					}
				}

				function Je(T) {
					n.enabled === !1 || n.enableZoom === !1 || s !== i.NONE || (T.preventDefault(), n.dispatchEvent(cu), ue(T), n.dispatchEvent(Tp))
				}

				function C(T) {
					n.enabled === !1 || n.enablePan === !1 || oe(T)
				}

				function S(T) {
					switch (P(T), E.length) {
						case 1:
							switch (n.touches.ONE) {
								case on.ROTATE:
									if (n.enableRotate === !1) return;
									ve(), s = i.TOUCH_ROTATE;
									break;
								case on.PAN:
									if (n.enablePan === !1) return;
									Oe(), s = i.TOUCH_PAN;
									break;
								default:
									s = i.NONE
							}
							break;
						case 2:
							switch (n.touches.TWO) {
								case on.DOLLY_PAN:
									if (n.enableZoom === !1 && n.enablePan === !1) return;
									Re(), s = i.TOUCH_DOLLY_PAN;
									break;
								case on.DOLLY_ROTATE:
									if (n.enableZoom === !1 && n.enableRotate === !1) return;
									be(), s = i.TOUCH_DOLLY_ROTATE;
									break;
								default:
									s = i.NONE
							}
							break;
						default:
							s = i.NONE
					}
					s !== i.NONE && n.dispatchEvent(cu)
				}

				function q(T) {
					switch (P(T), s) {
						case i.TOUCH_ROTATE:
							if (n.enableRotate === !1) return;
							xe(T), n.update();
							break;
						case i.TOUCH_PAN:
							if (n.enablePan === !1) return;
							we(T), n.update();
							break;
						case i.TOUCH_DOLLY_PAN:
							if (n.enableZoom === !1 && n.enablePan === !1) return;
							W(T), n.update();
							break;
						case i.TOUCH_DOLLY_ROTATE:
							if (n.enableZoom === !1 && n.enableRotate === !1) return;
							ee(T), n.update();
							break;
						default:
							s = i.NONE
					}
				}

				function Q(T) {
					n.enabled !== !1 && T.preventDefault()
				}

				function ye(T) {
					E.push(T)
				}

				function me(T) {
					delete _[T.pointerId];
					for (let V = 0; V < E.length; V++)
						if (E[V].pointerId == T.pointerId) {
							E.splice(V, 1);
							return
						}
				}

				function P(T) {
					let V = _[T.pointerId];
					V === void 0 && (V = new O, _[T.pointerId] = V), V.set(T.pageX, T.pageY)
				}

				function ie(T) {
					let V = T.pointerId === E[0].pointerId ? E[1] : E[0];
					return _[V.pointerId]
				}
				n.domElement.addEventListener("contextmenu", Q), n.domElement.addEventListener("pointerdown", te), n.domElement.addEventListener("pointercancel", Me), n.domElement.addEventListener("wheel", Je, {
					passive: !1
				}), this.update()
			}
		};
	var Tn = 1;

	function Cp(r) {
		Tn = r
	}

	function hu() {
		return Tn
	}

	function xn(r) {
		return [r[0] * Tn, r[1] * Tn, r[2] * Tn]
	}

	function du(r, e, t) {
		return [r * Tn, e * Tn, t * Tn]
	}

	function fu(r) {
		return r.multiplyScalar(Tn)
	}

	function yn(r) {
		return Tn * r
	}
	var jo = class {
		constructor(e) {
			this.context = e, this.followMesh = void 0;
			let t = this.context.container.width,
				n = this.context.container.height,
				i = new ct(50, t / n, yn(1e-5), yn(2e3));
			this.camera = i;
			let s = this.context.simulation.getRenderer(),
				a = new uu(this.camera, s.domElement);
			a.enableDamping = !0, a.dampingFactor = .05, a.enablePan = !0, a.zoomSpeed = 1.5, a.panSpeed = 2, a.rotateSpeed = 2, a.mouseButtons = {
				LEFT: Zt.ROTATE,
				MIDDLE: Zt.DOLLY,
				RIGHT: Zt.PAN
			}, a.touches = {
				ONE: on.ROTATE,
				TWO: on.DOLLY_ROTATE
			}, this.cameraControls = a
		}
		followObject(e, t) {
			let n = e.get3jsObjects()[0];
			this.cameraControls.enablePan = !1;
			let i = xn(t);
			this.camera.position.add(new A(i[0], i[1], i[2])), this.cameraControls.update(), this.followMesh = n
		}
		stopFollowingObject() {
			this.followMesh && (this.followMesh.remove(this.camera), this.followMesh = void 0, this.cameraControls.enablePan = !0)
		}
		isFollowingObject() {
			return !!this.followMesh
		}
		get3jsCamera() {
			return this.camera
		}
		get3jsCameraControls() {
			return this.cameraControls
		}
		update() {
			if (this.isFollowingObject()) {
				let e = this.followMesh.position.clone(),
					t = e.clone().sub(this.cameraControls.target);
				this.camera.position.add(t), this.cameraControls.target.set(e.x, e.y, e.z)
			}
			this.cameraControls.update(), this.camera.updateMatrixWorld()
		}
	};
	var st = class {
		static rad(e) {
			return e * Math.PI / 180
		}
		static deg(e) {
			return e * 180 / Math.PI
		}
		static hoursToDeg(e) {
			return e * 15
		}
		static sexagesimalToDecimalRa(e, t, n) {
			return e * 15 + t / 4 + n / 240
		}
		static sexagesimalToDecimalDec(e, t, n, i = !1) {
			let s = i ? -1 : 1;
			return e + t / 60 + s * n / 3600
		}
		static valToSexagesimalRa(e) {
			let t = Math.trunc(e / 15),
				n = Math.trunc((e - t * 15) * 4),
				i = (e - t * 15 - n / 4) * 240;
			return [t, n, i]
		}
		static decimalToSexagesimalDec(e, t = !1) {
			let n = t ? -1 : 1,
				i = Math.trunc(e),
				s = Math.trunc((e - n * i) * 60 * n),
				a = (e - n * i - n * s / 60) * 3600 * n;
			return [i, s, a]
		}
		static kmToAu(e) {
			return e / 1495978707e-1
		}
		static auToKm(e) {
			return e * 1495978707e-1
		}
	};
	var pu = 2451545,
		hs = class {
			static sphericalToCartesian(e, t, n) {
				return [n * Math.cos(e) * Math.cos(t), n * Math.sin(e) * Math.cos(t), n * Math.sin(t)]
			}
			static equatorialToEcliptic_Cartesian(e, t, n, i) {
				return [e, Math.cos(i) * t + Math.sin(i) * n, -Math.sin(i) * t + Math.cos(i) * n]
			}
			static eclipticToEquatorial_Cartesian(e, t, n, i) {
				return [e, Math.cos(i) * t + -Math.sin(i) * n, Math.sin(i) * t + Math.cos(i) * n]
			}
			static getNutationAndObliquity(e = pu) {
				let t = (e - pu) / 36525,
					n = st.rad(125.04452 - 1934.136261 * t + .0020708 * t * t + (t * t + t) / 45e4),
					i = st.rad(280.4665 + 36000.7698 * t),
					s = st.rad(218.3165 + 481267.8813 * t),
					a = -17.2 / 3600 * Math.sin(n) - -1.32 / 3600 * Math.sin(2 * i) - .23 / 3600 * Math.sin(2 * s) + st.deg(.21 / 3600 * Math.sin(2 * n)),
					o = 23 + 26 / 60 + 21.448 / 3600 - 46.815 / 3600 * t - 59e-5 / 3600 * t * t + .001813 / 3600 * t * t * t,
					l = 9.2 / 3600 * Math.cos(n) + .57 / 3600 * Math.cos(2 * i) + .1 / 3600 * Math.cos(2 * s) - .09 / 3600 * Math.cos(2 * n),
					c = o + l;
				return {
					nutation: st.rad(a),
					obliquity: st.rad(c)
				}
			}
			static getObliquity(e = pu) {
				return this.getNutationAndObliquity(e).obliquity
			}
		};
	var wb = 149597870700,
		bb = 86400,
		Ab = new Set(["a", "e", "i", "q", "epoch", "period", "tp", "ma", "n", "L", "om", "w", "wBar", "GM"]),
		Eb = new Set(["i", "ma", "n", "L", "om", "w", "wBar"]),
		ds = {
			SUN: 13271244004193939e4,
			MERCURY: 2203178000000002e-2,
			VENUS: 32485859200000006e-2,
			EARTH_MOON: 4035032355022598e-1,
			MARS: 4282837521400002e-2,
			JUPITER: 126712764800000210,
			SATURN: 379405852e8,
			URANUS: 5794548600000008,
			NEPTUNE: 6836527100580024,
			PLUTO_CHARON: 9770000000000007e-4
		};

	function at(r) {
		return typeof r != "undefined" && Number.isFinite(r)
	}
	var Rt = class {
		constructor(e, t = "rad", n = !1) {
			this.attrs = {}, this.locked = !1;
			for (let i in e)
				if (e.hasOwnProperty(i)) {
					let s = Eb.has(i) ? t : null;
					this.set(i, e[i], s)
				} typeof this.attrs.GM == "undefined" && (this.attrs.GM = ds.SUN), this.fill(), this.get("e") >= .999 && typeof this.getUnsafe("tp") == "undefined" && console.warn('You must specify "tp" (time of perihelion) for highly eccentric orbits'), this.locked = n
		}
		set(e, t, n = "rad") {
			if (this.locked) throw new Error("Attempted to modify locked (immutable) Ephem object");
			return Ab.has(e) ? (n === "deg" ? this.attrs[e] = t * Math.PI / 180 : this.attrs[e] = t, !0) : (console.warn(`Invalid ephem attr: ${e}`), !1)
		}
		getUnsafe(e, t = "rad") {
			if (t === "deg") {
				let n = this.attrs[e];
				return typeof n == "undefined" ? void 0 : n * 180 / Math.PI
			}
			return this.attrs[e]
		}
		get(e, t = "rad") {
			let n = this.getUnsafe(e, t);
			if (typeof n == "undefined") throw console.info(this.attrs), new Error(`Attempted to get ephemeris value '${e}' but it was undefined`);
			return n
		}
		fill() {
			let e = this.getUnsafe("e");
			if (!at(e)) throw console.info(this.attrs), new Error('Must define eccentricity "e" in an orbit');
			let t = this.getUnsafe("a"),
				n = this.getUnsafe("q");
			if (at(t)) {
				if (!at(n)) {
					if (e >= 1) throw new Error('Must provide perihelion distance "q" if eccentricity "e" is greater than 1');
					n = t * (1 - e), this.set("q", n)
				}
			} else if (at(n)) t = n / (1 - e), this.set("a", t);
			else throw new Error('Must define semimajor axis "a" or perihelion distance "q" in an orbit');
			let i = this.getUnsafe("w"),
				s = this.getUnsafe("wBar"),
				a = this.getUnsafe("om");
			at(i) && at(a) && !at(s) ? (s = i + a, this.set("wBar", s)) : at(s) && at(a) && !at(i) ? (i = s - a, this.set("w", i)) : at(i) && at(s) && !at(a) && (a = s - i, this.set("om", a));
			let o = t * wb,
				l = this.getUnsafe("n"),
				c = this.getUnsafe("GM"),
				u = this.getUnsafe("period");
			if (!at(u) && at(t)) {
				if (!at(c)) throw new Error("Expected ephemeris attribute GM to be set");
				u = 2 * Math.PI * Math.sqrt(o * o * o / c) / bb, this.set("period", u)
			}
			if (e < 1)
				if (at(u) && !at(l)) {
					let f = 2 * Math.PI / u;
					this.set("n", f)
				} else at(l) && !at(u) && this.set("period", 2 * Math.PI / l);
			let h = this.getUnsafe("ma"),
				d = this.getUnsafe("L");
			!at(d) && at(a) && at(i) && at(h) && (d = a + i + h, this.set("L", d)), at(h) || this.set("ma", d - s)
		}
		lock() {
			this.locked = !0
		}
		copy() {
			return new Rt({
				GM: this.getUnsafe("GM"),
				epoch: this.getUnsafe("epoch"),
				a: this.getUnsafe("a"),
				e: this.getUnsafe("e"),
				i: this.getUnsafe("i"),
				om: this.getUnsafe("om"),
				ma: this.getUnsafe("ma"),
				w: this.getUnsafe("w")
			}, "rad")
		}
	};

	function Xo(r, e, t, n, i, s) {
		if (r === void 0) throw "data object is undefined";
		if (!Array.isArray(r)) throw "data object must be an array";
		if (t >= n) throw "first row must be greater than last row";
		if (t < 0) throw "first row must be greater than zero";
		if (n > r.length - 1) throw "last row must be ";
		if (!Array.isArray(r[t])) throw "data in rows must be array data";
		let a = r[0].length - 1;
		if (i < 0 || i > a) throw `xIndex has to be between 0 and ${a}: ${i}`;
		if (s < 0 || s > a) throw `yIndex has to be between 0 and ${a}: ${s}`;
		let o = 0;
		for (let l = t; l <= n; l++) {
			let c = 1;
			for (let u = t; u <= n; u++) u !== l && (c *= (e - r[u][i]) / (r[l][i] - r[u][i]));
			o += c * r[l][s]
		}
		return o
	}
	var Mb = (r, e) => r - e,
		Sb = "{{assets}}/sprites/fuzzyparticle.png";

	function da(r, e) {
		return r.replace("{{assets}}", `${e}/assets`).replace("{{data}}", `${e}/data`)
	}

	function fa(r, e) {
		return da(r || Sb, e)
	}

	function Dp(r, e) {
		let t = fa(r, e);
		return new en().load(t)
	}

	function Rp() {
		return window.location.href.indexOf("localhost") > -1 ? "/src/" : "https://typpo.github.io/spacekit/src"
	}

	function Pp(r, e, t = Mb) {
		if (r === void 0) throw "data object is undefined";
		if (!Array.isArray(r)) throw "data object must be an array";
		if (e === void 0) throw "value object must be defined";
		if (t === void 0) throw "comparer must be defined";
		let n = 0,
			i = r.length;
		for (; n <= i;) {
			let s = Math.floor((n + i) / 2);
			if (s === r.length) return s;
			let a = t(r[s], e);
			if (a < 0) n = s + 1;
			else if (a > 0) i = s - 1;
			else return s
		}
		return ~n
	}
	var Lp = 20,
		_b = (r, e) => r[0] - e,
		mu = {
			distance: "au",
			time: "day"
		},
		Tb = "cartesianposvel",
		Cb = "lagrange",
		Db = 5,
		Rb = new Set(["km", "au"]),
		Pb = new Set(["cartesianposvel"]),
		Lb = new Set(["lagrange"]),
		Ib = new Set(["day", "sec"]),
		nn = class {
			constructor(e) {
				if (this.units = JSON.parse(JSON.stringify(mu)), this.ephemType = Tb, this.interpolationType = Cb, this.interpolationOrder = Db, !e) throw new Error("EphemerisTable must be initialized with an ephemeris data structure");
				if (!e.data || !Array.isArray(e.data) || e.data.length === 0 || !Array.isArray(e.data[0])) throw new Error("EphemerisTable must be initialized with a structure containing an array of arrays of ephemeris data");
				if (this.data = JSON.parse(JSON.stringify(e.data)), e.distanceUnits) {
					if (!Rb.has(e.distanceUnits)) throw new Error(`Unknown distance units: ${e.distanceUnits}`);
					this.units.distance = e.distanceUnits
				}
				if (e.timeUnits) {
					if (!Ib.has(e.timeUnits)) throw new Error(`Unknown time units: ${e.timeUnits}`);
					this.units.time = e.timeUnits
				}
				if (e.ephemerisType) {
					if (!Pb.has(e.ephemerisType)) throw new Error(`Unknown ephemeris type: ${e.ephemerisType}`);
					this.ephemType = e.ephemerisType
				}
				if (e.interpolationType) {
					if (!Lb.has(e.interpolationType)) throw new Error(`Unknown interpolation type: ${e.interpolationType}`);
					this.interpolationType = e.interpolationType
				}
				if (e.interpolationOrder !== void 0) {
					if (e.interpolationOrder < 1 || e.interpolationOrder > Lp) throw new Error(`Interpolation order must be >0 and <${Lp}: ${e.interpolationOrder}`);
					this.interpolationOrder = e.interpolationOrder
				}
				if (this.units.distance !== mu.distance || this.units.time !== mu.time) {
					let t = this.calcDistanceMultiplier(this.units.distance),
						n = this.calcTimeMultiplier(this.units.time);
					this.data.forEach(i => {
						i[1] *= t, i[2] *= t, i[3] *= t, i[4] *= t * n, i[5] *= t * n, i[6] *= t * n
					})
				}
			}
			getPositionAtTime(e) {
				if (e <= this.data[0][0]) return [this.data[0][1], this.data[0][2], this.data[0][3]];
				let t = this.data[this.data.length - 1];
				if (e >= t[0]) return [t[1], t[2], t[3]];
				let {
					startIndex: n,
					stopIndex: i
				} = this.calcBoundingIndices(e), s = Xo(this.data, e, n, i, 0, 1), a = Xo(this.data, e, n, i, 0, 2), o = Xo(this.data, e, n, i, 0, 3);
				return [s, a, o]
			}
			getPositions(e, t, n) {
				if (e > t) throw new Error("Requested start needs to be after requested stop");
				if (n <= 0) throw new Error("Step days needs to be greater than zero");
				let i = [];
				for (let s = e; s <= t; s += n) i.push(this.getPositionAtTime(s));
				return i
			}
			calcDistanceMultiplier(e) {
				switch (e) {
					case "au":
						return 1;
					case "km":
						return st.kmToAu(1);
					default:
						throw new Error("Unknown distance unit type: " + e)
				}
			}
			calcTimeMultiplier(e) {
				switch (e) {
					case "day":
						return 1;
					case "sec":
						return 1 / 86400;
					default:
						throw new Error("Unknown time unit type: " + e)
				}
			}
			calcBoundingIndices(e) {
				let t = Math.floor(this.interpolationOrder / 2),
					n = Pp(this.data, e, _b);
				n < 0 && (n = ~n - 1);
				let i = n - t;
				i < 0 && (i = 0);
				let s = i + Number(this.interpolationOrder);
				return s >= this.data.length && (s = this.data.length - 1, this.data.length > t && (i = s - t)), {
					startIndex: i,
					stopIndex: s
				}
			}
		};
	var rn = {
		MERCURY: new Rt({
			epoch: 24584265e-1,
			a: .3870968969437096,
			e: .2056515875393916,
			i: 7.003891682749818,
			om: 48.30774804443502,
			w: 29.17940253442659,
			ma: 256.190975209273
		}, "deg", !0),
		VENUS: new Rt({
			epoch: 24584265e-1,
			a: .7233458663591554,
			e: .006762510759617694,
			i: 3.394567787211735,
			om: 76.62534150657346,
			w: 54.74567447560867,
			ma: 275.6687596099721
		}, "deg", !0),
		EARTH: new Rt({
			epoch: 2451545,
			a: 1.00000261,
			e: .01671123,
			i: -1531e-8,
			om: 0,
			wBar: 102.93768193,
			L: 100.46457166
		}, "deg", !0),
		MOON: new Rt({
			GM: 398600,
			epoch: 24586215e-1,
			a: .002582517063772124,
			e: .04582543645168888,
			i: 5.102060246928811,
			om: 108.5916732144811,
			w: 61.80561793729225,
			ma: 50.53270083636792
		}, "deg", !0),
		MARS: new Rt({
			epoch: 24584265e-1,
			a: 1.52371401537107,
			e: .09336741335309606,
			i: 1.848141099825311,
			om: 49.50420572080223,
			w: 286.6965847685386,
			ma: 25.38237617924876
		}, "deg", !0),
		JUPITER: new Rt({
			epoch: 24584265e-1,
			a: 5.20180355911023,
			e: .0489912558249006,
			i: 1.303560894624275,
			om: 100.5203828847816,
			w: 273.736301845404,
			ma: 231.939544389401
		}, "deg", !0),
		SATURN: new Rt({
			epoch: 24584265e-1,
			a: 9.577177295536776,
			e: .05101889921719987,
			i: 2.482782449972317,
			om: 113.6154964073247,
			w: 339.4422648650336,
			ma: 187.0970898012944
		}, "deg", !0),
		URANUS: new Rt({
			epoch: 24584265e-1,
			a: 19.14496966635462,
			e: .04832662948112808,
			i: .7697511134483724,
			om: 74.14239045667875,
			w: 99.42704504702185,
			ma: 220.2603033874267
		}, "deg", !0),
		NEPTUNE: new Rt({
			epoch: 24584265e-1,
			a: 30.0962226342805,
			e: .00736257118719377,
			i: 1.774569249829094,
			om: 131.8695882492132,
			w: 258.6226409499831,
			ma: 315.2804988924479
		}, "deg", !0),
		PLUTO: new Rt({
			epoch: 24540005e-1,
			a: 39.4450697257,
			e: .250248713478,
			i: 17.0890009196,
			om: 110.376957955,
			w: 112.597141677,
			ma: 25.2471897122
		}, "deg", !0)
	},
		Qo = class {
			constructor(e) {
				this._simulation = e, this._context = e.getContext(), this._satellitesByPlanet = {};
				let t = da("{{data}}/processed/natural-satellites.json", this._context.options.basePath);
				this._readyPromise = new Promise((n, i) => {
					fetch(t).then(s => s.json()).then(s => {
						s.forEach(a => {
							let o = a.Planet.toLowerCase();
							this._satellitesByPlanet[o] || (this._satellitesByPlanet[o] = []);
							let l;
							switch (a["Element Type"]) {
								case "Ecliptic":
									break;
								case "Equatorial":
									l = "equatorial";
									break;
								case "Laplace":
									l = "equatorial";
									break;
								default:
									console.warn(`Ephemeris type not yet implemented: ${l}`);
									return
							}
							let c;
							switch (a.Planet) {
								case "Earth":
									c = ds.EARTH_MOON;
									break;
								case "Pluto":
									c = ds.PLUTO_CHARON;
									break;
								default:
									c = ds[a.Planet.toUpperCase()]
							}
							c || console.error(`Could not look up GM for ${a.Planet}`);
							let u = new Rt({
								GM: c,
								epoch: Number(a["Epoch JD"]),
								a: st.kmToAu(Number(a.a)),
								e: Number(a.e),
								i: Number(a.i),
								w: Number(a.w),
								om: Number(a.node),
								ma: Number(a.M)
							}, "deg", !0);
							this._satellitesByPlanet[o].push({
								name: a["Sat."],
								elementType: a["Element Type"],
								tags: new Set(a.tags.split(",")),
								ephem: u
							})
						}), console.info("Loaded", s.length, "natural satellites"), n(this)
					}).catch(s => {
						i(s)
					})
				})
			}
			getSatellitesForPlanet(e) {
				return this._satellitesByPlanet[e.toLowerCase()]
			}
			load() {
				return this._readyPromise
			}
		};
	var Op = Uu(gu());
	var St;
	(function (s) {
		s[s.UNKNOWN = 0] = "UNKNOWN", s[s.PARABOLIC = 1] = "PARABOLIC", s[s.HYPERBOLIC = 2] = "HYPERBOLIC", s[s.ELLIPTICAL = 3] = "ELLIPTICAL", s[s.TABLE = 4] = "TABLE"
	})(St || (St = {}));
	var {
		sin: or,
		cos: Yn,
		sqrt: yi
	} = Math, qo = 10, Np = 360, Nb = {
		leadDurationYears: qo,
		trailDurationYears: qo,
		numberSamplePoints: Np
	};

	function Zo(r) {
		return Math.exp(Math.log(r) / 3)
	}
	var jn = class {
		constructor(e, t) {
			var n, i, s;
			this.ephem = e, this.options = t || {}, this.options.orbitPathSettings || (this.options.orbitPathSettings = JSON.parse(JSON.stringify(Nb))), ((n = this.options.orbitPathSettings) == null ? void 0 : n.leadDurationYears) || (this.options.orbitPathSettings.leadDurationYears = qo), ((i = this.options.orbitPathSettings) == null ? void 0 : i.trailDurationYears) || (this.options.orbitPathSettings.trailDurationYears = qo), ((s = this.options.orbitPathSettings) == null ? void 0 : s.numberSamplePoints) || (this.options.orbitPathSettings.numberSamplePoints = Np), this.orbitPoints = void 0, this.eclipticDropLines = void 0, this.orbitShape = void 0, this.orbitStart = 0, this.orbitStop = 0, this.orbitType = jn.getOrbitType(this.ephem)
		}
		getPositionAtTime(e, t = !1) {
			switch (this.orbitType) {
				case 1:
					return this.getPositionAtTimeNearParabolic(e, t);
				case 2:
					return this.getPositionAtTimeHyperbolic(e, t);
				case 3:
					return this.getPositionAtTimeElliptical(e, t);
				case 4:
					return this.getPositionAtTimeTable(e, t);
				default:
					throw new Error("No handler for this type of orbit")
			}
		}
		getPositionAtTimeParabolic(e, t = !1) {
			let n = this.ephem;
			if (n instanceof nn) throw new Error("Attempted to compute coordinates from ephemeris table");
			let i = .01720209895,
				s = n.get("q"),
				o = (e - n.get("tp")) * (i / yi(2)) / yi(s * s * s),
				l = 1.5 * o,
				c = yi(1 + l * l),
				u = Zo(c + l) - Zo(c - l),
				h = 2 * Math.atan(u),
				d = s * (1 + u * u);
			return this.vectorToHeliocentric(h, d)
		}
		getPositionAtTimeNearParabolic(e, t = !1) {
			let n = this.ephem;
			if (n instanceof nn) throw new Error("Attempted to compute coordinates from ephemeris table");
			let i = .01720209895,
				s = n.get("e"),
				a = n.get("q"),
				o = e - n.get("tp"),
				l = .75 * o * i * yi((1 + s) / (a * a * a)),
				c = yi(1 + l * l),
				u = Zo(c + l) - Zo(c - l),
				h = (1 - s) / (1 + s),
				d = 2 / 3 + 2 / 5 * u * u,
				f = 7 / 5 + 33 / 35 * u * u + 37 / 175 * Qn(u, 4),
				p = u * u * (432 / 175 + 956 / 1125 * u * u + 84 / 1575 * Qn(u, 4)),
				v = u * u / (1 + u * u),
				x = h * v * v,
				g = u * (1 + h * v * (d + f * x + p * x * x)),
				m = 2 * Math.atan(g),
				b = a * (1 + g * g) / (1 + g * g * h);
			return this.vectorToHeliocentric(m, b)
		}
		getPositionAtTimeHyperbolic(e, t = !1) {
			let n = this.ephem;
			if (n instanceof nn) throw new Error("Attempted to compute coordinates from ephemeris table");
			let i = n.get("e"),
				s = n.get("a"),
				a = n.get("ma"),
				o = n.get("n", "rad"),
				l = n.get("epoch"),
				c = e - l,
				u = a + o * c,
				h = u;
			for (let v = 0; v < 100; v++) {
				let x = (u + i * (h * Math.cosh(h) - Math.sinh(h))) / (i * Math.cosh(h) - 1),
					g = Math.abs(x - h);
				if (h = x, g < 1e-7) break
			}
			let d = h,
				f = 2 * Math.atan(yi((i + 1) / (i - 1))) * Math.tanh(d / 2),
				p = s * (1 - i * i) / (1 + i * Yn(f));
			return this.vectorToHeliocentric(f, p)
		}
		getPositionAtTimeElliptical(e, t = !1) {
			let n = this.ephem;
			if (n instanceof nn) throw new Error("Attempted to compute coordinates from ephemeris table");
			let i = n.get("e"),
				s = n.get("ma", "rad"),
				a = n.get("n", "rad"),
				o = n.get("epoch"),
				l = e - o,
				c = s + a * l;
			t && (console.info("period=", n.get("period")), console.info("n=", a), console.info("ma=", s), console.info("d=", l), console.info("M=", c));
			let u = c;
			for (let v = 0; v < 100; v++) {
				let x = c + i * or(u),
					g = Math.abs(x - u);
				if (u = x, g < 1e-7) break
			}
			let h = u,
				d = 2 * Math.atan(yi((1 + i) / (1 - i)) * Math.tan(h / 2)),
				p = n.get("a") * (1 - i * i) / (1 + i * Yn(d));
			return this.vectorToHeliocentric(d, p)
		}
		getPositionAtTimeTable(e, t = !1) {
			if (this.ephem instanceof nn) {
				let n = this.ephem.getPositionAtTime(e);
				return du(n[0], n[1], n[2])
			}
			throw new Error("Attempted to read ephemeris table of non-table data")
		}
		vectorToHeliocentric(e, t) {
			let n = this.ephem;
			if (n instanceof nn) throw new Error("Attempted to compute coordinates from ephemeris table");
			let i = n.get("i", "rad"),
				s = n.get("om", "rad"),
				a = n.get("wBar", "rad"),
				o = t * (Yn(s) * Yn(e + a - s) - or(s) * or(e + a - s) * Yn(i)),
				l = t * (or(s) * Yn(e + a - s) + Yn(s) * or(e + a - s) * Yn(i)),
				c = t * (or(e + a - s) * or(i));
			return du(o, l, c)
		}
		needsUpdateForTime(e) {
			return this.orbitType === 4 ? e < this.orbitStart || e > this.orbitStop : !1
		}
		getOrbitShape(e, t = !1) {
			if (t && (this.orbitShape && (this.orbitShape.geometry.dispose(), this.orbitShape.material.dispose()), this.orbitShape = void 0, this.orbitPoints = void 0, this.eclipticDropLines && (this.eclipticDropLines.geometry.dispose(), this.eclipticDropLines.material.dispose()), this.eclipticDropLines = void 0), this.orbitShape) return this.orbitShape;
			if (this.orbitType === 3) return this.getEllipse();
			let n;
			this.ephem instanceof nn ? n = e : n = this.ephem.getUnsafe("tp");
			let i = n || Op.default.toJulianDay(new Date),
				s = i - this.options.orbitPathSettings.trailDurationYears * 365.25,
				a = i + this.options.orbitPathSettings.leadDurationYears * 365.25,
				o = (a - s) / this.options.orbitPathSettings.numberSamplePoints;
			switch (this.orbitStart = s, this.orbitStop = a, this.orbitType) {
				case 2:
					return this.getLine(this.getPositionAtTimeHyperbolic.bind(this), s, a, o);
				case 1:
					return this.getLine(this.getPositionAtTimeNearParabolic.bind(this), s, a, o);
				case 4:
					return this.getTableOrbit(s, a, o);
				default:
					throw new Error("Unknown orbit shape")
			}
		}
		getLine(e, t, n, i) {
			let s = [];
			for (let a = t; a <= n; a += i) {
				let o = e(a);
				s.push(new A(o[0], o[1], o[2]))
			}
			return this.generateAndCacheOrbitShape(s)
		}
		getTableOrbit(e, t, n) {
			if (this.ephem instanceof Rt) throw new Error("Attempted to compute table orbit on non-table ephemeris");
			let s = this.ephem.getPositions(e, t, n).map(a => xn(a)).map(a => new A(a[0], a[1], a[2]));
			return this.generateAndCacheOrbitShape(s)
		}
		getEllipse() {
			let e = this.getEllipsePoints();
			return this.generateAndCacheOrbitShape(e)
		}
		getEllipsePoints() {
			let e = this.ephem;
			if (e instanceof nn) throw new Error("Attempted to compute coordinates from ephemeris table");
			let t = e.get("a"),
				n = e.get("e"),
				i = Math.PI * 2,
				s = i / 90;
			n > .9 && (s = i / 360);
			let a = [];
			for (let o = 0; o < i; o += s) {
				let l = 2 * Math.atan(yi((1 + n) / (1 - n)) * Math.tan(o / 2)),
					c = t * (1 - n * n) / (1 + n * Yn(l)),
					u = this.vectorToHeliocentric(l, c);
				(isNaN(u[0]) || isNaN(u[1]) || isNaN(u[2])) && (console.error("NaN position value - you may have bad or incomplete data in the following ephemeris:"), console.error(e)), a.push(new A(u[0], u[1], u[2]))
			}
			return a.push(a[0]), a
		}
		generateAndCacheOrbitShape(e) {
			return this.orbitPoints = e, this.orbitShape = new kt(new de().setFromPoints(e), new Ke({
				color: new $(this.options.color || 4473924)
			})), this.orbitShape
		}
		getLinesToEcliptic() {
			if (this.eclipticDropLines) return this.eclipticDropLines;
			this.orbitPoints || this.getOrbitShape();
			let e = this.orbitPoints || [],
				t = [];
			e.forEach((i, s) => {
				s === e.length - 1 && this.orbitType === 3 || (t.push(i), t.push(new A(i.x, i.y, 0)))
			});
			let n = new de().setFromPoints(t);
			return this.eclipticDropLines = new Mt(n, new Ke({
				color: this.options.eclipticLineColor || 3355443,
				blending: Ti
			})), this.eclipticDropLines
		}
		getHexColor() {
			return this.getOrbitShape().material.color.getHex()
		}
		setHexColor(e) {
			this.getOrbitShape().material.color = new $(e)
		}
		getVisibility() {
			return this.getOrbitShape().visible
		}
		setVisibility(e) {
			this.getOrbitShape().visible = e
		}
		static getOrbitType(e) {
			if (e instanceof nn) return 4;
			let t = e.get("e");
			return t >= .999 && t < 1.2 ? 1 : t > 1.2 ? 2 : 3
		}
	};
	var il = Uu(gu());
	var pa = function () {
		var r = 0,
			e = document.createElement("div");
		e.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", e.addEventListener("click", function (u) {
			u.preventDefault(), n(++r % e.children.length)
		}, !1);

		function t(u) {
			return e.appendChild(u.dom), u
		}

		function n(u) {
			for (var h = 0; h < e.children.length; h++) e.children[h].style.display = h === u ? "block" : "none";
			r = u
		}
		var i = (performance || Date).now(),
			s = i,
			a = 0,
			o = t(new pa.Panel("FPS", "#0ff", "#002")),
			l = t(new pa.Panel("MS", "#0f0", "#020"));
		if (self.performance && self.performance.memory) var c = t(new pa.Panel("MB", "#f08", "#201"));
		return n(0), {
			REVISION: 16,
			dom: e,
			addPanel: t,
			showPanel: n,
			begin: function () {
				i = (performance || Date).now()
			},
			end: function () {
				a++;
				var u = (performance || Date).now();
				if (l.update(u - i, 200), u >= s + 1e3 && (o.update(a * 1e3 / (u - s), 100), s = u, a = 0, c)) {
					var h = performance.memory;
					c.update(h.usedJSHeapSize / 1048576, h.jsHeapSizeLimit / 1048576)
				}
				return u
			},
			update: function () {
				i = this.end()
			},
			domElement: e,
			setMode: n
		}
	};
	pa.Panel = function (r, e, t) {
		var n = 1 / 0,
			i = 0,
			s = Math.round,
			a = s(window.devicePixelRatio || 1),
			o = 80 * a,
			l = 48 * a,
			c = 3 * a,
			u = 2 * a,
			h = 3 * a,
			d = 15 * a,
			f = 74 * a,
			p = 30 * a,
			v = document.createElement("canvas");
		v.width = o, v.height = l, v.style.cssText = "width:80px;height:48px";
		var x = v.getContext("2d");
		return x.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif", x.textBaseline = "top", x.fillStyle = t, x.fillRect(0, 0, o, l), x.fillStyle = e, x.fillText(r, c, u), x.fillRect(h, d, f, p), x.fillStyle = t, x.globalAlpha = .9, x.fillRect(h, d, f, p), {
			dom: v,
			update: function (g, m) {
				n = Math.min(n, g), i = Math.max(i, g), x.fillStyle = t, x.globalAlpha = 1, x.fillRect(0, 0, o, d), x.fillStyle = e, x.fillText(s(g) + " " + r + " (" + s(n) + "-" + s(i) + ")", c, u), x.drawImage(v, h + a, d, f - a, p, h, d, f - a, p), x.fillRect(h + f - a, d, a, p), x.fillStyle = t, x.globalAlpha = .9, x.fillRect(h + f - a, d, a, s((1 - g / m) * p))
			}
		}
	};
	var Hp = pa;
	var zp = "varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}";
	var Fe = {
		SKIP: 9,
		SET: 30,
		ADD: 0,
		ALPHA: 1,
		AVERAGE: 2,
		COLOR: 3,
		COLOR_BURN: 4,
		COLOR_DODGE: 5,
		DARKEN: 6,
		DIFFERENCE: 7,
		DIVIDE: 8,
		DST: 9,
		EXCLUSION: 10,
		HARD_LIGHT: 11,
		HARD_MIX: 12,
		HUE: 13,
		INVERT: 14,
		INVERT_RGB: 15,
		LIGHTEN: 16,
		LINEAR_BURN: 17,
		LINEAR_DODGE: 18,
		LINEAR_LIGHT: 19,
		LUMINOSITY: 20,
		MULTIPLY: 21,
		NEGATION: 22,
		NORMAL: 23,
		OVERLAY: 24,
		PIN_LIGHT: 25,
		REFLECT: 26,
		SATURATION: 27,
		SCREEN: 28,
		SOFT_LIGHT: 29,
		SRC: 30,
		SUBTRACT: 31,
		VIVID_LIGHT: 32
	};
	var lr = {
		NONE: 0,
		DEPTH: 1,
		CONVOLUTION: 2
	},
		je = {
			FRAGMENT_HEAD: "FRAGMENT_HEAD",
			FRAGMENT_MAIN_UV: "FRAGMENT_MAIN_UV",
			FRAGMENT_MAIN_IMAGE: "FRAGMENT_MAIN_IMAGE",
			VERTEX_HEAD: "VERTEX_HEAD",
			VERTEX_MAIN_SUPPORT: "VERTEX_MAIN_SUPPORT"
		};
	var vu = {
		VERY_SMALL: 0,
		SMALL: 1,
		MEDIUM: 2,
		LARGE: 3,
		VERY_LARGE: 4,
		HUGE: 5
	};
	var Hb = `#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <encodings_fragment>
}`,
		zb = "uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",
		Gb = [new Float32Array([0, 0]), new Float32Array([0, 1, 1]), new Float32Array([0, 1, 1, 2]), new Float32Array([0, 1, 2, 2, 3]), new Float32Array([0, 1, 2, 3, 4, 4, 5]), new Float32Array([0, 1, 2, 3, 4, 5, 7, 8, 9, 10])],
		kb = class extends Ye {
			constructor(r = new Ve) {
				super({
					name: "KawaseBlurMaterial",
					uniforms: {
						inputBuffer: new De(null),
						texelSize: new De(new Ve),
						scale: new De(1),
						kernel: new De(0)
					},
					blending: xt,
					depthWrite: !1,
					depthTest: !1,
					fragmentShader: Hb,
					vertexShader: zb
				});
				this.toneMapped = !1, this.setTexelSize(r.x, r.y), this.kernelSize = vu.MEDIUM
			}
			set inputBuffer(r) {
				this.uniforms.inputBuffer.value = r
			}
			setInputBuffer(r) {
				this.inputBuffer = r
			}
			get kernelSequence() {
				return Gb[this.kernelSize]
			}
			get scale() {
				return this.uniforms.scale.value
			}
			set scale(r) {
				this.uniforms.scale.value = r
			}
			getScale() {
				return this.uniforms.scale.value
			}
			setScale(r) {
				this.uniforms.scale.value = r
			}
			getKernel() {
				return null
			}
			get kernel() {
				return this.uniforms.kernel.value
			}
			set kernel(r) {
				this.uniforms.kernel.value = r
			}
			setKernel(r) {
				this.kernel = r
			}
			setTexelSize(r, e) {
				this.uniforms.texelSize.value.set(r, e, r * .5, e * .5)
			}
			setSize(r, e) {
				let t = 1 / r,
					n = 1 / e;
				this.uniforms.texelSize.value.set(t, n, t * .5, n * .5)
			}
		},
		Vb = `#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <encodings_fragment>
#include <dithering_fragment>
}`,
		Gp = class extends Ye {
			constructor() {
				super({
					name: "CopyMaterial",
					uniforms: {
						inputBuffer: new De(null),
						opacity: new De(1)
					},
					blending: xt,
					depthWrite: !1,
					depthTest: !1,
					fragmentShader: Vb,
					vertexShader: zp
				});
				this.toneMapped = !1
			}
			set inputBuffer(r) {
				this.uniforms.inputBuffer.value = r
			}
			setInputBuffer(r) {
				this.uniforms.inputBuffer.value = r
			}
			getOpacity(r) {
				return this.uniforms.opacity.value
			}
			setOpacity(r) {
				this.uniforms.opacity.value = r
			}
		};
	var Wb = `#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.0555555
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <encodings_fragment>
}`,
		Yb = "uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",
		jb = class extends Ye {
			constructor() {
				super({
					name: "DownsamplingMaterial",
					uniforms: {
						inputBuffer: new De(null),
						texelSize: new De(new O)
					},
					blending: xt,
					depthWrite: !1,
					depthTest: !1,
					fragmentShader: Wb,
					vertexShader: Yb
				});
				this.toneMapped = !1
			}
			set inputBuffer(r) {
				this.uniforms.inputBuffer.value = r
			}
			setSize(r, e) {
				this.uniforms.texelSize.value.set(1 / r, 1 / e)
			}
		};
	var Xb = `#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;
#if THREE_REVISION < 143
#define luminance(v) linearToRelativeLuminance(v)
#endif
#if THREE_REVISION >= 137
vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEADvoid main(){FRAGMENT_MAIN_UVvec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGEgl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <encodings_fragment>
#endif
#include <dithering_fragment>
}`,
		Qb = "uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEADvoid main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORTgl_Position=vec4(position.xy,1.0,1.0);}",
		qb = class extends Ye {
			constructor(r, e, t, n, i = !1) {
				super({
					name: "EffectMaterial",
					defines: {
						THREE_REVISION: bn.replace(/\D+/g, ""),
						DEPTH_PACKING: "0",
						ENCODE_OUTPUT: "1"
					},
					uniforms: {
						inputBuffer: new De(null),
						depthBuffer: new De(null),
						resolution: new De(new O),
						texelSize: new De(new O),
						cameraNear: new De(.3),
						cameraFar: new De(1e3),
						aspect: new De(1),
						time: new De(0)
					},
					blending: xt,
					depthWrite: !1,
					depthTest: !1,
					dithering: i
				});
				this.toneMapped = !1, r && this.setShaderParts(r), e && this.setDefines(e), t && this.setUniforms(t), this.copyCameraSettings(n)
			}
			set inputBuffer(r) {
				this.uniforms.inputBuffer.value = r
			}
			setInputBuffer(r) {
				this.uniforms.inputBuffer.value = r
			}
			get depthBuffer() {
				return this.uniforms.depthBuffer.value
			}
			set depthBuffer(r) {
				this.uniforms.depthBuffer.value = r
			}
			get depthPacking() {
				return Number(this.defines.DEPTH_PACKING)
			}
			set depthPacking(r) {
				this.defines.DEPTH_PACKING = r.toFixed(0), this.needsUpdate = !0
			}
			setDepthBuffer(r, e = cn) {
				this.depthBuffer = r, this.depthPacking = e
			}
			setShaderData(r) {
				this.setShaderParts(r.shaderParts), this.setDefines(r.defines), this.setUniforms(r.uniforms), this.setExtensions(r.extensions)
			}
			setShaderParts(r) {
				var e, t, n, i, s;
				return this.fragmentShader = Xb.replace(je.FRAGMENT_HEAD, (e = r.get(je.FRAGMENT_HEAD)) != null ? e : "").replace(je.FRAGMENT_MAIN_UV, (t = r.get(je.FRAGMENT_MAIN_UV)) != null ? t : "").replace(je.FRAGMENT_MAIN_IMAGE, (n = r.get(je.FRAGMENT_MAIN_IMAGE)) != null ? n : ""), this.vertexShader = Qb.replace(je.VERTEX_HEAD, (i = r.get(je.VERTEX_HEAD)) != null ? i : "").replace(je.VERTEX_MAIN_SUPPORT, (s = r.get(je.VERTEX_MAIN_SUPPORT)) != null ? s : ""), this.needsUpdate = !0, this
			}
			setDefines(r) {
				for (let e of r.entries()) this.defines[e[0]] = e[1];
				return this.needsUpdate = !0, this
			}
			setUniforms(r) {
				for (let e of r.entries()) this.uniforms[e[0]] = e[1];
				return this
			}
			setExtensions(r) {
				this.extensions = {};
				for (let e of r) this.extensions[e] = !0;
				return this
			}
			get encodeOutput() {
				return this.defines.ENCODE_OUTPUT !== void 0
			}
			set encodeOutput(r) {
				this.encodeOutput !== r && (r ? this.defines.ENCODE_OUTPUT = "1" : delete this.defines.ENCODE_OUTPUT, this.needsUpdate = !0)
			}
			isOutputEncodingEnabled(r) {
				return this.encodeOutput
			}
			setOutputEncodingEnabled(r) {
				this.encodeOutput = r
			}
			get time() {
				return this.uniforms.time.value
			}
			set time(r) {
				this.uniforms.time.value = r
			}
			setDeltaTime(r) {
				this.uniforms.time.value += r
			}
			adoptCameraSettings(r) {
				this.copyCameraSettings(r)
			}
			copyCameraSettings(r) {
				r && (this.uniforms.cameraNear.value = r.near, this.uniforms.cameraFar.value = r.far, r instanceof ct ? this.defines.PERSPECTIVE_CAMERA = "1" : delete this.defines.PERSPECTIVE_CAMERA, this.needsUpdate = !0)
			}
			setSize(r, e) {
				let t = this.uniforms;
				t.resolution.value.set(r, e), t.texelSize.value.set(1 / r, 1 / e), t.aspect.value = r / e
			}
			static get Section() {
				return je
			}
		};
	var Zb = `#include <common>
#if THREE_REVISION < 143
#define luminance(v) linearToRelativeLuminance(v)
#endif
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#ifdef RANGE
uniform vec2 range;
#elif defined(THRESHOLD)
uniform float threshold;uniform float smoothing;
#endif
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);l*=low*high;
#elif defined(THRESHOLD)
l=smoothstep(threshold,threshold+smoothing,l);
#endif
#ifdef COLOR
gl_FragColor=vec4(texel.rgb*l,l);
#else
gl_FragColor=vec4(l);
#endif
}`,
		Jb = class extends Ye {
			constructor(r = !1, e = null) {
				super({
					name: "LuminanceMaterial",
					defines: {
						THREE_REVISION: bn.replace(/\D+/g, "")
					},
					uniforms: {
						inputBuffer: new De(null),
						threshold: new De(0),
						smoothing: new De(1),
						range: new De(null)
					},
					blending: xt,
					depthWrite: !1,
					depthTest: !1,
					fragmentShader: Zb,
					vertexShader: zp
				});
				this.toneMapped = !1, this.colorOutput = r, this.luminanceRange = e
			}
			set inputBuffer(r) {
				this.uniforms.inputBuffer.value = r
			}
			setInputBuffer(r) {
				this.uniforms.inputBuffer.value = r
			}
			get threshold() {
				return this.uniforms.threshold.value
			}
			set threshold(r) {
				this.smoothing > 0 || r > 0 ? this.defines.THRESHOLD = "1" : delete this.defines.THRESHOLD, this.uniforms.threshold.value = r
			}
			getThreshold() {
				return this.threshold
			}
			setThreshold(r) {
				this.threshold = r
			}
			get smoothing() {
				return this.uniforms.smoothing.value
			}
			set smoothing(r) {
				this.threshold > 0 || r > 0 ? this.defines.THRESHOLD = "1" : delete this.defines.THRESHOLD, this.uniforms.smoothing.value = r
			}
			getSmoothingFactor() {
				return this.smoothing
			}
			setSmoothingFactor(r) {
				this.smoothing = r
			}
			get useThreshold() {
				return this.threshold > 0 || this.smoothing > 0
			}
			set useThreshold(r) { }
			get colorOutput() {
				return this.defines.COLOR !== void 0
			}
			set colorOutput(r) {
				r ? this.defines.COLOR = "1" : delete this.defines.COLOR, this.needsUpdate = !0
			}
			isColorOutputEnabled(r) {
				return this.colorOutput
			}
			setColorOutputEnabled(r) {
				this.colorOutput = r
			}
			get useRange() {
				return this.luminanceRange !== null
			}
			set useRange(r) {
				this.luminanceRange = null
			}
			get luminanceRange() {
				return this.uniforms.range.value
			}
			set luminanceRange(r) {
				r !== null ? this.defines.RANGE = "1" : delete this.defines.RANGE, this.uniforms.range.value = r, this.needsUpdate = !0
			}
			getLuminanceRange() {
				return this.luminanceRange
			}
			setLuminanceRange(r) {
				this.luminanceRange = r
			}
		};
	var Kb = `#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <encodings_fragment>
}`,
		$b = "uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",
		eA = class extends Ye {
			constructor() {
				super({
					name: "UpsamplingMaterial",
					uniforms: {
						inputBuffer: new De(null),
						supportBuffer: new De(null),
						texelSize: new De(new O),
						radius: new De(.85)
					},
					blending: xt,
					depthWrite: !1,
					depthTest: !1,
					fragmentShader: Kb,
					vertexShader: $b
				});
				this.toneMapped = !1
			}
			set inputBuffer(r) {
				this.uniforms.inputBuffer.value = r
			}
			set supportBuffer(r) {
				this.uniforms.supportBuffer.value = r
			}
			get radius() {
				return this.uniforms.radius.value
			}
			set radius(r) {
				this.uniforms.radius.value = r
			}
			setSize(r, e) {
				this.uniforms.texelSize.value.set(1 / r, 1 / e)
			}
		},
		tA = new oi,
		wi = null;

	function nA() {
		if (wi === null) {
			let r = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
				e = new Float32Array([0, 0, 2, 0, 0, 2]);
			wi = new de, wi.setAttribute !== void 0 ? (wi.setAttribute("position", new pe(r, 3)), wi.setAttribute("uv", new pe(e, 2))) : (wi.addAttribute("position", new pe(r, 3)), wi.addAttribute("uv", new pe(e, 2)))
		}
		return wi
	}
	var wn = class {
		constructor(r = "Pass", e = new mn, t = tA) {
			this.name = r, this.renderer = null, this.scene = e, this.camera = t, this.screen = null, this.rtt = !0, this.needsSwap = !0, this.needsDepthTexture = !1, this.enabled = !0
		}
		get renderToScreen() {
			return !this.rtt
		}
		set renderToScreen(r) {
			if (this.rtt === r) {
				let e = this.fullscreenMaterial;
				e !== null && (e.needsUpdate = !0), this.rtt = !r
			}
		}
		set mainScene(r) { }
		set mainCamera(r) { }
		setRenderer(r) {
			this.renderer = r
		}
		isEnabled() {
			return this.enabled
		}
		setEnabled(r) {
			this.enabled = r
		}
		get fullscreenMaterial() {
			return this.screen !== null ? this.screen.material : null
		}
		set fullscreenMaterial(r) {
			let e = this.screen;
			e !== null ? e.material = r : (e = new ze(nA(), r), e.frustumCulled = !1, this.scene === null && (this.scene = new mn), this.scene.add(e), this.screen = e)
		}
		getFullscreenMaterial() {
			return this.fullscreenMaterial
		}
		setFullscreenMaterial(r) {
			this.fullscreenMaterial = r
		}
		getDepthTexture() {
			return null
		}
		setDepthTexture(r, e = cn) { }
		render(r, e, t, n, i) {
			throw new Error("Render method not implemented!")
		}
		setSize(r, e) { }
		initialize(r, e, t) { }
		dispose() {
			for (let r of Object.keys(this)) {
				let e = this[r];
				(e instanceof We || e instanceof tt || e instanceof ot || e instanceof wn) && this[r].dispose()
			}
		}
	},
		iA = class extends wn {
			constructor(r, e = !0) {
				super("CopyPass");
				this.fullscreenMaterial = new Gp, this.needsSwap = !1, this.renderTarget = r, r === void 0 && (this.renderTarget = new We(1, 1, {
					minFilter: et,
					magFilter: et,
					stencilBuffer: !1,
					depthBuffer: !1
				}), this.renderTarget.texture.name = "CopyPass.Target"), this.autoResize = e
			}
			get resize() {
				return this.autoResize
			}
			set resize(r) {
				this.autoResize = r
			}
			get texture() {
				return this.renderTarget.texture
			}
			getTexture() {
				return this.renderTarget.texture
			}
			setAutoResizeEnabled(r) {
				this.autoResize = r
			}
			render(r, e, t, n, i) {
				this.fullscreenMaterial.inputBuffer = e.texture, r.setRenderTarget(this.renderToScreen ? null : this.renderTarget), r.render(this.scene, this.camera)
			}
			setSize(r, e) {
				this.autoResize && this.renderTarget.setSize(r, e)
			}
			initialize(r, e, t) {
				t !== void 0 && (this.renderTarget.texture.type = t, t !== lt ? this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH = "1" : r.outputEncoding === qe && (this.renderTarget.texture.encoding = qe))
			}
		};
	var rA = class extends wn {
		constructor() {
			super("ClearMaskPass", null, null);
			this.needsSwap = !1
		}
		render(r, e, t, n, i) {
			let s = r.state.buffers.stencil;
			s.setLocked(!1), s.setTest(!1)
		}
	},
		kp = new $,
		Vp = class extends wn {
			constructor(r = !0, e = !0, t = !1) {
				super("ClearPass", null, null);
				this.needsSwap = !1, this.color = r, this.depth = e, this.stencil = t, this.overrideClearColor = null, this.overrideClearAlpha = -1
			}
			setClearFlags(r, e, t) {
				this.color = r, this.depth = e, this.stencil = t
			}
			getOverrideClearColor() {
				return this.overrideClearColor
			}
			setOverrideClearColor(r) {
				this.overrideClearColor = r
			}
			getOverrideClearAlpha() {
				return this.overrideClearAlpha
			}
			setOverrideClearAlpha(r) {
				this.overrideClearAlpha = r
			}
			render(r, e, t, n, i) {
				let s = this.overrideClearColor,
					a = this.overrideClearAlpha,
					o = r.getClearAlpha(),
					l = s !== null,
					c = a >= 0;
				l ? (r.getClearColor(kp), r.setClearColor(s, c ? a : o)) : c && r.setClearAlpha(a), r.setRenderTarget(this.renderToScreen ? null : e), r.clear(this.color, this.depth, this.stencil), l ? r.setClearColor(kp, o) : c && r.setClearAlpha(o)
			}
		},
		bi = -1,
		Cn = class extends Pt {
			constructor(r, e = bi, t = bi, n = 1) {
				super();
				this.resizable = r, this.baseSize = new O(1, 1), this.preferredSize = new O(e, t), this.target = this.preferredSize, this.s = n, this.effectiveSize = new O, this.addEventListener("change", () => this.updateEffectiveSize()), this.updateEffectiveSize()
			}
			updateEffectiveSize() {
				let r = this.baseSize,
					e = this.preferredSize,
					t = this.effectiveSize,
					n = this.scale;
				e.width !== bi ? t.width = e.width : e.height !== bi ? t.width = Math.round(e.height * (r.width / Math.max(r.height, 1))) : t.width = Math.round(r.width * n), e.height !== bi ? t.height = e.height : e.width !== bi ? t.height = Math.round(e.width / Math.max(r.width / Math.max(r.height, 1), 1)) : t.height = Math.round(r.height * n)
			}
			get width() {
				return this.effectiveSize.width
			}
			set width(r) {
				this.preferredWidth = r
			}
			get height() {
				return this.effectiveSize.height
			}
			set height(r) {
				this.preferredHeight = r
			}
			getWidth() {
				return this.width
			}
			getHeight() {
				return this.height
			}
			get scale() {
				return this.s
			}
			set scale(r) {
				this.s !== r && (this.s = r, this.preferredSize.setScalar(bi), this.dispatchEvent({
					type: "change"
				}), this.resizable.setSize(this.baseSize.width, this.baseSize.height))
			}
			getScale() {
				return this.scale
			}
			setScale(r) {
				this.scale = r
			}
			get baseWidth() {
				return this.baseSize.width
			}
			set baseWidth(r) {
				this.baseSize.width !== r && (this.baseSize.width = r, this.dispatchEvent({
					type: "change"
				}), this.resizable.setSize(this.baseSize.width, this.baseSize.height))
			}
			getBaseWidth() {
				return this.baseWidth
			}
			setBaseWidth(r) {
				this.baseWidth = r
			}
			get baseHeight() {
				return this.baseSize.height
			}
			set baseHeight(r) {
				this.baseSize.height !== r && (this.baseSize.height = r, this.dispatchEvent({
					type: "change"
				}), this.resizable.setSize(this.baseSize.width, this.baseSize.height))
			}
			getBaseHeight() {
				return this.baseHeight
			}
			setBaseHeight(r) {
				this.baseHeight = r
			}
			setBaseSize(r, e) {
				(this.baseSize.width !== r || this.baseSize.height !== e) && (this.baseSize.set(r, e), this.dispatchEvent({
					type: "change"
				}), this.resizable.setSize(this.baseSize.width, this.baseSize.height))
			}
			get preferredWidth() {
				return this.preferredSize.width
			}
			set preferredWidth(r) {
				this.preferredSize.width !== r && (this.preferredSize.width = r, this.dispatchEvent({
					type: "change"
				}), this.resizable.setSize(this.baseSize.width, this.baseSize.height))
			}
			getPreferredWidth() {
				return this.preferredWidth
			}
			setPreferredWidth(r) {
				this.preferredWidth = r
			}
			get preferredHeight() {
				return this.preferredSize.height
			}
			set preferredHeight(r) {
				this.preferredSize.height !== r && (this.preferredSize.height = r, this.dispatchEvent({
					type: "change"
				}), this.resizable.setSize(this.baseSize.width, this.baseSize.height))
			}
			getPreferredHeight() {
				return this.preferredHeight
			}
			setPreferredHeight(r) {
				this.preferredHeight = r
			}
			setPreferredSize(r, e) {
				(this.preferredSize.width !== r || this.preferredSize.height !== e) && (this.preferredSize.set(r, e), this.dispatchEvent({
					type: "change"
				}), this.resizable.setSize(this.baseSize.width, this.baseSize.height))
			}
			copy(r) {
				this.s = r.scale, this.baseSize.set(r.baseWidth, r.baseHeight), this.preferredSize.set(r.preferredWidth, r.preferredHeight), this.dispatchEvent({
					type: "change"
				}), this.resizable.setSize(this.baseSize.width, this.baseSize.height)
			}
			static get AUTO_SIZE() {
				return bi
			}
		},
		xu = !1,
		Wp = class {
			constructor(r = null) {
				this.originalMaterials = new Map, this.material = null, this.materials = null, this.materialsBackSide = null, this.materialsDoubleSide = null, this.materialsFlatShaded = null, this.materialsFlatShadedBackSide = null, this.materialsFlatShadedDoubleSide = null, this.setMaterial(r), this.meshCount = 0, this.replaceMaterial = e => {
					if (e.isMesh) {
						let t;
						if (e.material.flatShading) switch (e.material.side) {
							case Ht:
								t = this.materialsFlatShadedDoubleSide;
								break;
							case Qe:
								t = this.materialsFlatShadedBackSide;
								break;
							default:
								t = this.materialsFlatShaded;
								break
						} else switch (e.material.side) {
							case Ht:
								t = this.materialsDoubleSide;
								break;
							case Qe:
								t = this.materialsBackSide;
								break;
							default:
								t = this.materials;
								break
						}
						this.originalMaterials.set(e, e.material), e.isSkinnedMesh ? e.material = t[2] : e.isInstancedMesh ? e.material = t[1] : e.material = t[0], ++this.meshCount
					}
				}
			}
			setMaterial(r) {
				if (this.disposeMaterials(), this.material = r, r !== null) {
					let e = this.materials = [r.clone(), r.clone(), r.clone()];
					for (let t of e) t.uniforms = Object.assign({}, r.uniforms), t.side = Rn;
					e[2].skinning = !0, this.materialsBackSide = e.map(t => {
						let n = t.clone();
						return n.uniforms = Object.assign({}, r.uniforms), n.side = Qe, n
					}), this.materialsDoubleSide = e.map(t => {
						let n = t.clone();
						return n.uniforms = Object.assign({}, r.uniforms), n.side = Ht, n
					}), this.materialsFlatShaded = e.map(t => {
						let n = t.clone();
						return n.uniforms = Object.assign({}, r.uniforms), n.flatShading = !0, n
					}), this.materialsFlatShadedBackSide = e.map(t => {
						let n = t.clone();
						return n.uniforms = Object.assign({}, r.uniforms), n.flatShading = !0, n.side = Qe, n
					}), this.materialsFlatShadedDoubleSide = e.map(t => {
						let n = t.clone();
						return n.uniforms = Object.assign({}, r.uniforms), n.flatShading = !0, n.side = Ht, n
					})
				}
			}
			render(r, e, t) {
				let n = r.shadowMap.enabled;
				if (r.shadowMap.enabled = !1, xu) {
					let i = this.originalMaterials;
					this.meshCount = 0, e.traverse(this.replaceMaterial), r.render(e, t);
					for (let s of i) s[0].material = s[1];
					this.meshCount !== i.size && i.clear()
				} else {
					let i = e.overrideMaterial;
					e.overrideMaterial = this.material, r.render(e, t), e.overrideMaterial = i
				}
				r.shadowMap.enabled = n
			}
			disposeMaterials() {
				if (this.material !== null) {
					let r = this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);
					for (let e of r) e.dispose()
				}
			}
			dispose() {
				this.originalMaterials.clear(), this.disposeMaterials()
			}
			static get workaroundEnabled() {
				return xu
			}
			static set workaroundEnabled(r) {
				xu = r
			}
		},
		Yp = class extends wn {
			constructor(r, e, t = null) {
				super("RenderPass", r, e);
				this.needsSwap = !1, this.clearPass = new Vp, this.overrideMaterialManager = t === null ? null : new Wp(t), this.ignoreBackground = !1, this.skipShadowMapUpdate = !1, this.selection = null
			}
			set mainScene(r) {
				this.scene = r
			}
			set mainCamera(r) {
				this.camera = r
			}
			get renderToScreen() {
				return super.renderToScreen
			}
			set renderToScreen(r) {
				super.renderToScreen = r, this.clearPass.renderToScreen = r
			}
			get overrideMaterial() {
				let r = this.overrideMaterialManager;
				return r !== null ? r.material : null
			}
			set overrideMaterial(r) {
				let e = this.overrideMaterialManager;
				r !== null ? e !== null ? e.setMaterial(r) : this.overrideMaterialManager = new Wp(r) : e !== null && (e.dispose(), this.overrideMaterialManager = null)
			}
			getOverrideMaterial() {
				return this.overrideMaterial
			}
			setOverrideMaterial(r) {
				this.overrideMaterial = r
			}
			get clear() {
				return this.clearPass.enabled
			}
			set clear(r) {
				this.clearPass.enabled = r
			}
			getSelection() {
				return this.selection
			}
			setSelection(r) {
				this.selection = r
			}
			isBackgroundDisabled() {
				return this.ignoreBackground
			}
			setBackgroundDisabled(r) {
				this.ignoreBackground = r
			}
			isShadowMapDisabled() {
				return this.skipShadowMapUpdate
			}
			setShadowMapDisabled(r) {
				this.skipShadowMapUpdate = r
			}
			getClearPass() {
				return this.clearPass
			}
			render(r, e, t, n, i) {
				let s = this.scene,
					a = this.camera,
					o = this.selection,
					l = a.layers.mask,
					c = s.background,
					u = r.shadowMap.autoUpdate,
					h = this.renderToScreen ? null : e;
				o !== null && a.layers.set(o.getLayer()), this.skipShadowMapUpdate && (r.shadowMap.autoUpdate = !1), (this.ignoreBackground || this.clearPass.overrideClearColor !== null) && (s.background = null), this.clearPass.enabled && this.clearPass.render(r, e), r.setRenderTarget(h), this.overrideMaterialManager !== null ? this.overrideMaterialManager.render(r, s, a) : r.render(s, a), a.layers.mask = l, s.background = c, r.shadowMap.autoUpdate = u
			}
		};
	var tM = new Float32Array([255 / 256 / Qn(256, 3), 255 / 256 / Qn(256, 2), 255 / 256 / 256, 255 / 256]);

	function jp(r, e, t) {
		for (let n of e) {
			let i = "$1" + r + n.charAt(0).toUpperCase() + n.slice(1),
				s = new RegExp("([^\\.])(\\b" + n + "\\b)", "g");
			for (let a of t.entries()) a[1] !== null && t.set(a[0], a[1].replace(s, i))
		}
	}

	function sA(r, e, t) {
		var n, i, s, a, o;
		let l = e.getFragmentShader(),
			c = e.getVertexShader(),
			u = l !== void 0 && /mainImage/.test(l),
			h = l !== void 0 && /mainUv/.test(l);
		if (t.attributes |= e.getAttributes(), l === void 0) throw new Error(`Missing fragment shader (${e.name})`);
		if (h && (t.attributes & lr.CONVOLUTION) != 0) throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);
		if (!u && !h) throw new Error(`Could not find mainImage or mainUv function (${e.name})`);
		{
			let d = /\w+\s+(\w+)\([\w\s,]*\)\s*{/g,
				f = t.shaderParts,
				p = (n = f.get(je.FRAGMENT_HEAD)) != null ? n : "",
				v = (i = f.get(je.FRAGMENT_MAIN_UV)) != null ? i : "",
				x = (s = f.get(je.FRAGMENT_MAIN_IMAGE)) != null ? s : "",
				g = (a = f.get(je.VERTEX_HEAD)) != null ? a : "",
				m = (o = f.get(je.VERTEX_MAIN_SUPPORT)) != null ? o : "",
				b = new Set,
				y = new Set;
			if (h && (v += `	${r}MainUv(UV);
`, t.uvTransformation = !0), c !== null && /mainSupport/.test(c)) {
				let w = /mainSupport *\([\w\s]*?uv\s*?\)/.test(c);
				m += `	${r}MainSupport(`, m += w ? `vUv);
` : `);
`;
				for (let D of c.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))
					for (let I of D[1].split(/\s*,\s*/)) t.varyings.add(I), b.add(I), y.add(I);
				for (let D of c.matchAll(d)) y.add(D[1])
			}
			for (let w of l.matchAll(d)) y.add(w[1]);
			for (let w of e.defines.keys()) y.add(w.replace(/\([\w\s,]*\)/g, ""));
			for (let w of e.uniforms.keys()) y.add(w);
			y.delete("while"), y.delete("for"), y.delete("if"), e.uniforms.forEach((w, D) => t.uniforms.set(r + D.charAt(0).toUpperCase() + D.slice(1), w)), e.defines.forEach((w, D) => t.defines.set(r + D.charAt(0).toUpperCase() + D.slice(1), w));
			let E = new Map([
				["fragment", l],
				["vertex", c]
			]);
			jp(r, y, t.defines), jp(r, y, E), l = E.get("fragment"), c = E.get("vertex");
			let _ = e.blendMode;
			if (t.blendModes.set(_.blendFunction, _), u) {
				e.inputColorSpace !== null && e.inputColorSpace !== t.colorSpace && (x += e.inputColorSpace === qe ? `color0 = LinearTosRGB(color0);
	` : `color0 = sRGBToLinear(color0);
	`), e.outputColorSpace !== null ? t.colorSpace = e.outputColorSpace : e.inputColorSpace !== null && (t.colorSpace = e.inputColorSpace);
				let w = /MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;
				x += `${r}MainImage(color0, UV, `, (t.attributes & lr.DEPTH) != 0 && w.test(l) && (x += "depth, ", t.readDepth = !0), x += `color1);
	`;
				let D = r + "BlendOpacity";
				t.uniforms.set(D, _.opacity), x += `color0 = blend${_.blendFunction}(color0, color1, ${D});

	`, p += `uniform float ${D};

`
			}
			if (p += l + `
`, c !== null && (g += c + `
`), f.set(je.FRAGMENT_HEAD, p), f.set(je.FRAGMENT_MAIN_UV, v), f.set(je.FRAGMENT_MAIN_IMAGE, x), f.set(je.VERTEX_HEAD, g), f.set(je.VERTEX_MAIN_SUPPORT, m), e.extensions !== null)
				for (let w of e.extensions) t.extensions.add(w)
		}
	}
	var Xp = class extends wn {
		constructor(r, ...e) {
			super("EffectPass");
			this.fullscreenMaterial = new qb(null, null, null, r), this.listener = t => this.handleEvent(t), this.effects = [], this.setEffects(e), this.skipRendering = !1, this.minTime = 1, this.maxTime = Number.POSITIVE_INFINITY, this.timeScale = 1
		}
		set mainScene(r) {
			for (let e of this.effects) e.mainScene = r
		}
		set mainCamera(r) {
			this.fullscreenMaterial.copyCameraSettings(r);
			for (let e of this.effects) e.mainCamera = r
		}
		get encodeOutput() {
			return this.fullscreenMaterial.encodeOutput
		}
		set encodeOutput(r) {
			this.fullscreenMaterial.encodeOutput = r
		}
		get dithering() {
			return this.fullscreenMaterial.dithering
		}
		set dithering(r) {
			let e = this.fullscreenMaterial;
			e.dithering = r, e.needsUpdate = !0
		}
		setEffects(r) {
			for (let e of this.effects) e.removeEventListener("change", this.listener);
			this.effects = r.sort((e, t) => t.attributes - e.attributes);
			for (let e of this.effects) e.addEventListener("change", this.listener)
		}
		updateMaterial() {
			let r = new dA,
				e = 0;
			for (let a of this.effects)
				if (a.blendMode.blendFunction === Fe.DST) r.attributes |= a.getAttributes() & lr.DEPTH;
				else {
					if ((r.attributes & a.getAttributes() & lr.CONVOLUTION) != 0) throw new Error(`Convolution effects cannot be merged (${a.name})`);
					sA("e" + e++, a, r)
				} let t = r.shaderParts.get(je.FRAGMENT_HEAD),
					n = r.shaderParts.get(je.FRAGMENT_MAIN_IMAGE),
					i = r.shaderParts.get(je.FRAGMENT_MAIN_UV),
					s = /\bblend\b/g;
			for (let a of r.blendModes.values()) t += a.getShaderCode().replace(s, `blend${a.blendFunction}`) + `
`;
			(r.attributes & lr.DEPTH) != 0 ? (r.readDepth && (n = `float depth = readDepth(UV);

	` + n), this.needsDepthTexture = this.getDepthTexture() === null) : this.needsDepthTexture = !1, r.colorSpace === qe && (n += `color0 = sRGBToLinear(color0);
	`), r.uvTransformation ? (i = `vec2 transformedUv = vUv;
` + i, r.defines.set("UV", "transformedUv")) : r.defines.set("UV", "vUv"), r.shaderParts.set(je.FRAGMENT_HEAD, t), r.shaderParts.set(je.FRAGMENT_MAIN_IMAGE, n), r.shaderParts.set(je.FRAGMENT_MAIN_UV, i), r.shaderParts.forEach((a, o, l) => l.set(o, a == null ? void 0 : a.trim().replace(/^#/, `
#`))), this.skipRendering = e === 0, this.needsSwap = !this.skipRendering, this.fullscreenMaterial.setShaderData(r)
		}
		recompile() {
			this.updateMaterial()
		}
		getDepthTexture() {
			return this.fullscreenMaterial.depthBuffer
		}
		setDepthTexture(r, e = cn) {
			this.fullscreenMaterial.depthBuffer = r, this.fullscreenMaterial.depthPacking = e;
			for (let t of this.effects) t.setDepthTexture(r, e)
		}
		render(r, e, t, n, i) {
			for (let s of this.effects) s.update(r, e, n);
			if (!this.skipRendering || this.renderToScreen) {
				let s = this.fullscreenMaterial;
				s.inputBuffer = e.texture, s.time += n * this.timeScale, r.setRenderTarget(this.renderToScreen ? null : t), r.render(this.scene, this.camera)
			}
		}
		setSize(r, e) {
			this.fullscreenMaterial.setSize(r, e);
			for (let t of this.effects) t.setSize(r, e)
		}
		initialize(r, e, t) {
			this.renderer = r;
			for (let n of this.effects) n.initialize(r, e, t);
			this.updateMaterial(), t !== void 0 && t !== lt && (this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH = "1")
		}
		dispose() {
			super.dispose();
			for (let r of this.effects) r.removeEventListener("change", this.listener), r.dispose()
		}
		handleEvent(r) {
			switch (r.type) {
				case "change":
					this.recompile();
					break
			}
		}
	};
	var aA = class extends wn {
		constructor({
			kernelSize: r = vu.MEDIUM,
			resolutionScale: e = .5,
			width: t = Cn.AUTO_SIZE,
			height: n = Cn.AUTO_SIZE,
			resolutionX: i = t,
			resolutionY: s = n
		} = {}) {
			super("KawaseBlurPass");
			this.renderTargetA = new We(1, 1, {
				depthBuffer: !1
			}), this.renderTargetA.texture.name = "Blur.Target.A", this.renderTargetB = this.renderTargetA.clone(), this.renderTargetB.texture.name = "Blur.Target.B";
			let a = this.resolution = new Cn(this, i, s, e);
			a.addEventListener("change", o => this.setSize(a.baseWidth, a.baseHeight)), this._blurMaterial = new kb, this._blurMaterial.kernelSize = r, this.copyMaterial = new Gp
		}
		getResolution() {
			return this.resolution
		}
		get blurMaterial() {
			return this._blurMaterial
		}
		set blurMaterial(r) {
			this._blurMaterial = r
		}
		get dithering() {
			return this.copyMaterial.dithering
		}
		set dithering(r) {
			this.copyMaterial.dithering = r
		}
		get kernelSize() {
			return this.blurMaterial.kernelSize
		}
		set kernelSize(r) {
			this.blurMaterial.kernelSize = r
		}
		get width() {
			return this.resolution.width
		}
		set width(r) {
			this.resolution.preferredWidth = r
		}
		get height() {
			return this.resolution.height
		}
		set height(r) {
			this.resolution.preferredHeight = r
		}
		get scale() {
			return this.blurMaterial.scale
		}
		set scale(r) {
			this.blurMaterial.scale = r
		}
		getScale() {
			return this.blurMaterial.scale
		}
		setScale(r) {
			this.blurMaterial.scale = r
		}
		getKernelSize() {
			return this.kernelSize
		}
		setKernelSize(r) {
			this.kernelSize = r
		}
		getResolutionScale() {
			return this.resolution.scale
		}
		setResolutionScale(r) {
			this.resolution.scale = r
		}
		render(r, e, t, n, i) {
			let s = this.scene,
				a = this.camera,
				o = this.renderTargetA,
				l = this.renderTargetB,
				c = this.blurMaterial,
				u = c.kernelSequence,
				h = e;
			this.fullscreenMaterial = c;
			for (let d = 0, f = u.length; d < f; ++d) {
				let p = (d & 1) == 0 ? o : l;
				c.kernel = u[d], c.inputBuffer = h.texture, r.setRenderTarget(p), r.render(s, a), h = p
			}
			this.fullscreenMaterial = this.copyMaterial, this.copyMaterial.inputBuffer = h.texture, r.setRenderTarget(this.renderToScreen ? null : t), r.render(s, a)
		}
		setSize(r, e) {
			let t = this.resolution;
			t.setBaseSize(r, e);
			let n = t.width,
				i = t.height;
			this.renderTargetA.setSize(n, i), this.renderTargetB.setSize(n, i), this.blurMaterial.setSize(r, e)
		}
		initialize(r, e, t) {
			t !== void 0 && (this.renderTargetA.texture.type = t, this.renderTargetB.texture.type = t, t !== lt ? (this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH = "1", this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH = "1") : r.outputEncoding === qe && (this.renderTargetA.texture.encoding = qe, this.renderTargetB.texture.encoding = qe))
		}
		static get AUTO_SIZE() {
			return Cn.AUTO_SIZE
		}
	};
	var oA = class extends wn {
		constructor({
			renderTarget: r,
			luminanceRange: e,
			colorOutput: t,
			resolutionScale: n = 1,
			width: i = Cn.AUTO_SIZE,
			height: s = Cn.AUTO_SIZE,
			resolutionX: a = i,
			resolutionY: o = s
		} = {}) {
			super("LuminancePass");
			this.fullscreenMaterial = new Jb(t, e), this.needsSwap = !1, this.renderTarget = r, this.renderTarget === void 0 && (this.renderTarget = new We(1, 1, {
				depthBuffer: !1
			}), this.renderTarget.texture.name = "LuminancePass.Target");
			let l = this.resolution = new Cn(this, a, o, n);
			l.addEventListener("change", c => this.setSize(l.baseWidth, l.baseHeight))
		}
		get texture() {
			return this.renderTarget.texture
		}
		getTexture() {
			return this.renderTarget.texture
		}
		getResolution() {
			return this.resolution
		}
		render(r, e, t, n, i) {
			let s = this.fullscreenMaterial;
			s.inputBuffer = e.texture, r.setRenderTarget(this.renderToScreen ? null : this.renderTarget), r.render(this.scene, this.camera)
		}
		setSize(r, e) {
			let t = this.resolution;
			t.setBaseSize(r, e), this.renderTarget.setSize(t.width, t.height)
		}
		initialize(r, e, t) {
			t !== void 0 && t !== lt && (this.renderTarget.texture.type = t, this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH = "1")
		}
	},
		lA = class extends wn {
			constructor(r, e) {
				super("MaskPass", r, e);
				this.needsSwap = !1, this.clearPass = new Vp(!1, !1, !0), this.inverse = !1
			}
			set mainScene(r) {
				this.scene = r
			}
			set mainCamera(r) {
				this.camera = r
			}
			get inverted() {
				return this.inverse
			}
			set inverted(r) {
				this.inverse = r
			}
			get clear() {
				return this.clearPass.enabled
			}
			set clear(r) {
				this.clearPass.enabled = r
			}
			getClearPass() {
				return this.clearPass
			}
			isInverted() {
				return this.inverted
			}
			setInverted(r) {
				this.inverted = r
			}
			render(r, e, t, n, i) {
				let s = r.getContext(),
					a = r.state.buffers,
					o = this.scene,
					l = this.camera,
					c = this.clearPass,
					u = this.inverted ? 0 : 1,
					h = 1 - u;
				a.color.setMask(!1), a.depth.setMask(!1), a.color.setLocked(!0), a.depth.setLocked(!0), a.stencil.setTest(!0), a.stencil.setOp(s.REPLACE, s.REPLACE, s.REPLACE), a.stencil.setFunc(s.ALWAYS, u, 4294967295), a.stencil.setClear(h), a.stencil.setLocked(!0), this.clearPass.enabled && (this.renderToScreen ? c.render(r, null) : (c.render(r, e), c.render(r, t))), this.renderToScreen ? (r.setRenderTarget(null), r.render(o, l)) : (r.setRenderTarget(e), r.render(o, l), r.setRenderTarget(t), r.render(o, l)), a.color.setLocked(!1), a.depth.setLocked(!1), a.stencil.setLocked(!1), a.stencil.setFunc(s.EQUAL, 1, 4294967295), a.stencil.setOp(s.KEEP, s.KEEP, s.KEEP), a.stencil.setLocked(!0)
			}
		},
		cA = class extends wn {
			constructor() {
				super("MipmapBlurPass");
				this.needsSwap = !1, this.renderTarget = new We(1, 1, {
					depthBuffer: !1
				}), this.renderTarget.texture.name = "Upsampling.Mipmap0", this.downsamplingMipmaps = [], this.upsamplingMipmaps = [], this.downsamplingMaterial = new jb, this.upsamplingMaterial = new eA, this.resolution = new O
			}
			get texture() {
				return this.renderTarget.texture
			}
			get levels() {
				return this.downsamplingMipmaps.length
			}
			set levels(r) {
				if (this.levels !== r) {
					let e = this.renderTarget;
					this.dispose(), this.downsamplingMipmaps = [], this.upsamplingMipmaps = [];
					for (let t = 0; t < r; ++t) {
						let n = e.clone();
						n.texture.name = "Downsampling.Mipmap" + t, this.downsamplingMipmaps.push(n)
					}
					this.upsamplingMipmaps.push(e);
					for (let t = 1, n = r - 1; t < n; ++t) {
						let i = e.clone();
						i.texture.name = "Upsampling.Mipmap" + t, this.upsamplingMipmaps.push(i)
					}
					this.setSize(this.resolution.x, this.resolution.y)
				}
			}
			get radius() {
				return this.upsamplingMaterial.radius
			}
			set radius(r) {
				this.upsamplingMaterial.radius = r
			}
			render(r, e, t, n, i) {
				let {
					scene: s,
					camera: a
				} = this, {
					downsamplingMaterial: o,
					upsamplingMaterial: l
				} = this, {
					downsamplingMipmaps: c,
					upsamplingMipmaps: u
				} = this, h = e;
				this.fullscreenMaterial = o;
				for (let d = 0, f = c.length; d < f; ++d) {
					let p = c[d];
					o.setSize(h.width, h.height), o.inputBuffer = h.texture, r.setRenderTarget(p), r.render(s, a), h = p
				}
				this.fullscreenMaterial = l;
				for (let d = u.length - 1; d >= 0; --d) {
					let f = u[d];
					l.setSize(h.width, h.height), l.inputBuffer = h.texture, l.supportBuffer = c[d].texture, r.setRenderTarget(f), r.render(s, a), h = f
				}
			}
			setSize(r, e) {
				let t = this.resolution;
				t.set(r, e);
				let n = t.width,
					i = t.height;
				for (let s = 0, a = this.downsamplingMipmaps.length; s < a; ++s) n = Math.round(n * .5), i = Math.round(i * .5), this.downsamplingMipmaps[s].setSize(n, i), s < this.upsamplingMipmaps.length && this.upsamplingMipmaps[s].setSize(n, i)
			}
			initialize(r, e, t) {
				if (t !== void 0) {
					let n = this.downsamplingMipmaps.concat(this.upsamplingMipmaps);
					for (let i of n) i.texture.type = t;
					if (t !== lt) this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH = "1", this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH = "1";
					else if (r.outputEncoding === qe)
						for (let i of n) i.texture.encoding = qe
				}
			}
			dispose() {
				super.dispose();
				for (let r of this.downsamplingMipmaps.concat(this.upsamplingMipmaps)) r.dispose()
			}
		};
	var yu = 1 / 1e3,
		uA = 1e3,
		hA = class {
			constructor() {
				this.previousTime = 0, this.currentTime = 0, this.delta = 0, this.fixedDelta = 1e3 / 60, this.elapsed = 0, this.timescale = 1, this.fixedDeltaEnabled = !1, this.autoReset = !1
			}
			setFixedDeltaEnabled(r) {
				return this.fixedDeltaEnabled = r, this
			}
			isAutoResetEnabled(r) {
				return this.autoReset
			}
			setAutoResetEnabled(r) {
				return typeof document != "undefined" && document.hidden !== void 0 && (r ? document.addEventListener("visibilitychange", this) : document.removeEventListener("visibilitychange", this), this.autoReset = r), this
			}
			getDelta() {
				return this.delta * yu
			}
			getFixedDelta() {
				return this.fixedDelta * yu
			}
			setFixedDelta(r) {
				return this.fixedDelta = r * uA, this
			}
			getElapsed() {
				return this.elapsed * yu
			}
			getTimescale() {
				return this.timescale
			}
			setTimescale(r) {
				return this.timescale = r, this
			}
			update(r) {
				return this.fixedDeltaEnabled ? this.delta = this.fixedDelta : (this.previousTime = this.currentTime, this.currentTime = r !== void 0 ? r : performance.now(), this.delta = this.currentTime - this.previousTime), this.delta *= this.timescale, this.elapsed += this.delta, this
			}
			reset() {
				return this.delta = 0, this.elapsed = 0, this.currentTime = performance.now(), this
			}
			handleEvent(r) {
				document.hidden || (this.currentTime = performance.now())
			}
			dispose() {
				this.setAutoResetEnabled(!1)
			}
		},
		Qp = class {
			constructor(r = null, {
				depthBuffer: e = !0,
				stencilBuffer: t = !1,
				multisampling: n = 0,
				frameBufferType: i
			} = {}) {
				this.renderer = null, this.inputBuffer = this.createBuffer(e, t, i, n), this.outputBuffer = this.inputBuffer.clone(), this.copyPass = new iA, this.depthTexture = null, this.passes = [], this.timer = new hA, this.autoRenderToScreen = !0, this.setRenderer(r)
			}
			get multisampling() {
				return this.inputBuffer.samples || 0
			}
			set multisampling(r) {
				let e = this.inputBuffer,
					t = this.multisampling;
				t > 0 && r > 0 ? (this.inputBuffer.samples = r, this.outputBuffer.samples = r, this.inputBuffer.dispose(), this.outputBuffer.dispose()) : t !== r && (this.inputBuffer.dispose(), this.outputBuffer.dispose(), this.inputBuffer = this.createBuffer(e.depthBuffer, e.stencilBuffer, e.texture.type, r), this.inputBuffer.depthTexture = this.depthTexture, this.outputBuffer = this.inputBuffer.clone())
			}
			getTimer() {
				return this.timer
			}
			getRenderer() {
				return this.renderer
			}
			setRenderer(r) {
				if (this.renderer = r, r !== null) {
					let e = r.getSize(new O),
						t = r.getContext().getContextAttributes().alpha,
						n = this.inputBuffer.texture.type;
					n === lt && r.outputEncoding === qe && (this.inputBuffer.texture.encoding = qe, this.outputBuffer.texture.encoding = qe, this.inputBuffer.dispose(), this.outputBuffer.dispose()), r.autoClear = !1, this.setSize(e.width, e.height);
					for (let i of this.passes) i.initialize(r, t, n)
				}
			}
			replaceRenderer(r, e = !0) {
				let t = this.renderer,
					n = t.domElement.parentNode;
				return this.setRenderer(r), e && n !== null && (n.removeChild(t.domElement), n.appendChild(r.domElement)), t
			}
			createDepthTexture() {
				let r = this.depthTexture = new ui;
				return this.inputBuffer.depthTexture = r, this.inputBuffer.dispose(), this.inputBuffer.stencilBuffer ? (r.format = Ln, r.type = Pn) : r.type = Li, r
			}
			deleteDepthTexture() {
				if (this.depthTexture !== null) {
					this.depthTexture.dispose(), this.depthTexture = null, this.inputBuffer.depthTexture = null, this.inputBuffer.dispose();
					for (let r of this.passes) r.setDepthTexture(null)
				}
			}
			createBuffer(r, e, t, n) {
				let i = this.renderer,
					s = i === null ? new O : i.getDrawingBufferSize(new O),
					a = {
						minFilter: et,
						magFilter: et,
						stencilBuffer: e,
						depthBuffer: r,
						type: t
					},
					o;
				return n > 0 ? (o = Number(bn.replace(/\D+/g, "")) < 138 ? new Ni(s.width, s.height, a) : new We(s.width, s.height, a), o.ignoreDepthForMultisampleCopy = !1, o.samples = n) : o = new We(s.width, s.height, a), t === lt && i !== null && i.outputEncoding === qe && (o.texture.encoding = qe), o.texture.name = "EffectComposer.Buffer", o.texture.generateMipmaps = !1, o
			}
			setMainScene(r) {
				for (let e of this.passes) e.mainScene = r
			}
			setMainCamera(r) {
				for (let e of this.passes) e.mainCamera = r
			}
			addPass(r, e) {
				let t = this.passes,
					n = this.renderer,
					i = n.getDrawingBufferSize(new O),
					s = n.getContext().getContextAttributes().alpha,
					a = this.inputBuffer.texture.type;
				if (r.setRenderer(n), r.setSize(i.width, i.height), r.initialize(n, s, a), this.autoRenderToScreen && (t.length > 0 && (t[t.length - 1].renderToScreen = !1), r.renderToScreen && (this.autoRenderToScreen = !1)), e !== void 0 ? t.splice(e, 0, r) : t.push(r), this.autoRenderToScreen && (t[t.length - 1].renderToScreen = !0), r.needsDepthTexture || this.depthTexture !== null)
					if (this.depthTexture === null) {
						let o = this.createDepthTexture();
						for (r of t) r.setDepthTexture(o)
					} else r.setDepthTexture(this.depthTexture)
			}
			removePass(r) {
				let e = this.passes,
					t = e.indexOf(r);
				if (t !== -1 && e.splice(t, 1).length > 0) {
					if (this.depthTexture !== null) {
						let s = (o, l) => o || l.needsDepthTexture;
						e.reduce(s, !1) || (r.getDepthTexture() === this.depthTexture && r.setDepthTexture(null), this.deleteDepthTexture())
					}
					this.autoRenderToScreen && t === e.length && (r.renderToScreen = !1, e.length > 0 && (e[e.length - 1].renderToScreen = !0))
				}
			}
			removeAllPasses() {
				let r = this.passes;
				this.deleteDepthTexture(), r.length > 0 && (this.autoRenderToScreen && (r[r.length - 1].renderToScreen = !1), this.passes = [])
			}
			render(r) {
				let e = this.renderer,
					t = this.copyPass,
					n = this.inputBuffer,
					i = this.outputBuffer,
					s = !1,
					a, o, l;
				r === void 0 && (r = this.timer.update().getDelta());
				for (let c of this.passes) c.enabled && (c.render(e, n, i, r, s), c.needsSwap && (s && (t.renderToScreen = c.renderToScreen, a = e.getContext(), o = e.state.buffers.stencil, o.setFunc(a.NOTEQUAL, 1, 4294967295), t.render(e, n, i, r, s), o.setFunc(a.EQUAL, 1, 4294967295)), l = n, n = i, i = l), c instanceof lA ? s = !0 : c instanceof rA && (s = !1))
			}
			setSize(r, e, t) {
				let n = this.renderer,
					i = n.getSize(new O);
				(r === void 0 || e === void 0) && (r = i.width, e = i.height), (i.width !== r || i.height !== e) && n.setSize(r, e, t);
				let s = n.getDrawingBufferSize(new O);
				this.inputBuffer.setSize(s.width, s.height), this.outputBuffer.setSize(s.width, s.height);
				for (let a of this.passes) a.setSize(s.width, s.height)
			}
			reset() {
				let r = this.timer.isAutoResetEnabled();
				this.dispose(), this.autoRenderToScreen = !0, this.timer.setAutoResetEnabled(r)
			}
			dispose() {
				for (let r of this.passes) r.dispose();
				this.passes = [], this.inputBuffer !== null && this.inputBuffer.dispose(), this.outputBuffer !== null && this.outputBuffer.dispose(), this.deleteDepthTexture(), this.copyPass.dispose(), this.timer.dispose()
			}
		},
		dA = class {
			constructor() {
				this.shaderParts = new Map([
					[je.FRAGMENT_HEAD, null],
					[je.FRAGMENT_MAIN_UV, null],
					[je.FRAGMENT_MAIN_IMAGE, null],
					[je.VERTEX_HEAD, null],
					[je.VERTEX_MAIN_SUPPORT, null]
				]), this.defines = new Map, this.uniforms = new Map, this.blendModes = new Map, this.extensions = new Set, this.attributes = lr.NONE, this.varyings = new Set, this.uvTransformation = !1, this.readDepth = !1, this.colorSpace = ft
			}
		};
	var fA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y,opacity);}",
		pA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,min(y.a,opacity));}",
		mA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y)*0.5,opacity);}",
		gA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.rg,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",
		vA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(step(0.0,y)*(1.0-min(vec4(1.0),(1.0-x)/y)),vec4(1.0),step(1.0,x));return mix(x,z,opacity);}",
		xA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=step(0.0,x)*mix(min(vec4(1.0),x/max(1.0-y,1e-9)),vec4(1.0),step(1.0,y));return mix(x,z,opacity);}",
		yA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x,y),opacity);}",
		wA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,abs(x-y),opacity);}",
		bA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x/max(y,1e-12),opacity);}",
		AA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y-2.0*x*y),opacity);}",
		EA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 a=min(x,1.0),b=min(y,1.0);vec4 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,y));return mix(x,z,opacity);}",
		MA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,step(1.0,x+y),opacity);}",
		SA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.r,xHSL.gb));return vec4(mix(x.rgb,z,opacity),y.a);}",
		_A = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-y,opacity);}",
		TA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y*(1.0-x),opacity);}",
		CA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x,y),opacity);}",
		DA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(y+x-1.0,0.0,1.0),opacity);}",
		RA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x+y,1.0),opacity);}",
		PA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(2.0*y+x-1.0,0.0,1.0),opacity);}",
		LA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.rg,yHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",
		IA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x*y,opacity);}",
		BA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-abs(1.0-x-y),opacity);}",
		UA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,opacity);}",
		FA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(2.0*y*x,1.0-2.0*(1.0-y)*(1.0-x),step(0.5,x));return mix(x,z,opacity);}",
		OA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 z=mix(mix(y2,x,step(0.5*x,y)),max(vec4(0.0),y2-1.0),step(x,(y2-1.0)));return mix(x,z,opacity);}",
		NA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(min(x*x/max(1.0-y,1e-12),1.0),y,step(1.0,y));return mix(x,z,opacity);}",
		HA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.r,yHSL.g,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",
		zA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y-min(x*y,1.0),opacity);}",
		GA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 w=step(0.5,y);vec4 z=mix(x-(1.0-y2)*x*(1.0-x),mix(x+(y2-1.0)*(sqrt(x)-x),x+(y2-1.0)*x*((16.0*x-12.0)*x+3.0),w*(1.0-step(0.25,x))),w);return mix(x,z,opacity);}",
		kA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}",
		VA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x+y-1.0,0.0),opacity);}",
		WA = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(max(1.0-min((1.0-x)/(2.0*y),1.0),0.0),min(x/(2.0*(1.0-y)),1.0),step(0.5,y));return mix(x,z,opacity);}",
		YA = new Map([
			[Fe.ADD, fA],
			[Fe.ALPHA, pA],
			[Fe.AVERAGE, mA],
			[Fe.COLOR, gA],
			[Fe.COLOR_BURN, vA],
			[Fe.COLOR_DODGE, xA],
			[Fe.DARKEN, yA],
			[Fe.DIFFERENCE, wA],
			[Fe.DIVIDE, bA],
			[Fe.DST, null],
			[Fe.EXCLUSION, AA],
			[Fe.HARD_LIGHT, EA],
			[Fe.HARD_MIX, MA],
			[Fe.HUE, SA],
			[Fe.INVERT, _A],
			[Fe.INVERT_RGB, TA],
			[Fe.LIGHTEN, CA],
			[Fe.LINEAR_BURN, DA],
			[Fe.LINEAR_DODGE, RA],
			[Fe.LINEAR_LIGHT, PA],
			[Fe.LUMINOSITY, LA],
			[Fe.MULTIPLY, IA],
			[Fe.NEGATION, BA],
			[Fe.NORMAL, UA],
			[Fe.OVERLAY, FA],
			[Fe.PIN_LIGHT, OA],
			[Fe.REFLECT, NA],
			[Fe.SATURATION, HA],
			[Fe.SCREEN, zA],
			[Fe.SOFT_LIGHT, GA],
			[Fe.SRC, kA],
			[Fe.SUBTRACT, VA],
			[Fe.VIVID_LIGHT, WA]
		]),
		jA = class extends Pt {
			constructor(r, e = 1) {
				super();
				this._blendFunction = r, this.opacity = new De(e)
			}
			getOpacity() {
				return this.opacity.value
			}
			setOpacity(r) {
				this.opacity.value = r
			}
			get blendFunction() {
				return this._blendFunction
			}
			set blendFunction(r) {
				this._blendFunction = r, this.dispatchEvent({
					type: "change"
				})
			}
			getBlendFunction() {
				return this.blendFunction
			}
			setBlendFunction(r) {
				this.blendFunction = r
			}
			getShaderCode() {
				return YA.get(this.blendFunction)
			}
		},
		XA = class extends Pt {
			constructor(r, e, {
				attributes: t = lr.NONE,
				blendFunction: n = Fe.NORMAL,
				defines: i = new Map,
				uniforms: s = new Map,
				extensions: a = null,
				vertexShader: o = null
			} = {}) {
				super();
				this.name = r, this.renderer = null, this.attributes = t, this.fragmentShader = e, this.vertexShader = o, this.defines = i, this.uniforms = s, this.extensions = a, this.blendMode = new jA(n), this.blendMode.addEventListener("change", l => this.setChanged()), this._inputColorSpace = ft, this._outputColorSpace = null
			}
			get inputColorSpace() {
				return this._inputColorSpace
			}
			set inputColorSpace(r) {
				this._inputColorSpace = r, this.setChanged()
			}
			get outputColorSpace() {
				return this._outputColorSpace
			}
			set outputColorSpace(r) {
				this._outputColorSpace = r, this.setChanged()
			}
			set mainScene(r) { }
			set mainCamera(r) { }
			getName() {
				return this.name
			}
			setRenderer(r) {
				this.renderer = r
			}
			getDefines() {
				return this.defines
			}
			getUniforms() {
				return this.uniforms
			}
			getExtensions() {
				return this.extensions
			}
			getBlendMode() {
				return this.blendMode
			}
			getAttributes() {
				return this.attributes
			}
			setAttributes(r) {
				this.attributes = r, this.setChanged()
			}
			getFragmentShader() {
				return this.fragmentShader
			}
			setFragmentShader(r) {
				this.fragmentShader = r, this.setChanged()
			}
			getVertexShader() {
				return this.vertexShader
			}
			setVertexShader(r) {
				this.vertexShader = r, this.setChanged()
			}
			setChanged() {
				this.dispatchEvent({
					type: "change"
				})
			}
			setDepthTexture(r, e = cn) { }
			update(r, e, t) { }
			setSize(r, e) { }
			initialize(r, e, t) { }
			dispose() {
				for (let r of Object.keys(this)) {
					let e = this[r];
					(e instanceof We || e instanceof tt || e instanceof ot || e instanceof wn) && this[r].dispose()
				}
			}
		},
		QA = `#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=texture2D(map,uv)*intensity;}`,
		qp = class extends XA {
			constructor({
				blendFunction: r = Fe.SCREEN,
				luminanceThreshold: e = .9,
				luminanceSmoothing: t = .025,
				mipmapBlur: n = !1,
				intensity: i = 1,
				radius: s = .85,
				levels: a = 8,
				kernelSize: o = vu.LARGE,
				resolutionScale: l = .5,
				width: c = Cn.AUTO_SIZE,
				height: u = Cn.AUTO_SIZE,
				resolutionX: h = c,
				resolutionY: d = u
			} = {}) {
				super("BloomEffect", QA, {
					blendFunction: r,
					uniforms: new Map([
						["map", new De(null)],
						["intensity", new De(i)]
					])
				});
				this.renderTarget = new We(1, 1, {
					depthBuffer: !1
				}), this.renderTarget.texture.name = "Bloom.Target", this.blurPass = new aA({
					kernelSize: o
				}), this.luminancePass = new oA({
					colorOutput: !0
				}), this.luminanceMaterial.threshold = e, this.luminanceMaterial.smoothing = t, this.mipmapBlurPass = new cA, this.mipmapBlurPass.enabled = n, this.mipmapBlurPass.radius = s, this.mipmapBlurPass.levels = a, this.uniforms.get("map").value = n ? this.mipmapBlurPass.texture : this.renderTarget.texture;
				let f = this.resolution = new Cn(this, h, d, l);
				f.addEventListener("change", p => this.setSize(f.baseWidth, f.baseHeight))
			}
			get texture() {
				return this.mipmapBlurPass.enabled ? this.mipmapBlurPass.texture : this.renderTarget.texture
			}
			getTexture() {
				return this.texture
			}
			getResolution() {
				return this.resolution
			}
			getBlurPass() {
				return this.blurPass
			}
			getLuminancePass() {
				return this.luminancePass
			}
			get luminanceMaterial() {
				return this.luminancePass.fullscreenMaterial
			}
			getLuminanceMaterial() {
				return this.luminancePass.fullscreenMaterial
			}
			get width() {
				return this.resolution.width
			}
			set width(r) {
				this.resolution.preferredWidth = r
			}
			get height() {
				return this.resolution.height
			}
			set height(r) {
				this.resolution.preferredHeight = r
			}
			get dithering() {
				return this.blurPass.dithering
			}
			set dithering(r) {
				this.blurPass.dithering = r
			}
			get kernelSize() {
				return this.blurPass.kernelSize
			}
			set kernelSize(r) {
				this.blurPass.kernelSize = r
			}
			get distinction() {
				return console.warn(this.name, "distinction was removed"), 1
			}
			set distinction(r) {
				console.warn(this.name, "distinction was removed")
			}
			get intensity() {
				return this.uniforms.get("intensity").value
			}
			set intensity(r) {
				this.uniforms.get("intensity").value = r
			}
			getIntensity() {
				return this.intensity
			}
			setIntensity(r) {
				this.intensity = r
			}
			getResolutionScale() {
				return this.resolution.scale
			}
			setResolutionScale(r) {
				this.resolution.scale = r
			}
			update(r, e, t) {
				let n = this.renderTarget,
					i = this.luminancePass;
				i.enabled ? (i.render(r, e), this.mipmapBlurPass.enabled ? this.mipmapBlurPass.render(r, i.renderTarget) : this.blurPass.render(r, i.renderTarget, n)) : this.mipmapBlurPass.enabled ? this.mipmapBlurPass.render(r, e) : this.blurPass.render(r, e, n)
			}
			setSize(r, e) {
				let t = this.resolution;
				t.setBaseSize(r, e), this.renderTarget.setSize(t.width, t.height), this.blurPass.resolution.copy(t), this.luminancePass.setSize(r, e), this.mipmapBlurPass.setSize(r, e)
			}
			initialize(r, e, t) {
				this.blurPass.initialize(r, e, t), this.luminancePass.initialize(r, e, t), this.mipmapBlurPass.initialize(r, e, t), t !== void 0 && (this.renderTarget.texture.type = t, r.outputEncoding === qe && (this.renderTarget.texture.encoding = qe))
			}
		};
	var hM = new A,
		dM = new ge;
	var pM = new $;
	var mM = [new Float32Array(3), new Float32Array(3)],
		gM = [new Float32Array(3), new Float32Array(3), new Float32Array(3), new Float32Array(3)],
		vM = [
			[new Float32Array([0, 0, 0]), new Float32Array([1, 0, 0]), new Float32Array([1, 1, 0]), new Float32Array([1, 1, 1])],
			[new Float32Array([0, 0, 0]), new Float32Array([1, 0, 0]), new Float32Array([1, 0, 1]), new Float32Array([1, 1, 1])],
			[new Float32Array([0, 0, 0]), new Float32Array([0, 0, 1]), new Float32Array([1, 0, 1]), new Float32Array([1, 1, 1])],
			[new Float32Array([0, 0, 0]), new Float32Array([0, 1, 0]), new Float32Array([1, 1, 0]), new Float32Array([1, 1, 1])],
			[new Float32Array([0, 0, 0]), new Float32Array([0, 1, 0]), new Float32Array([0, 1, 1]), new Float32Array([1, 1, 1])],
			[new Float32Array([0, 0, 0]), new Float32Array([0, 0, 1]), new Float32Array([0, 1, 1]), new Float32Array([1, 1, 1])]
		];
	var xM = [new Float32Array(2), new Float32Array(2)];
	var yM = new Float32Array([0, -.25, .25, -.125, .125, -.375, .375]),
		wM = [new Float32Array([0, 0]), new Float32Array([.25, -.25]), new Float32Array([-.25, .25]), new Float32Array([.125, -.125]), new Float32Array([-.125, .125])],
		bM = [new Uint8Array([0, 0]), new Uint8Array([3, 0]), new Uint8Array([0, 3]), new Uint8Array([3, 3]), new Uint8Array([1, 0]), new Uint8Array([4, 0]), new Uint8Array([1, 3]), new Uint8Array([4, 3]), new Uint8Array([0, 1]), new Uint8Array([3, 1]), new Uint8Array([0, 4]), new Uint8Array([3, 4]), new Uint8Array([1, 1]), new Uint8Array([4, 1]), new Uint8Array([1, 4]), new Uint8Array([4, 4])],
		AM = [new Uint8Array([0, 0]), new Uint8Array([1, 0]), new Uint8Array([0, 2]), new Uint8Array([1, 2]), new Uint8Array([2, 0]), new Uint8Array([3, 0]), new Uint8Array([2, 2]), new Uint8Array([3, 2]), new Uint8Array([0, 1]), new Uint8Array([1, 1]), new Uint8Array([0, 3]), new Uint8Array([1, 3]), new Uint8Array([2, 1]), new Uint8Array([3, 1]), new Uint8Array([2, 3]), new Uint8Array([3, 3])];
	var EM = new Map([
		[Nt(0, 0, 0, 0), new Float32Array([0, 0, 0, 0])],
		[Nt(0, 0, 0, 1), new Float32Array([0, 0, 0, 1])],
		[Nt(0, 0, 1, 0), new Float32Array([0, 0, 1, 0])],
		[Nt(0, 0, 1, 1), new Float32Array([0, 0, 1, 1])],
		[Nt(0, 1, 0, 0), new Float32Array([0, 1, 0, 0])],
		[Nt(0, 1, 0, 1), new Float32Array([0, 1, 0, 1])],
		[Nt(0, 1, 1, 0), new Float32Array([0, 1, 1, 0])],
		[Nt(0, 1, 1, 1), new Float32Array([0, 1, 1, 1])],
		[Nt(1, 0, 0, 0), new Float32Array([1, 0, 0, 0])],
		[Nt(1, 0, 0, 1), new Float32Array([1, 0, 0, 1])],
		[Nt(1, 0, 1, 0), new Float32Array([1, 0, 1, 0])],
		[Nt(1, 0, 1, 1), new Float32Array([1, 0, 1, 1])],
		[Nt(1, 1, 0, 0), new Float32Array([1, 1, 0, 0])],
		[Nt(1, 1, 0, 1), new Float32Array([1, 1, 0, 1])],
		[Nt(1, 1, 1, 0), new Float32Array([1, 1, 1, 0])],
		[Nt(1, 1, 1, 1), new Float32Array([1, 1, 1, 1])]
	]);

	function wu(r, e, t) {
		return r + (e - r) * t
	}

	function Nt(r, e, t, n) {
		let i = wu(r, e, 1 - .25),
			s = wu(t, n, 1 - .25);
		return wu(i, s, 1 - .125)
	}
	var SM = Math.PI * .5,
		_M = new A,
		TM = new A;

	function Zp() {
		return `
    varying vec3 vColor;
    uniform sampler2D texture;

    void main() {
      gl_FragColor = vec4(vColor, 1.0) * texture2D(texture, gl_PointCoord);
    }
  `
	}

	function Jp() {
		return `
    attribute vec3 fuzzColor;
    attribute vec3 origin;
    varying vec3 vColor;

    attribute float size;

    attribute float a;
    attribute float e;
    attribute float i;
    attribute float om;
    attribute float wBar;
    attribute float M;

    // Perihelion distance
    attribute float q;

    // CPU-computed term for parabolic orbits
    attribute float a0;

    // COSH Function (Hyperbolic Cosine)
    float cosh(float val) {
      float tmp = exp(val);
      float cosH = (tmp + 1.0 / tmp) / 2.0;
      return cosH;
    }

    // TANH Function (Hyperbolic Tangent)
    float tanh(float val) {
      float tmp = exp(val);
      float tanH = (tmp - 1.0 / tmp) / (tmp + 1.0 / tmp);
      return tanH;
    }

    // SINH Function (Hyperbolic Sine)
    float sinh(float val) {
      float tmp = exp(val);
      float sinH = (tmp - 1.0 / tmp) / 2.0;
      return sinH;
    }

    // Cube root helper that assumes param is positive
    float cbrt(float x) {
      return exp(log(x) / 3.0);
    }

    vec3 getPosNearParabolic() {
      // See https://stjarnhimlen.se/comp/ppcomp.html#17
      float b = sqrt(1.0 + a0 * a0);
      float W = cbrt(b + a0) - cbrt(b - a0);
      float f = (1.0 - e) / (1.0 + e);

      float a1 = 2.0 / 3.0 + (2.0 / 5.0) * W * W;
      float a2 = 7.0 / 5.0 + (33.0 / 35.0) * W * W + (37.0 / 175.0) * pow(W, 4.0);
      float a3 =
        W * W * (432.0 / 175.0 + (956.0 / 1125.0) * W * W + (84.0 / 1575.0) * pow(W, 4.0));

      float C = (W * W) / (1.0 + W * W);
      float g = f * C * C;
      float w = W * (1.0 + f * C * (a1 + a2 * g + a3 * g * g));

      // True anomaly
      float v = 2.0 * atan(w);
      // Heliocentric distance
      float r = (q * (1.0 + w * w)) / (1.0 + w * w * f);

      // Compute heliocentric coords.
      float i_rad = i;
      float o_rad = om;
      float p_rad = wBar;
      float X = r * (cos(o_rad) * cos(v + p_rad - o_rad) - sin(o_rad) * sin(v + p_rad - o_rad) * cos(i_rad));
      float Y = r * (sin(o_rad) * cos(v + p_rad - o_rad) + cos(o_rad) * sin(v + p_rad - o_rad) * cos(i_rad));
      float Z = r * (sin(v + p_rad - o_rad) * sin(i_rad));
      return vec3(X, Y, Z);
    }

    vec3 getPosHyperbolic() {
      float F0 = M;
      for (int count = 0; count < 100; count++) {
        float F1 = (M + e * (F0 * cosh(F0) - sinh(F0))) / (e * cosh(F0) - 1.0);
        float lastdiff = abs(F1 - F0);
        F0 = F1;

        if (lastdiff < 0.0000001) {
          break;
        }
      }
      float F = F0;

      float v = 2.0 * atan(sqrt((e + 1.0) / (e - 1.0))) * tanh(F / 2.0);
      float r = ${hu().toFixed(1)} * (a * (1.0 - e * e)) / (1.0 + e * cos(v));

      // Compute heliocentric coords.
      float i_rad = i;
      float o_rad = om;
      float p_rad = wBar;
      float X = r * (cos(o_rad) * cos(v + p_rad - o_rad) - sin(o_rad) * sin(v + p_rad - o_rad) * cos(i_rad));
      float Y = r * (sin(o_rad) * cos(v + p_rad - o_rad) + cos(o_rad) * sin(v + p_rad - o_rad) * cos(i_rad));
      float Z = r * (sin(v + p_rad - o_rad) * sin(i_rad));
      return vec3(X, Y, Z);
    }

    vec3 getPosEllipsoid() {
      float i_rad = i;
      float o_rad = om;
      float p_rad = wBar;

      // Estimate eccentric and true anom using iterative approximation (this
      // is normally an intergral).
      float E0 = M;
      float E1 = M + e * sin(E0);
      float lastdiff = abs(E1-E0);
      E0 = E1;

      for (int count = 0; count < 100; count++) {
        E1 = M + e * sin(E0);
        lastdiff = abs(E1-E0);
        E0 = E1;
        if (lastdiff < 0.0000001) {
          break;
        }
      }

      float E = E0;
      float v = 2.0 * atan(sqrt((1.0+e)/(1.0-e)) * tan(E/2.0));

      // Compute radius vector.
      float r = ${hu().toFixed(1)} * a * (1.0 - e * e) / (1.0 + e * cos(v));

      // Compute heliocentric coords.
      float X = r * (cos(o_rad) * cos(v + p_rad - o_rad) - sin(o_rad) * sin(v + p_rad - o_rad) * cos(i_rad));
      float Y = r * (sin(o_rad) * cos(v + p_rad - o_rad) + cos(o_rad) * sin(v + p_rad - o_rad) * cos(i_rad));
      float Z = r * (sin(v + p_rad - o_rad) * sin(i_rad));
      return vec3(X, Y, Z);
    }

    vec3 getPos() {
      if (e > 0.9 && e < 1.2) {
        return getPosNearParabolic();
      } else if (e > 1.2) {
        return getPosHyperbolic();
      }
      return getPosEllipsoid();
    }

    void main() {
      vColor = fuzzColor;

      vec3 newpos = getPos() + origin;
      vec4 mvPosition = modelViewMatrix * vec4(newpos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      gl_PointSize = size;
    }
  `
	}
	var Jo = `
    varying vec3 vColor;

    void main() {
      float a = 1.0 - 2.0 * length(gl_PointCoord - vec2(0.5, 0.5));
      gl_FragColor = vec4(vColor, a);
    }
`,
		Ko = `
    attribute float size;
    varying vec3 vColor;

    void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size;
        gl_Position = projectionMatrix * mvPosition;
    }
`;
	var Kp = `
  uniform vec3 lightPos;

  varying vec2 vUv;
  varying vec3 vecPos;
  varying vec3 vecNormal;
  //varying vec3 vNormal;

  varying vec3 vViewLightPos;

  void main() {
    //vNormal = normalize(normalMatrix * normal);
    //gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
    // Since the light is in camera coordinates,
    // I'll need the vertex position in camera coords too
    vecPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
    // That's NOT exacly how you should transform your
    // normals but this will work fine, since my model
    // matrix is pretty basic
    vecNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz;
    vViewLightPos = (viewMatrix * vec4(lightPos, 1.0)).xyz;
    gl_Position = projectionMatrix * vec4(vecPos, 1.0);
  }
`,
		$p = `
  uniform float c;
  uniform float p;
  uniform vec3 color;

  varying vec2 vUv;
  varying vec3 vecPos;
  varying vec3 vecNormal;
  varying vec3  vViewLightPos;

  void main() {
    float intensity = pow(c - dot(vecNormal, vec3(0.0, 0.0, 1.0)), p);

    vec4 addedLights = vec4(0.0, 0.0, 0.0, 1.0);
    vec3 lightDirection = normalize(vecPos - vViewLightPos);
    addedLights.rgb += clamp(dot(-lightDirection, vecNormal), 0.0, 1.0)
                       * 1.0 /* intensity */;
                       // * pointLights[i].color

    gl_FragColor = vec4(color, 1.0) * intensity * addedLights;
  }
`,
		em = `
  uniform vec3 lightPos;

  varying vec2 vUv;
  varying vec3 vViewPosition;
  varying vec3 vViewLightPos;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vec4 vViewPosition4 = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = vViewPosition4.xyz;
    vViewLightPos = (viewMatrix * vec4(lightPos, 1.0)).xyz;
    vNormal = normalMatrix * normal;

    gl_Position = projectionMatrix * vViewPosition4;
  }
`,
		tm = `
  uniform sampler2D sphereTexture;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vViewLightPos;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(vViewLightPos - vViewPosition);
    float lambertian = max(dot(normal, lightDir), 0.0);
    gl_FragColor = texture2D(sphereTexture, vUv) * vec4(vec3(1.0) * lambertian, 1.0);
  }
`,
		nm = `
  varying vec3 vPos;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  void main() {
    vPos = position;
    vec4 worldPosition = (modelMatrix * vec4(position, 1.));
    gl_Position = projectionMatrix * viewMatrix * vec4(worldPosition.xyz, 1.);

    vNormal = normalMatrix * normal;
    vWorldPosition = worldPosition.xyz;
  }
`,
		im = `
  uniform sampler2D ringTexture;
  uniform float innerRadius;
  uniform float outerRadius;
  uniform vec3 lightPos;

  varying vec3 vNormal;
  varying vec3 vPos;
  varying vec3 vWorldPosition;

  vec4 color() {
    vec2 uv = vec2(0);
    uv.x = (length(vPos) - innerRadius) / (outerRadius - innerRadius);
    if (uv.x < 0.0 || uv.x > 1.0) {
      discard;
    }

    vec4 pixel = texture2D(ringTexture, uv);
    return pixel;
  }

  vec3 shadow() {
    vec3 lightDir = normalize(vPos - lightPos);
    vec3 planetPos = vec3(0);

    vec3 ringPos = vPos - planetPos;
    float posDotLightDir = dot(ringPos, lightDir);
    float posDotLightDir2 = posDotLightDir * posDotLightDir;

    // TODO(ian): Generalize this line.
    float radius = 0.0389259903; // radius of saturn in coordinate system
    float radius2 = radius * radius;

    if (posDotLightDir > 0.0 && dot(ringPos, ringPos) - posDotLightDir2 < radius2) {
      return vec3(0.0);
    }
    return vec3(1.0);
  }

  vec3 lights() {
    vec3 lightDirection = normalize(vWorldPosition - lightPos);
    float c = 0.35 + max(0.0, dot(vNormal, lightDirection)) * 0.4;

    return vec3(c);
  }

  void main() {
    // NOTE: The order of multiplication matters here. color() may call
    // discard, which would cause problems on some Windows graphics drivers if
    // it is a left operand.
    // https://github.com/typpo/spacekit/issues/22
    gl_FragColor = vec4(lights() * shadow(), 1.0) * color();
  }
`;
	var qA = 4096;

	function rm(r, e) {
		let t = e - r.get("epoch");
		return r.get("ma") + r.get("n") * t
	}
	var ZA = .01720209895;

	function sm(r, e) {
		let t = r.get("tp"),
			n = r.get("e"),
			i = r.get("q"),
			s = e - t;
		return .75 * s * ZA * Math.sqrt((1 + n) / (i * i * i))
	}
	var cr = class {
		constructor(e, t) {
			if (this.options = e, this.id = `KeplerParticles__${cr.instanceCount}`, this.simulation = t, this.context = t.getContext(), this.addedToScene = !1, this.particleCount = 0, !this.options.textureUrl) throw new Error("ParticleSystem requires textureUrl to be set");
			let n = Dp(this.options.textureUrl, this.context.options.basePath);
			this.uniforms = {
				texture: {
					value: n
				}
			};
			let i = this.options.maxNumParticles || qA;
			this.elements = [], this.attributes = {
				size: new pe(new Float32Array(i), 1),
				origin: new pe(new Float32Array(i * 3), 3),
				position: new pe(new Float32Array(i * 3), 3),
				fuzzColor: new pe(new Float32Array(i * 3), 3),
				a: new pe(new Float32Array(i), 1),
				e: new pe(new Float32Array(i), 1),
				i: new pe(new Float32Array(i), 1),
				om: new pe(new Float32Array(i), 1),
				ma: new pe(new Float32Array(i), 1),
				n: new pe(new Float32Array(i), 1),
				w: new pe(new Float32Array(i), 1),
				wBar: new pe(new Float32Array(i), 1),
				q: new pe(new Float32Array(i), 1),
				M: new pe(new Float32Array(i), 1),
				a0: new pe(new Float32Array(i), 1)
			}, this.attributes.M.setUsage(In), this.attributes.a0.setUsage(In);
			let s = new de;
			s.setDrawRange(0, 0), Object.keys(this.attributes).forEach(o => {
				let l = this.attributes[o];
				s.setAttribute(o, l)
			});
			let a = new Ye({
				uniforms: this.uniforms,
				vertexShader: Jp(),
				fragmentShader: Zp(),
				depthTest: !0,
				depthWrite: !1,
				transparent: !0
			});
			this.shaderMaterial = a, this.geometry = s, this.particleSystem = new Ot(s, a)
		}
		addParticle(e, t = {}) {
			this.elements.push(e);
			let n = this.attributes,
				i = this.particleCount++;
			n.size.set([t.particleSize || this.options.defaultSize || 15], i);
			let s = new $(t.color || 16777215);
			n.fuzzColor.set([s.r, s.g, s.b], i * 3), n.origin.set([0, 0, 0], i * 3), n.a.set([e.get("a")], i), n.e.set([e.get("e")], i), n.i.set([e.get("i", "rad")], i), n.om.set([e.get("om", "rad")], i), n.wBar.set([e.get("wBar", "rad")], i), n.q.set([e.get("q")], i), jn.getOrbitType(e) === St.PARABOLIC ? n.a0.set([sm(e, this.options.jd || 0)], i) : n.M.set([rm(e, this.options.jd || 0)], i);
			for (let a in n) n.hasOwnProperty(a) && (n[a].needsUpdate = !0);
			return this.geometry.setDrawRange(0, this.particleCount), !this.addedToScene && this.simulation && (this.simulation.addObject(this), this.addedToScene = !0), i
		}
		hideParticle(e) {
			let t = this.attributes;
			t.size.set([0], e);
			for (let n in t) t.hasOwnProperty(n) && (t[n].needsUpdate = !0)
		}
		setParticleSize(e, t) {
			let n = this.attributes;
			n.size.set([e], t);
			for (let i in n) n.hasOwnProperty(i) && (n[i].needsUpdate = !0)
		}
		setParticleColor(e, t) {
			let n = this.attributes,
				{
					r: i,
					g: s,
					b: a
				} = new $(e);
			n.fuzzColor.set([i, s, a], t * 3);
			for (let o in n) n.hasOwnProperty(o) && (n[o].needsUpdate = !0)
		}
		setParticleOrigin(e, t) {
			this.attributes.origin.set(t, e * 3), this.attributes.origin.needsUpdate = !0
		}
		update(e) {
			let t = [],
				n = [];
			for (let i = 0; i < this.elements.length; i++) {
				let s = this.elements[i],
					a, o;
				jn.getOrbitType(s) === St.PARABOLIC ? (o = sm(s, e), a = 0) : (o = 0, a = rm(s, e)), t.push(a), n.push(o)
			}
			this.attributes.M.set(t), this.attributes.M.needsUpdate = !0, this.attributes.a0.set(n), this.attributes.a0.needsUpdate = !0
		}
		get3jsObjects() {
			return [this.particleSystem]
		}
		getId() {
			return this.id
		}
	};
	cr.instanceCount = 0;
	var JA = /^[og]\s*(.+)?/,
		KA = /^mtllib /,
		$A = /^usemtl /,
		eE = /^usemap /,
		am = new A,
		bu = new A,
		om = new A,
		lm = new A,
		sn = new A;

	function tE() {
		let r = {
			objects: [],
			object: {},
			vertices: [],
			normals: [],
			colors: [],
			uvs: [],
			materials: {},
			materialLibraries: [],
			startObject: function (e, t) {
				if (this.object && this.object.fromDeclaration === !1) {
					this.object.name = e, this.object.fromDeclaration = t !== !1;
					return
				}
				let n = this.object && typeof this.object.currentMaterial == "function" ? this.object.currentMaterial() : void 0;
				if (this.object && typeof this.object._finalize == "function" && this.object._finalize(!0), this.object = {
					name: e || "",
					fromDeclaration: t !== !1,
					geometry: {
						vertices: [],
						normals: [],
						colors: [],
						uvs: [],
						hasUVIndices: !1
					},
					materials: [],
					smooth: !0,
					startMaterial: function (i, s) {
						let a = this._finalize(!1);
						a && (a.inherited || a.groupCount <= 0) && this.materials.splice(a.index, 1);
						let o = {
							index: this.materials.length,
							name: i || "",
							mtllib: Array.isArray(s) && s.length > 0 ? s[s.length - 1] : "",
							smooth: a !== void 0 ? a.smooth : this.smooth,
							groupStart: a !== void 0 ? a.groupEnd : 0,
							groupEnd: -1,
							groupCount: -1,
							inherited: !1,
							clone: function (l) {
								let c = {
									index: typeof l == "number" ? l : this.index,
									name: this.name,
									mtllib: this.mtllib,
									smooth: this.smooth,
									groupStart: 0,
									groupEnd: -1,
									groupCount: -1,
									inherited: !1
								};
								return c.clone = this.clone.bind(c), c
							}
						};
						return this.materials.push(o), o
					},
					currentMaterial: function () {
						if (this.materials.length > 0) return this.materials[this.materials.length - 1]
					},
					_finalize: function (i) {
						let s = this.currentMaterial();
						if (s && s.groupEnd === -1 && (s.groupEnd = this.geometry.vertices.length / 3, s.groupCount = s.groupEnd - s.groupStart, s.inherited = !1), i && this.materials.length > 1)
							for (let a = this.materials.length - 1; a >= 0; a--) this.materials[a].groupCount <= 0 && this.materials.splice(a, 1);
						return i && this.materials.length === 0 && this.materials.push({
							name: "",
							smooth: this.smooth
						}), s
					}
				}, n && n.name && typeof n.clone == "function") {
					let i = n.clone(0);
					i.inherited = !0, this.object.materials.push(i)
				}
				this.objects.push(this.object)
			},
			finalize: function () {
				this.object && typeof this.object._finalize == "function" && this.object._finalize(!0)
			},
			parseVertexIndex: function (e, t) {
				let n = parseInt(e, 10);
				return (n >= 0 ? n - 1 : n + t / 3) * 3
			},
			parseNormalIndex: function (e, t) {
				let n = parseInt(e, 10);
				return (n >= 0 ? n - 1 : n + t / 3) * 3
			},
			parseUVIndex: function (e, t) {
				let n = parseInt(e, 10);
				return (n >= 0 ? n - 1 : n + t / 2) * 2
			},
			addVertex: function (e, t, n) {
				let i = this.vertices,
					s = this.object.geometry.vertices;
				s.push(i[e + 0], i[e + 1], i[e + 2]), s.push(i[t + 0], i[t + 1], i[t + 2]), s.push(i[n + 0], i[n + 1], i[n + 2])
			},
			addVertexPoint: function (e) {
				let t = this.vertices;
				this.object.geometry.vertices.push(t[e + 0], t[e + 1], t[e + 2])
			},
			addVertexLine: function (e) {
				let t = this.vertices;
				this.object.geometry.vertices.push(t[e + 0], t[e + 1], t[e + 2])
			},
			addNormal: function (e, t, n) {
				let i = this.normals,
					s = this.object.geometry.normals;
				s.push(i[e + 0], i[e + 1], i[e + 2]), s.push(i[t + 0], i[t + 1], i[t + 2]), s.push(i[n + 0], i[n + 1], i[n + 2])
			},
			addFaceNormal: function (e, t, n) {
				let i = this.vertices,
					s = this.object.geometry.normals;
				am.fromArray(i, e), bu.fromArray(i, t), om.fromArray(i, n), sn.subVectors(om, bu), lm.subVectors(am, bu), sn.cross(lm), sn.normalize(), s.push(sn.x, sn.y, sn.z), s.push(sn.x, sn.y, sn.z), s.push(sn.x, sn.y, sn.z)
			},
			addColor: function (e, t, n) {
				let i = this.colors,
					s = this.object.geometry.colors;
				i[e] !== void 0 && s.push(i[e + 0], i[e + 1], i[e + 2]), i[t] !== void 0 && s.push(i[t + 0], i[t + 1], i[t + 2]), i[n] !== void 0 && s.push(i[n + 0], i[n + 1], i[n + 2])
			},
			addUV: function (e, t, n) {
				let i = this.uvs,
					s = this.object.geometry.uvs;
				s.push(i[e + 0], i[e + 1]), s.push(i[t + 0], i[t + 1]), s.push(i[n + 0], i[n + 1])
			},
			addDefaultUV: function () {
				let e = this.object.geometry.uvs;
				e.push(0, 0), e.push(0, 0), e.push(0, 0)
			},
			addUVLine: function (e) {
				let t = this.uvs;
				this.object.geometry.uvs.push(t[e + 0], t[e + 1])
			},
			addFace: function (e, t, n, i, s, a, o, l, c) {
				let u = this.vertices.length,
					h = this.parseVertexIndex(e, u),
					d = this.parseVertexIndex(t, u),
					f = this.parseVertexIndex(n, u);
				if (this.addVertex(h, d, f), this.addColor(h, d, f), o !== void 0 && o !== "") {
					let p = this.normals.length;
					h = this.parseNormalIndex(o, p), d = this.parseNormalIndex(l, p), f = this.parseNormalIndex(c, p), this.addNormal(h, d, f)
				} else this.addFaceNormal(h, d, f);
				if (i !== void 0 && i !== "") {
					let p = this.uvs.length;
					h = this.parseUVIndex(i, p), d = this.parseUVIndex(s, p), f = this.parseUVIndex(a, p), this.addUV(h, d, f), this.object.geometry.hasUVIndices = !0
				} else this.addDefaultUV()
			},
			addPointGeometry: function (e) {
				this.object.geometry.type = "Points";
				let t = this.vertices.length;
				for (let n = 0, i = e.length; n < i; n++) {
					let s = this.parseVertexIndex(e[n], t);
					this.addVertexPoint(s), this.addColor(s)
				}
			},
			addLineGeometry: function (e, t) {
				this.object.geometry.type = "Line";
				let n = this.vertices.length,
					i = this.uvs.length;
				for (let s = 0, a = e.length; s < a; s++) this.addVertexLine(this.parseVertexIndex(e[s], n));
				for (let s = 0, a = t.length; s < a; s++) this.addUVLine(this.parseUVIndex(t[s], i))
			}
		};
		return r.startObject("", !1), r
	}
	var Au = class extends Dt {
		constructor(e) {
			super(e);
			this.materials = null
		}
		load(e, t, n, i) {
			let s = this,
				a = new Qt(this.manager);
			a.setPath(this.path), a.setRequestHeader(this.requestHeader), a.setWithCredentials(this.withCredentials), a.load(e, function (o) {
				try {
					t(s.parse(o))
				} catch (l) {
					i ? i(l) : console.error(l), s.manager.itemError(e)
				}
			}, n, i)
		}
		setMaterials(e) {
			return this.materials = e, this
		}
		parse(e) {
			let t = new tE;
			e.indexOf(`\r
`) !== -1 && (e = e.replace(/\r\n/g, `
`)), e.indexOf(`\\
`) !== -1 && (e = e.replace(/\\\n/g, ""));
			let n = e.split(`
`),
				i = "",
				s = "",
				a = 0,
				o = [],
				l = typeof "".trimLeft == "function";
			for (let h = 0, d = n.length; h < d; h++)
				if (i = n[h], i = l ? i.trimLeft() : i.trim(), a = i.length, a !== 0 && (s = i.charAt(0), s !== "#"))
					if (s === "v") {
						let f = i.split(/\s+/);
						switch (f[0]) {
							case "v":
								t.vertices.push(parseFloat(f[1]), parseFloat(f[2]), parseFloat(f[3])), f.length >= 7 ? t.colors.push(parseFloat(f[4]), parseFloat(f[5]), parseFloat(f[6])) : t.colors.push(void 0, void 0, void 0);
								break;
							case "vn":
								t.normals.push(parseFloat(f[1]), parseFloat(f[2]), parseFloat(f[3]));
								break;
							case "vt":
								t.uvs.push(parseFloat(f[1]), parseFloat(f[2]));
								break
						}
					} else if (s === "f") {
						let p = i.substr(1).trim().split(/\s+/),
							v = [];
						for (let g = 0, m = p.length; g < m; g++) {
							let b = p[g];
							if (b.length > 0) {
								let y = b.split("/");
								v.push(y)
							}
						}
						let x = v[0];
						for (let g = 1, m = v.length - 1; g < m; g++) {
							let b = v[g],
								y = v[g + 1];
							t.addFace(x[0], b[0], y[0], x[1], b[1], y[1], x[2], b[2], y[2])
						}
					} else if (s === "l") {
						let f = i.substring(1).trim().split(" "),
							p = [],
							v = [];
						if (i.indexOf("/") === -1) p = f;
						else
							for (let x = 0, g = f.length; x < g; x++) {
								let m = f[x].split("/");
								m[0] !== "" && p.push(m[0]), m[1] !== "" && v.push(m[1])
							}
						t.addLineGeometry(p, v)
					} else if (s === "p") {
						let p = i.substr(1).trim().split(" ");
						t.addPointGeometry(p)
					} else if ((o = JA.exec(i)) !== null) {
						let f = (" " + o[0].substr(1).trim()).substr(1);
						t.startObject(f)
					} else if ($A.test(i)) t.object.startMaterial(i.substring(7).trim(), t.materialLibraries);
					else if (KA.test(i)) t.materialLibraries.push(i.substring(7).trim());
					else if (eE.test(i)) console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');
					else if (s === "s") {
						if (o = i.split(" "), o.length > 1) {
							let p = o[1].trim().toLowerCase();
							t.object.smooth = p !== "0" && p !== "off"
						} else t.object.smooth = !0;
						let f = t.object.currentMaterial();
						f && (f.smooth = t.object.smooth)
					} else {
						if (i === "\0") continue;
						console.warn('THREE.OBJLoader: Unexpected line: "' + i + '"')
					}
			t.finalize();
			let c = new En;
			if (c.materialLibraries = [].concat(t.materialLibraries), !(t.objects.length === 1 && t.objects[0].geometry.vertices.length === 0) === !0)
				for (let h = 0, d = t.objects.length; h < d; h++) {
					let f = t.objects[h],
						p = f.geometry,
						v = f.materials,
						x = p.type === "Line",
						g = p.type === "Points",
						m = !1;
					if (p.vertices.length === 0) continue;
					let b = new de;
					b.setAttribute("position", new ce(p.vertices, 3)), p.normals.length > 0 && b.setAttribute("normal", new ce(p.normals, 3)), p.colors.length > 0 && (m = !0, b.setAttribute("color", new ce(p.colors, 3))), p.hasUVIndices === !0 && b.setAttribute("uv", new ce(p.uvs, 2));
					let y = [];
					for (let _ = 0, w = v.length; _ < w; _++) {
						let D = v[_],
							I = D.name + "_" + D.smooth + "_" + m,
							L = t.materials[I];
						if (this.materials !== null) {
							if (L = this.materials.create(D.name), x && L && !(L instanceof Ke)) {
								let R = new Ke;
								tt.prototype.copy.call(R, L), R.color.copy(L.color), L = R
							} else if (g && L && !(L instanceof Xt)) {
								let R = new Xt({
									size: 10,
									sizeAttenuation: !1
								});
								tt.prototype.copy.call(R, L), R.color.copy(L.color), R.map = L.map, L = R
							}
						}
						L === void 0 && (x ? L = new Ke : g ? L = new Xt({
							size: 1,
							sizeAttenuation: !1
						}) : L = new ns, L.name = D.name, L.flatShading = !D.smooth, L.vertexColors = m, t.materials[I] = L), y.push(L)
					}
					let E;
					if (y.length > 1) {
						for (let _ = 0, w = v.length; _ < w; _++) {
							let D = v[_];
							b.addGroup(D.groupStart, D.groupCount, _)
						}
						x ? E = new Mt(b, y) : g ? E = new Ot(b, y) : E = new ze(b, y)
					} else x ? E = new Mt(b, y[0]) : g ? E = new Ot(b, y[0]) : E = new ze(b, y[0]);
					E.name = f.name, c.add(E)
				} else if (t.vertices.length > 0) {
					let h = new Xt({
						size: 1,
						sizeAttenuation: !1
					}),
						d = new de;
					d.setAttribute("position", new ce(t.vertices, 3)), t.colors.length > 0 && t.colors[0] !== void 0 && (d.setAttribute("color", new ce(t.colors, 3)), h.vertexColors = !0);
					let f = new Ot(d, h);
					c.add(f)
				} return c
		}
	};
	var nE = 30;

	function iE(r, e, t) {
		let n = new A(r[0], r[1], r[2]);
		return n.project(e), {
			x: (n.x + 1) * t.clientWidth / 2,
			y: (-n.y + 1) * t.clientHeight / 2
		}
	}
	var ms = class {
		constructor(e, t, n, i = !0) {
			this._id = e, this._options = t || {}, this._object3js = void 0, this._useEphemTable = this._options.ephemTable !== void 0, this._isStaticObject = !this._options.ephem && !this._useEphemTable, this._simulation = n, this._context = n.getContext(), this._label = void 0, this._showLabel = !1, this._lastLabelUpdate = 0, this._position = xn(this._options.position || [0, 0, 0]), this._orbitAround = void 0, this._scale = this._options.scale || [1, 1, 1], this._renderMethod = void 0, this._particleIndex = void 0, this._initialized = !1, i && !this.init() && console.warn(`SpaceObject ${e}: failed to initialize`)
		}
		init() {
			if (this.renderObject(), this._options.labelText) {
				let e = this.createLabel();
				this._simulation.getSimulationElement().appendChild(e), this._label = e, this._showLabel = !0
			}
			return this._orbitPath = void 0, this._eclipticLines = void 0, this.update(this._simulation.getJd(), !0), this._initialized = !0, !0
		}
		setPositionedObject(e) {
			this._object3js = e
		}
		renderObject() {
			if (this.isStaticObject()) this._renderMethod || (this._object3js = this.createSprite(), this._simulation && this._simulation.addObject(this, !1), this._renderMethod = "SPRITE");
			else if (this._orbit = this.createOrbit(), !this._options.hideOrbit && this._simulation && this._simulation.addObject(this, !1), this._useEphemTable && (this._renderMethod || (this._object3js = this.createSprite(), this._simulation && this._simulation.addObject(this, !0), this._renderMethod = "SPRITE")), !this._renderMethod) {
				if (!this._options.ephem) throw new Error("Attempting to create a particle system, but ephemeris are not available.");
				this._particleIndex = this._context.objects.particles.addParticle(this._options.ephem, {
					particleSize: this._options.particleSize,
					color: this.getColor()
				}), this._renderMethod = "PARTICLESYSTEM"
			}
		}
		createLabel() {
			let e = document.createElement("div");
			e.className = "spacekit__object-label";
			let {
				labelText: t,
				labelUrl: n
			} = this._options;
			return this._options.labelUrl ? e.innerHTML = `<div><a target="_blank" href="${n}">${t}</a></div>` : e.innerHTML = `<div>${t}</div>`, e.style.fontFamily = "Arial", e.style.fontSize = "12px", e.style.color = "#fff", e.style.position = "absolute", e.style.backgroundColor = "#0009", e.style.outline = "1px solid #5f5f5f", e
		}
		updateLabelPosition(e) {
			if (!this._label) throw new Error("Attempted to update label position without a label");
			let t = this._label,
				n = this._simulation.getSimulationElement(),
				i = iE(e, this._simulation.getViewer().get3jsCamera(), n),
				s = {
					left: i.x,
					top: i.y,
					right: i.x + t.clientWidth,
					bottom: i.y + t.clientHeight
				};
			s.left - 30 > 0 && s.right + 20 < n.clientWidth && s.top - 25 > 0 && s.bottom < n.clientHeight ? (t.style.left = `${s.left - t.clientWidth / 2}px`, t.style.top = `${s.top - t.clientHeight - 8}px`, t.style.visibility = "visible") : t.style.visibility = "hidden"
		}
		createSprite() {
			if (!this._options.textureUrl) throw new Error("Cannot create sprite without a textureUrl");
			let e = fa(this._options.textureUrl, this._context.options.basePath),
				t = new en().load(e);
			t.encoding = ft;
			let n = new Qi(new Xi({
				map: t,
				blending: Ti,
				depthWrite: !1,
				color: this._options.theme ? this._options.theme.color : 16777215
			})),
				i = xn(this._scale);
			n.scale.set(i[0], i[1], i[2]);
			let s = this.getPosition(this._simulation.getJd());
			return n.position.set(s[0], s[1], s[2]), this.isStaticObject() && (n.updateMatrix(), n.matrixAutoUpdate = !1), n
		}
		createOrbit() {
			if (this._orbit) return this._orbit;
			let e = this._useEphemTable ? this._options.ephemTable : this._options.ephem;
			if (!e) throw new Error("Cannot create orbit without Ephem or EphemerisTable");
			return new jn(e, {
				orbitPathSettings: this._options.orbitPathSettings,
				color: this._options.theme ? this._options.theme.orbitColor : void 0,
				eclipticLineColor: this._options.ecliptic ? this._options.ecliptic.lineColor : void 0
			})
		}
		shouldUpdateObjectPosition(e) {
			return !0
		}
		orbitAround(e) {
			this._orbitAround = e
		}
		setPosition(e, t, n) {
			this._position[0] = yn(e), this._position[1] = yn(t), this._position[2] = yn(n)
		}
		getPosition(e) {
			let t = this._position;
			if (!this._orbit) return t;
			let n = this._orbit.getPositionAtTime(e);
			if (this._orbitAround) {
				let i = this._orbitAround.getPosition(e);
				return [t[0] + n[0] + i[0], t[1] + n[1] + i[1], t[2] + n[2] + i[2]]
			}
			return [t[0] + n[0], t[1] + n[1], t[2] + n[2]]
		}
		update(e, t = !1) {
			var o, l, c;
			let n;
			if (this._label) {
				let u = +new Date - this._lastLabelUpdate > nE;
				(t || this._showLabel && u) && (n || (n = this.getPosition(e)), this.updateLabelPosition(n), this._lastLabelUpdate = +new Date)
			}
			if (this.isStaticObject() && !t) return;
			let i = !1;
			(this._object3js || this._label) && (i = t || this.shouldUpdateObjectPosition(e)), this._object3js && i && (n = this.getPosition(e), this._object3js.position.set(n[0], n[1], n[2]));
			let s = !this._orbitPath || ((o = this._orbit) == null ? void 0 : o.needsUpdateForTime(e));
			this._orbit && !this._options.hideOrbit && s && (this._orbitPath && this._simulation.getScene().remove(this._orbitPath), this._orbitPath = this._orbit.getOrbitShape(e, !0), this._simulation.getScene().add(this._orbitPath));
			let a = !this._eclipticLines || s;
			if (this._orbit && this._options.ecliptic && this._options.ecliptic.displayLines && a && (this._eclipticLines && this._simulation.getScene().remove(this._eclipticLines), this._eclipticLines = this._orbit.getLinesToEcliptic(), this._simulation.getScene().add(this._eclipticLines)), this._orbitAround) {
				let u = this._orbitAround.getPosition(e);
				this._renderMethod === "PARTICLESYSTEM" && ((l = this._context.objects.particles) == null || l.setParticleOrigin(this._particleIndex, u)), this._options.hideOrbit || (c = this._orbitPath) == null || c.position.set(u[0], u[1], u[2]), n || (n = this.getPosition(e))
			}
		}
		get3jsObjects() {
			let e = [];
			return this._object3js && e.push(this._object3js), this._orbit && (this._orbitPath && e.push(this._orbitPath), this._eclipticLines && e.push(this._eclipticLines)), e
		}
		getBoundingObject() {
			return qt(this, null, function* () {
				return Promise.resolve(this.get3jsObjects()[0])
			})
		}
		getColor() {
			return this._options.theme && this._options.theme.color || 16777215
		}
		getOrbit() {
			return this._orbit
		}
		getLabelVisibility() {
			return this._showLabel
		}
		setLabelVisibility(e) {
			if (!this._label) throw new Error("Attempted to set label visibility without a label");
			e ? (this._showLabel = !0, this._label.style.display = "block") : (this._showLabel = !1, this._label.style.display = "none")
		}
		getId() {
			return this._id
		}
		isStaticObject() {
			return this._isStaticObject
		}
		isReady() {
			return this._initialized
		}
		removalCleanup() {
			var e;
			this._label && (this._simulation.getSimulationElement().removeChild(this._label), this._label = void 0), this._particleIndex !== void 0 && ((e = this._context) == null || e.objects.particles.hideParticle(this._particleIndex))
		}
	},
		Dn = "{{assets}}/sprites/smallparticle.png",
		rE = {
			SUN: {
				textureUrl: "{{assets}}/sprites/lensflare0.png",
				position: [0, 0, 0]
			},
			MERCURY: {
				textureUrl: Dn,
				theme: {
					color: 9518318
				},
				ephem: rn.MERCURY
			},
			VENUS: {
				textureUrl: Dn,
				theme: {
					color: 16742195
				},
				ephem: rn.VENUS
			},
			EARTH: {
				textureUrl: Dn,
				theme: {
					color: 39629
				},
				ephem: rn.EARTH
			},
			MOON: {
				textureUrl: Dn,
				theme: {
					color: 16766720
				},
				ephem: rn.MOON,
				particleSize: 6
			},
			MARS: {
				textureUrl: Dn,
				theme: {
					color: 10893882
				},
				ephem: rn.MARS
			},
			JUPITER: {
				textureUrl: Dn,
				theme: {
					color: 16759055
				},
				ephem: rn.JUPITER
			},
			SATURN: {
				textureUrl: Dn,
				theme: {
					color: 3368499
				},
				ephem: rn.SATURN
			},
			URANUS: {
				textureUrl: Dn,
				theme: {
					color: 39423
				},
				ephem: rn.URANUS
			},
			NEPTUNE: {
				textureUrl: Dn,
				theme: {
					color: 3355647
				},
				ephem: rn.NEPTUNE
			},
			PLUTO: {
				textureUrl: Dn,
				theme: {
					color: 13418672
				},
				ephem: rn.PLUTO
			}
		};

	function Eu(r, e, t) {
		let n = new Ke({
			linewidth: 3,
			color: t
		}),
			i = new de().setFromPoints([fu(r).clone(), fu(e).clone()]),
			s = new kt(i, n);
		return s.computeLineDistances(), s
	}

	function sE() {
		return [Eu(new A(0, 0, 0), new A(3, 0, 0), 16711680), Eu(new A(0, 0, 0), new A(0, 3, 0), 65280), Eu(new A(0, 0, 0), new A(0, 0, 3), 255)]
	}
	var gs = class extends ms {
		constructor(e, t, n, i = !0) {
			super(e, t, n, !1);
			this._obj = new _e, this._renderMethod = "ROTATING_OBJECT", super.setPositionedObject(this._obj), this._objectIsRotatable = !1, this._options.rotation && (this._objectIsRotatable = !0), this._axisOfRotation = void 0, this._materials = [], i && this.init()
		}
		init() {
			if (this._objectIsRotatable && this.initRotation(), this._options.debug && (this._options.debug.showAxes && sE().forEach(e => this._obj.add(e)), this._options.debug.showGrid)) {
				let e = new ar(3, 3, 16711680, 16772846);
				e.geometry.rotateX(Math.PI / 2), this._obj.add(e)
			}
			return super.init()
		}
		initRotation() {
			if (!this._options.rotation) throw new Error("Must specify `rotation` option when creating a RotatingObject");
			let {
				rotation: e
			} = this._options;
			if (typeof e.jd0 == "undefined") return;
			let {
				PI: t
			} = Math, n = st.rad(e.lambdaDeg || 0), i = st.rad(e.betaDeg || 0), s = e.period, a = e.yorp || 0, o = st.rad(e.phi0 || 0), l = this._simulation.getJd(), c = e.jd0, u = o + 2 * t / s * (l - c) + 1 / 2 * a * Math.pow(l - c, 2);
			this._obj.rotateY(-(t / 2 - i)), this._obj.rotateZ(-n), this._obj.rotateZ(u)
		}
		update(e, t = !1) {
			if (this._obj && this._objectIsRotatable && this._options.rotation && this._options.rotation.enable) {
				let n = this._options.rotation.speed || .5;
				this._obj.rotation.z += n * (Math.PI / 180), this._obj.rotation.z %= 360
			}
			this._axisOfRotation, super.update(e, t)
		}
		get3jsObjects() {
			let e = super.get3jsObjects();
			return e.unshift(this._obj), e
		}
		startRotation() {
			if (!this._options.rotation) throw new Error("Must specify `rotation` option when creating a RotatingObject");
			this._options.rotation.enable = !0
		}
		stopRotation() {
			if (!this._options.rotation) throw new Error("Must specify `rotation` option when creating a RotatingObject");
			this._options.rotation.enable = !1
		}
	};
	var $o = class extends gs {
		constructor(e, t, n) {
			super(e, t, n, !1);
			var s;
			if (!t.shape) throw new Error("ShapeObject requires an options.shape object");
			if (!((s = t.shape) == null ? void 0 : s.shapeUrl)) throw new Error("Must specify shape.shapeUrl when creating a ShapeObject");
			this.shapeObj = void 0;
			let i = new as;
			i.onProgress = (a, o, l) => {
				console.info(this._id, a, "loading progress:", o, "/", l)
			}, this.loadingPromise = new Promise(a => {
				new Au(i).load(t.shape.shapeUrl, l => {
					l.traverse(c => {
						if (c instanceof ze) {
							let u = new Ji({
								color: this._options.shape.color || 13421772
							});
							c.material = u, c.geometry.scale(.05, .05, .05), this._materials.push(u)
						}
					}), this.shapeObj = l, this._obj.add(l), this._simulation && this._simulation.addObject(this, !1), this._initialized = !0, a(this.shapeObj)
				})
			}), super.init()
		}
		getBoundingObject() {
			return qt(this, null, function* () {
				return this.loadingPromise
			})
		}
	};
	var el = class {
		constructor(e, t) {
			this.options = e, this.id = `__skybox_${new Date().getTime()}`, this.simulation = t, this.context = t.getContext(), this.mesh = void 0, this.init()
		}
		init() {
			let e = new Kt(1e10, 32, 32),
				t = fa(this.options.textureUrl, this.context.options.basePath),
				n = new en().load(t),
				i = new zt({
					map: n,
					side: Qe
				}),
				s = new ze(e, i);
			s.rotation.x = 0, s.rotation.y = -1 / 12 * Math.PI, s.rotation.z = 8 / 5 * Math.PI, s.scale.set(-1, 1, 1), this.mesh = s, this.simulation && this.simulation.addObject(this, !0)
		}
		get3jsObjects() {
			return this.mesh ? [this.mesh] : []
		}
		getId() {
			return this.id
		}
		update() { }
	},
		aE = {
			ESO_GIGAGALAXY: {
				textureUrl: "{{assets}}/skybox/eso_milkyway.jpg"
			},
			ESO_LITE: {
				textureUrl: "{{assets}}/skybox/eso_lite.png"
			},
			NASA_TYCHO: {
				textureUrl: "{{assets}}/skybox/nasa_tycho.jpg"
			}
		};
	var tl = class extends gs {
		constructor(e, t, n) {
			super(e, t, n, !1);
			this.init()
		}
		init() {
			var s;
			let e = null;
			this._options.textureUrl && (e = new en().load(this._options.textureUrl));
			let t = new kr,
				n = this._options.levelsOfDetail || [{
					radii: 0,
					segments: 64
				}],
				i = this.getScaledRadius();
			for (let a = 0; a < n.length; a += 1) {
				let o = n[a],
					l = new Kt(i, o.segments, o.segments),
					c;
				if (this._simulation.isUsingLightSources()) {
					console.warn(`SphereObject ${this._id} requires a texture when using a light source.`);
					let h = {
						sphereTexture: {
							value: void 0
						},
						lightPos: {
							value: new A
						}
					};
					h.sphereTexture.value = e, h.lightPos.value.copy(this._simulation.getLightPosition()), c = new Ye({
						uniforms: h,
						vertexShader: em,
						fragmentShader: tm,
						transparent: !0
					})
				} else {
					let h = (s = this._options.color) != null ? s : 12303291;
					c = new zt({
						map: e,
						color: h
					})
				}
				let u = new ze(l, c);
				u.receiveShadow = !0, u.castShadow = !0, u.rotation.x = Math.PI / 2, t.addLevel(u, i * o.radii)
			}
			if (this._obj.add(t), this._options.atmosphere && this._options.atmosphere.enable) {
				let a = this.renderFullAtmosphere();
				a && this._obj.add(a)
			}
			return this._options.axialTilt && (this._obj.rotation.y += st.rad(this._options.axialTilt)), this._renderMethod = "SPHERE", this._simulation && this._simulation.addObject(this, !1), super.init()
		}
		getScaledRadius() {
			return yn(this._options.radius || 1)
		}
		renderFullAtmosphere() {
			var o, l, c, u, h, d, f, p, v;
			if (!this._simulation.isUsingLightSources()) return console.warn("Cannot render atmosphere without a light source"), null;
			let e = this.getScaledRadius(),
				t = new $((c = (l = (o = this._options) == null ? void 0 : o.atmosphere) == null ? void 0 : l.color) != null ? c : 16777215),
				n = e * ((d = (h = (u = this._options) == null ? void 0 : u.atmosphere) == null ? void 0 : h.innerSizeRatio) != null ? d : .025),
				i = e * ((v = (p = (f = this._options) == null ? void 0 : f.atmosphere) == null ? void 0 : p.outerSizeRatio) != null ? v : .15),
				s = new _e;
			s.add(this.renderAtmosphereComponent(e, n, .8, 2, t)), s.add(this.renderAtmosphereComponent(e, i, .5, 4, t));
			let a = new kr;
			return a.addLevel(s, 0), a.addLevel(new _e, e * 24), a
		}
		renderAtmosphereComponent(e, t, n, i, s) {
			let a = new Kt(e + t, 32, 32),
				o = {
					c: {
						value: n
					},
					p: {
						value: i
					},
					color: {
						value: s
					},
					lightPos: {
						value: new A
					}
				},
				l = this._simulation.getLightPosition();
			l && o.lightPos.value.copy(l);
			let c = new Ye({
				uniforms: o,
				vertexShader: Kp,
				fragmentShader: $p,
				side: Qe,
				transparent: !0,
				depthWrite: !1
			});
			return new ze(a, c)
		}
		addRings(e, t, n, i = 128) {
			let s = yn(st.kmToAu(e)),
				a = yn(st.kmToAu(t)),
				o = new mi(s, a, i, 5, 0, Math.PI * 2),
				l = new en().load(n),
				c;
			if (this._simulation.isUsingLightSources()) {
				let h = Ya.merge([se.lights, {
					ringTexture: {
						value: null
					},
					innerRadius: {
						value: s
					},
					outerRadius: {
						value: a
					},
					lightPos: {
						value: new A
					}
				}]);
				h.ringTexture.value = l, h.lightPos.value.copy(this._simulation.getLightPosition()), c = new Ye({
					uniforms: h,
					lights: !0,
					vertexShader: nm,
					fragmentShader: im,
					transparent: !0,
					alphaTest: .1,
					side: Ht
				})
			} else c = new zt({
				map: l,
				side: Ht,
				transparent: !0,
				alphaTest: .1,
				opacity: .8
			});
			let u = new ze(o, c);
			u.receiveShadow = !0, u.castShadow = !0, this._obj.add(u)
		}
	};
	var oE = 4,
		lE = 16777215,
		nl = class {
			constructor(e, t, n, i) {
				this.options = n, this.id = e, this.simulation = i, this.points = t, this.pointObject = void 0, this.init(), this.simulation.addObject(this, !0)
			}
			init() {
				let e = new Float32Array(this.points.length * 3),
					t = new Float32Array(this.points.length * 3),
					n = new Float32Array(this.points.length),
					i = new $(lE);
				this.options.defaultColor && (i = new $(this.options.defaultColor));
				let s = oE;
				this.options.size && (s = this.options.size);
				for (let l = 0, c = this.points.length; l < c; l++) {
					let u = this.points[l];
					e.set(u, l * 3), i.toArray(t, l * 3), n[l] = s
				}
				let a = new de;
				a.setAttribute("position", new pe(e, 3)), a.setAttribute("color", new pe(t, 3)), a.setAttribute("size", new pe(n, 1));
				let o = new Ye({
					vertexColors: !0,
					vertexShader: Ko,
					fragmentShader: Jo,
					transparent: !0
				});
				this.pointObject = new Ot(a, o)
			}
			get3jsObjects() {
				return this.pointObject ? [this.pointObject] : []
			}
			getId() {
				return this.id
			}
			update() { }
		};

	function cE(r) {
		return r >= 3e4 ? 9614847 : r >= 1e4 ? 10666239 : r >= 7500 ? 14016767 : r >= 6e3 ? 16381439 : r >= 5200 ? 16772579 : r >= 3700 ? 16767669 : (r >= 2400, 16758124)
	}

	function uE(r, e) {
		return r < 2 ? e * 4 : r < 4 ? e * 2 : r < 6 ? e : 1
	}
	var ma = class {
		constructor(e, t) {
			this._options = e, this._id = `__stars_${new Date().getTime()}`, this._simulation = t, this._context = t.getContext(), this._stars = void 0, this.init()
		}
		init() {
			let e = da("{{data}}/processed/bsc.json", this._context.options.basePath);
			fetch(e).then(t => t.json()).then(t => {
				let n = t.length,
					i = new de,
					s = new Float32Array(n * 3),
					a = new Float32Array(n * 3),
					o = new Float32Array(n);
				i.setAttribute("position", new pe(s, 3)), i.setAttribute("color", new pe(a, 3)), i.setAttribute("size", new pe(o, 1)), t.forEach((c, u) => {
					let [h, d, f, p] = c, v = st.rad(st.hoursToDeg(h)), x = st.rad(d), g = hs.sphericalToCartesian(v, x, 1e9), m = hs.equatorialToEcliptic_Cartesian(g[0], g[1], g[2], hs.getObliquity());
					s.set(m, u * 3);
					let b = new $(cE(f));
					a.set(b.toArray(), u * 3), o[u] = uE(p, this._options.minSize || 3)
				});
				let l = new Ye({
					uniforms: {},
					vertexColors: !0,
					vertexShader: Ko,
					fragmentShader: Jo,
					transparent: !0
				});
				this._stars = new Ot(i, l), this._simulation && this._simulation.addObject(this, !0)
			})
		}
		get3jsObjects() {
			return this._stars ? [this._stars] : []
		}
		getId() {
			return this._id
		}
		update() { }
	};
	var cm = class {
		constructor(e, t) {
			this.simulationElt = e, this.options = t || {}, this.options.basePath = this.options.basePath || Rp(), this.jd = typeof this.options.jd == "undefined" ? Number((0, il.default)(this.options.startDate || new Date)) : this.options.jd, this.jdDelta = this.options.jdDelta, this.jdPerSecond = this.options.jdPerSecond || 100, this.isPaused = t.startPaused || !1, this.onTick = void 0, this.enableCameraDrift = !1, this.cameraDefaultPos = xn([0, -10, 5]), this.options.camera && (this.enableCameraDrift = !!this.options.camera.enableDrift, this.options.camera.initialPosition && (this.cameraDefaultPos = xn(this.options.camera.initialPosition))), this.useLightSources = !1, this.lightPosition = void 0, this.subscribedObjects = {}, _e.DefaultUp = new A(0, 0, 1), this.options.unitsPerAu && Cp(this.options.unitsPerAu), this.stats = void 0, this.fps = 1, this.lastUpdatedTime = Date.now(), this.lastStaticCameraUpdateTime = Date.now(), this.lastResizeUpdateTime = Date.now(), this.renderEnabled = !0, this.initialRenderComplete = !1, this.animate = this.animate.bind(this), this.renderer = this.initRenderer(), this.scene = new mn, this.camera = new jo(this.getContext()), this.composer = void 0, this.particles = new cr({
				textureUrl: this.options.particleTextureUrl || "{{assets}}/sprites/smallparticle.png",
				jd: this.jd,
				maxNumParticles: this.options.maxNumParticles,
				defaultSize: this.options.particleDefaultSize
			}, this), this.init(), this.animate()
		}
		init() {
			if (this.camera.get3jsCamera().position.set(this.cameraDefaultPos[0], this.cameraDefaultPos[1], this.cameraDefaultPos[2]), this.simulationElt.onmousedown = this.simulationElt.ontouchstart = () => {
				this.enableCameraDrift = !1
			}, (() => {
				let e = !1;
				this.camera.get3jsCameraControls().addEventListener("change", () => {
					e && this.staticForcedUpdate()
				}), setTimeout(() => {
					this.staticForcedUpdate(), e = !0, this.initialRenderComplete = !0
				}, 0)
			})(), this.simulationElt.addEventListener("resize", () => {
				this.resizeUpdate()
			}), window.addEventListener("resize", () => {
				this.resizeUpdate()
			}), this.options.debug) {
				if (this.options.debug.showGrid) {
					let e = new ar(void 0, void 0);
					e.geometry.rotateX(Math.PI / 2), this.scene.add(e)
				}
				this.options.debug.showAxes && this.scene.add(new ha(.5)), this.options.debug.showStats && (this.stats = new Hp, this.stats.showPanel(0), this.simulationElt.appendChild(this.stats.dom))
			}
			this.initPasses()
		}
		initRenderer() {
			let e = new Ys({
				antialias: !0
			});
			console.info("Max texture resolution:", e.capabilities.maxTextureSize);
			let t = e.capabilities.getMaxPrecision("highp");
			return t !== "highp" && console.warn(`Shader maximum precision is "${t}", GPU rendering may not be accurate.`), e.setPixelRatio(window.devicePixelRatio), e.setSize(this.simulationElt.offsetWidth, this.simulationElt.offsetHeight), this.simulationElt.appendChild(e.domElement), e
		}
		initPasses() {
			let e = this.camera.get3jsCamera(),
				t = new qp({
					width: 240,
					height: 240,
					luminanceThreshold: .2
				});
			t.blendMode.opacity.value = 2.3;
			let n = new Yp(this.scene, e);
			n.renderToScreen = !1;
			let i = new Xp(e, t);
			i.renderToScreen = !0;
			let s = new Qp(this.renderer);
			s.addPass(n), s.addPass(i), this.composer = s
		}
		update(e = !1) {
			for (let t in this.subscribedObjects) this.subscribedObjects.hasOwnProperty(t) && this.subscribedObjects[t].update(this.jd, e)
		}
		staticForcedUpdate() {
			if (this.isPaused) {
				let e = Date.now();
				e - this.lastStaticCameraUpdateTime > 30 && (this.update(!0), this.lastStaticCameraUpdateTime = e)
			}
		}
		resizeUpdate() {
			let e = Date.now();
			if (e - this.lastResizeUpdateTime > 30) {
				let i = this.simulationElt.offsetWidth,
					s = this.simulationElt.offsetHeight;
				if (i === 0 && s === 0) return;
				let a = this.camera.get3jsCamera();
				a.aspect = i / s, a.updateProjectionMatrix(), this.renderer.setSize(i, s), this.staticForcedUpdate(), this.lastResizeUpdateTime = e
			}
		}
		doCameraDrift() {
			let e = 1e-4 * Date.now(),
				t = this.cameraDefaultPos,
				n = this.camera.get3jsCamera();
			n.position.x = t[0] + t[0] * (Math.cos(e) + 1) / 3, n.position.z = t[2] + t[2] * (Math.sin(e) + 1) / 3
		}
		animate() {
			if (!(!this.renderEnabled && this.initialRenderComplete)) {
				if (window.requestAnimationFrame(this.animate), this.stats && this.stats.begin(), !this.isPaused) {
					this.jdDelta ? this.jd += this.jdDelta : this.jd += this.jdPerSecond / this.fps;
					let e = (Date.now() - this.lastUpdatedTime) / 1e3;
					this.lastUpdatedTime = Date.now(), this.fps = 1 / e || 1, this.update()
				}
				this.enableCameraDrift && this.doCameraDrift(), this.camera.update(), this.renderer.render(this.scene, this.camera.get3jsCamera()), this.onTick && this.onTick(), this.stats && this.stats.end()
			}
		}
		addObject(e, t = !1) {
			if (e.get3jsObjects().map(n => {
				this.scene.add(n)
			}), !t) {
				let n = e.getId();
				this.subscribedObjects[n] && console.error(`Object id is not unique: "${n}". This could prevent objects from updating correctly.`), this.subscribedObjects[n] = e
			}
		}
		removeObject(e) {
			e.get3jsObjects().map(t => {
				this.scene.remove(t)
			}), typeof e.removalCleanup == "function" && e.removalCleanup(), delete this.subscribedObjects[e.getId()]
		}
		createObject(...e) {
			return new ms(...e, this)
		}
		createShape(...e) {
			return new $o(...e, this)
		}
		createSphere(...e) {
			return new tl(...e, this)
		}
		createStaticParticles(...e) {
			return new nl(...e, this)
		}
		createSkybox(...e) {
			return new el(...e, this)
		}
		createStars(...e) {
			return e.length ? new ma(...e, this) : new ma({}, this)
		}
		createAmbientLight(e = 3355443) {
			this.scene.add(new cs(e)), this.useLightSources = !0
		}
		createLight(e = void 0, t = 16777215) {
			this.lightPosition && console.warn("Spacekit doesn't support more than one light source for SphereObjects"), this.lightPosition = new A;
			let n = new ls;
			if (typeof e == "undefined") this.camera.get3jsCameraControls().addEventListener("change", () => {
				this.lightPosition.copy(this.camera.get3jsCamera().position), n.position.copy(this.camera.get3jsCamera().position)
			});
			else {
				let i = xn(e);
				this.lightPosition.set(i[0], i[1], i[2]), n.position.set(i[0], i[1], i[2])
			}
			this.scene.add(n), this.useLightSources = !0
		}
		getLightPosition() {
			return this.lightPosition
		}
		isUsingLightSources() {
			return this.useLightSources
		}
		loadNaturalSatellites() {
			return new Qo(this).load()
		}
		renderOnlyInViewport() {
			let e = !0,
				t = () => {
					let n = this.simulationElt.getBoundingClientRect(),
						i = window.innerHeight || document.documentElement.clientHeight,
						s = window.innerWidth || document.documentElement.clientWidth,
						a = n.top <= i && n.top + n.height >= 0,
						o = n.left <= s && n.left + n.width >= 0;
					return a && o
				};
			window.addEventListener("scroll", () => {
				let n = t();
				e && !n ? (this.renderEnabled = !1, e = !1) : !e && n && (this.renderEnabled = !0, window.requestAnimationFrame(this.animate), e = !0)
			}), t() || (this.renderEnabled = !1, e = !1)
		}
		zoomToFit(e, t = 3) {
			return qt(this, null, function* () {
				let n = e.getOrbit(),
					i = n ? n.getOrbitShape() : yield e.getBoundingObject();
				return i ? (this.doZoomToFit(i, t), !0) : !1
			})
		}
		doZoomToFit(e, t) {
			let n = new Bt;
			n.setFromObject(e);
			let i = new A;
			n.getCenter(i);
			let s = new A;
			n.getSize(s);
			let a = this.camera.get3jsCamera(),
				o = Math.max(s.x, s.y, s.z),
				l = a.fov * (Math.PI / 180),
				c = Math.abs(o / 2 * Math.tan(l * 2)) * t,
				u = new A;
			e.getWorldPosition(u);
			let f = a.position.sub(u).normalize().multiplyScalar(c);
			a.position.x = f.x, a.position.y = f.y, a.position.z = f.z, a.updateProjectionMatrix(), this.cameraDefaultPos = [f.x, f.y, f.z]
		}
		start() {
			this.lastUpdatedTime = Date.now(), this.isPaused = !1
		}
		stop() {
			this.isPaused = !0
		}
		getJd() {
			return this.jd
		}
		setJd(e) {
			this.jd = e, this.update(!0)
		}
		getDate() {
			return il.default.toDate(this.jd)
		}
		setDate(e) {
			this.setJd(Number((0, il.default)(e)))
		}
		getJdDelta() {
			return this.jdDelta ? this.jdDelta : this.jdPerSecond / this.fps
		}
		setJdDelta(e) {
			this.jdDelta = e
		}
		getJdPerSecond() {
			if (!this.jdDelta) return this.jdPerSecond
		}
		setJdPerSecond(e) {
			this.jdDelta = void 0, this.jdPerSecond = e
		}
		getContext() {
			return {
				simulation: this,
				options: this.options,
				objects: {
					particles: this.particles,
					camera: this.camera,
					scene: this.scene,
					renderer: this.renderer,
					composer: this.composer
				},
				container: {
					width: this.simulationElt.offsetWidth,
					height: this.simulationElt.offsetHeight
				}
			}
		}
		getSimulationElement() {
			return this.simulationElt
		}
		getViewer() {
			return this.camera
		}
		getScene() {
			return this.scene
		}
		getRenderer() {
			return this.renderer
		}
		setCameraDrift(e) {
			this.enableCameraDrift = e
		}
	};
	var hE = lu;
	return dE;
})();
/**
 * @license
 * Copyright 2010-2021 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
/**
 * postprocessing v6.29.0 build Mon Oct 17 2022
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2022 Raoul van Rüschen
 * @license Zlib
 */
//# sourceMappingURL=spacekit.js.map