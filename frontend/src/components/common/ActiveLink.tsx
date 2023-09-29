/* composant React ActiveLink qui gère la classe CSS active pour les liens en fonction du chemin de la page actuellement affichée. Le composant utilise le router de Next.js pour obtenir le chemin actuel de la page et met à jour dynamiquement la classe CSS en fonction du chemin. Lorsque le lien correspond au chemin actif, la classe CSS active est ajoutée. */
import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import React, { PropsWithChildren, useState, useEffect } from 'react'

// Définition des propriétés personnalisées pour le composant ActiveLink
type ActiveLinkProps = LinkProps & {
  className?: string         // Nom de classe CSS optionnel
  activeClassName: string    // Nom de classe CSS active
}

const ActiveLink = ({
  children,                 // Les éléments enfants du composant
  activeClassName,         // Le nom de classe CSS à appliquer lorsque le lien est actif
  className,               // Le nom de classe CSS optionnel
  ...props                  // Autres propriétés de lien (provenant de next/link)
}: PropsWithChildren<ActiveLinkProps>) => {
  const { asPath, isReady } = useRouter()  // Obtenir le chemin actuel de la page et la disponibilité du routeur
  const [computedClassName, setComputedClassName] = useState(className) // État pour stocker le nom de classe calculé

  useEffect(() => {
    // Vérifie si les champs du routeur sont mis à jour côté client
    if (isReady) {
      // Le chemin du lien dynamique sera obtenu à partir de props.as
      // Le chemin du lien statique sera obtenu à partir de props.href
      const linkPathname = new URL(
        (props.as || props.href) as string, // Utilisation de props.as ou props.href en tant que chemin
        location.href
      ).pathname

      // Utilisation de URL().pathname pour supprimer les informations de requête et d'ancre
      const activePathname = new URL(asPath, location.href).pathname

      const newClassName =
        linkPathname === activePathname
          ? `${className} ${activeClassName}`.trim() // Appliquer la classe active si les chemins correspondent
          : className

      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName) // Met à jour le nom de classe calculé si nécessaire
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    activeClassName,
    className,
    computedClassName,
  ])

  return (
    <Link className={computedClassName} {...props}>
      {children} 
    {/*   // Renvoie un composant de lien avec la classe CSS calculée et les éléments enfants */}
    </Link>
  )
}

export default ActiveLink // Exporte le composant ActiveLink
