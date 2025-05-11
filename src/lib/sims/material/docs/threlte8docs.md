<!-- https://threlte.xyz/docs/learn/advanced/migration-guides -->

Migration Guides
Threlte 8
Threlte 8 adds Svelte 5 support and removes Svelte 4 support.

This upgrade contains bug fixes, better average performance, smaller bundle size, and an improved development experience.

There are a few notable breaking changes listed below.

Automatic Disposal
Automatic disposal has been improved to only dispose of objects that are referenced by a <T> component. Objects are no longer scanned recursively for disposable objects.


Copy
<script>
  import { T } from '@threlte/core'
  import { useTexture } from '@threlte/extras'
  const map = useTexture('/some/texture.png')
</script>
{#if $map}
  <T.Mesh>
    <T.BoxGeometry />
    <T.MeshBasicMaterial map={$map} />
  </T.Mesh>
{/if}
In this example, Threlte 7 also disposed of the texture when the material unmounted. This is no longer the case in Threlte 8. This change is introduced to improve performance and to make the behavior of automatic disposal more intuitive. When looking at simple examples like the one above, this might seem like a regression, but with scale the previous approach of deeply recursive automatic disposal was hard to reason about and a performance bottleneck.

Plugin API
The plugin API has been changed to allow for greater granularity and a reactivity model that is in-line with Svelte 5.

createPlugin has been removed
Threlte 7 included a function called createPlugin that allowed to separate a plugin declaration from its implementation. The recommended way to create plugins is to export a function that invokes injectPlugin:


Copy
import { injectPlugin } from '@threlte/core'
export const createSomePlugin = (pluginArg: string) => {
  injectPlugin('some-plugin', () => {
    // ... Plugin Code
  })
}
This plugin can now be implemented like this:

Scene.svelte

Copy
<script>
  import { createSomePlugin } from '$plugins'
  createSomePlugin('plugin-arg')
</script>
Plugin callbacks have been removed
In Threlte 7, plugins could return an object with several callback functions that were invoked when:

ref changed
any prop changed (e.g. makeDefault, dispose, attach, etc.)
any “rest” prop changed (e.g. position, color, etc.)
Threlte

Copy
injectPlugin('some-plugin', ({ ref, props }) => {
  return {
    onRefChange(newRef) {
      // ...
    },
    onPropsChange(props) {
      // ...
    },
    onRestPropsChange(restProps) {
      // ...
    }
  }
})
These callbacks have been removed. Instead, you can use the first argument of the plugin callback, which is a reactive object containing all properties needed:

Threlte

Copy
injectPlugin('some-plugin', (args) => {
  args.ref
  args.makeDefault
  args.args
  args.attach
  args.manual
  args.makeDefault
  args.dispose
  args.props // All other props declared on the component
})
The args object is reactive and will update whenever any of the referenced values change.

A plugin may still return an object with pluginProps to specify which props the <T> component should not react to.

Events
Events will no longer work, and have been replaced with callback props.


Copy
<T.Mesh
  onclick={onClick}
  onpointerenter={onPointerEnter}
>
  <T.BoxGeometry />
  <T.MeshStandardMaterial />
</T.Mesh>
The signature of the oncreate callback prop has changed. Instead of receiving an object with a cleanup function, you may now return a cleanup function that will run when the object is destroyed or its args change. This is more in-line with other apis in svelte 5 and threlte.


Copy
<T.Mesh
  oncreate={(ref) => {
    return () => {
      console.log('cleanup')
    }
  }}
>
  <T.BoxGeometry />
  <T.MeshStandardMaterial />
</T.Mesh>
The createRawEventDispatcher and forwardEventHandlers exports will no longer work.

Instead of dispatching events with createRawEventDispatcher, invoke callback props.


Copy
<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  type Props = {
    onchange?: () => void
  }
  let { onchange }: Props = $props()
  onchange?.()
</script>
<T.PerspectiveCamera makeDefault>
  <OrbitControls {onchange} />
</T.PerspectiveCamera>
Instead of using forwardEventHandlers, pass rest props to the component you wish to forward events to.


Copy
<script>
  let { ...rest } = $props()
</script>
<T.Mesh {...rest}>
  <T.BoxGeometry />
  <T.MeshBasicMaterial />
</T.Mesh>
This will pass the new callback props mentioned in the previous section down the tree of components.

Attach API & Trait Components
The signature and heuristic of the attach API of the <T> component has changed. The trait components <HierarchicalObject> and <SceneGraphObject> have been removed.

attach Function Signature

Copy
<!-- Threlte 7 -->
<T.Mesh
  attach={(parent, self) => {
    console.log('attaching', parent, self)
    return () => {
      console.log('detaching', parent, self)
    }
  }}
/>
<!-- Threlte 8 -->
<T.Mesh
  attach={({ ref, parent, parentObject3D }) => {
    console.log('attaching', ref, parent, parentObject3D)
    return () => {
      console.log('detaching', ref, parent, parentObject3D)
    }
  }}
/>
attach={false}
If false is passed to the attach prop, the component will not be automatically attached to the parent object. This is useful if you want to attach the component manually.


Copy
<!-- "Dangling" component -->
<T
  is={mesh}
  attach={false}
/>
attach={object3D}
If an object3D instance is passed to the attach prop, the component will be attached to the instance, essentially acting as a portal.

Be aware that the component still acts in the given context of the parent.

Copy
<!-- Attached to the provided object -->
<T
  is={mesh}
  attach={object3D}
/>
Snippets
Slot props will no longer work, and must be replaced with snippets. For example, the following components from Threlte 7 would need to be migrated from this:


Copy
<T.PerspectiveCamera let:ref>
  <T.OrbitControls
    args={[ref, renderer.domElement]}
    on:change={invalidate}
  />
</T.PerspectiveCamera>
…to this:


Copy
<T.PerspectiveCamera>
  {#snippet children({ ref })}
    <T.OrbitControls
      args={[ref, renderer.domElement]}
      onchange={invalidate}
    />
  {/snippet}
</T.PerspectiveCamera>
Any component that previously exposed a slot prop using the let: directive can follow this new pattern.

Canvas component size prop
The size property on the <Canvas> component that allowed setting specific pixel dimensions has been removed. To set a specific size of your <Canvas>, simply wrap it in an HTML element with your desired dimensions.


Copy
<div style="width: 500px; height: 300px;">
  <Canvas>
    <Scene />
  </Canvas>
</div>
Canvas component rendererParameters prop
The renderParameters canvas prop has been replaced with a more powerful createRenderer function.

If you need to manually set renderer parameters, call the function and return a renderer.


Copy
<Canvas
  createRenderer={(canvas) => {
    return new WebGLRenderer({
      canvas,
      alpha: true,
      powerPreference: 'high-performance',
      antialias: false,
      depth: false,
      premultipliedAlpha: false
    })
  }}
>
  <Scene />
</Canvas>
Any Three renderer can be returned when calling createRenderer.

Transitions
The transitions plugin currently does not work, we’re working towards a new transition system.

useGltf and <GLTF>
useGltf and <GLTF> no longer contain a built-in DracoLoader, KTX2Loader, or MeshoptDecoder. Instead, separate hooks can be imported and passed to these tools, improving their bundle size and flexibility.


Copy
import { useGltf, useDraco, useKtx2, useMeshopt } from '@threlte/extras'
const dracoLoader = useDraco()
const ktx2Loader = useKtx2()
const meshoptDecoder = useMeshopt()
const gltf = useGltf('./path/to/model.glb', {
  dracoLoader,
  ktx2Loader,
  meshoptDecoder
})
For more information, see the useGltf and GLTF docs.

Rapier
Two Stage Physics
In order to enable fixed frame physics, the Rapier package is introducing two scheduler stages. So in the most simple physics implementation:


Copy
<Canvas>
  <World>
    <Scene />
  </World>
</Canvas>
The scheduler plan will look like this:


Copy
scheduler
├─ threlte-main-stage
├─ simulation
│  └─ simulation
├─ synchronization
│  └─ synchronization
└─ threlte-render-stage
Tasks that are added to the simulation stage will be executed according to the set framerate, i.e. the delta provided in these tasks corresponds to the delta time between physics frames. Tasks added to the synchronization stage will be executed after all tasks of the simulation stage have been executed, the delta is the regular requestAnimationFrame frame delta. The stages and tasks are available as part of the RapierContext with the useRapier hook:


Copy
import { useTask } from '@threlte/core'
import { useRapier } from '@threlte/rapier'
const { simulationTask } = useRapier()
useTask(
  () => {
    // E.g. interact with the physics world here
  },
  {
    before: simulationStage
  }
)
BasicPlayerController has been removed
The BasicPlayerController component has been removed. If you need a player controller, Rapier comes with a pre-made, easy to implement Character Controller. It’s more powerful and flexible than the old component.

The reason is stated in rapier’s documentation as well:

Despite the fact that this built-in character controller is designed to be generic enough to serve as a good starting point for many common use-cases, character-control (especially for the player’s character itself) is often very game-specific. Therefore the builtin character controller may not work perfectly out-of-the-box for all game types.

oncreate event signature
The oncreate event signature available on <RigidBody>, Collider and <AutoColliders> has been adapted to match the oncreate prop on <T>.


Copy
<RigidBody
  oncreate={(ref) => {
    // ref is the created RigidBody instance
    return () => {
      // cleanup function
    }
  }}
>
  <!-- ... -->
</RigidBody>