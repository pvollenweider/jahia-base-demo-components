<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="utility" uri="http://www.jahia.org/tags/utilityLib" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="functions" uri="http://www.jahia.org/tags/functions" %>
<%@ taglib prefix="ui" uri="http://www.jahia.org/tags/uiComponentsLib" %>
<%--@elvariable id="currentNode" type="org.jahia.services.content.JCRNodeWrapper"--%>
<%--@elvariable id="propertyDefinition" type="org.jahia.services.content.nodetypes.ExtendedPropertyDefinition"--%>
<%--@elvariable id="type" type="org.jahia.services.content.nodetypes.ExtendedNodeType"--%>
<%--@elvariable id="out" type="java.io.PrintWriter"--%>
<%--@elvariable id="script" type="org.jahia.services.render.scripting.Script"--%>
<%--@elvariable id="scriptInfo" type="java.lang.String"--%>
<%--@elvariable id="workspace" type="java.lang.String"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>
<%--@elvariable id="currentResource" type="org.jahia.services.render.Resource"--%>
<%--@elvariable id="url" type="org.jahia.services.render.URLGenerator"--%>

<%-- get the node properties --%>
<c:set var="title" value="${currentNode.properties['jcr:title'].string}"/>
<c:set var="description" value="${currentNode.properties['description'].string}"/>
<c:set var="image" value="${currentNode.properties['image'].node}"/>

<c:choose>
    <%-- If no image has been supplied for the image view, put a placeholder image in place --%>
    <c:when test="${empty image}">
        <c:url var="imageUrl" value="${url.currentModule}/img/background.jpg"/>
    </c:when>
    <c:otherwise>
        <c:url var="imageUrl" value="${image.url}" context="/"/>
    </c:otherwise>
</c:choose>

<%-- check if the link property has been used on this content --%>
<c:if test="${jcr:isNodeType(currentNode, 'jdmix:hasLink') and not empty currentNode.properties['internalLink']
and not empty currentNode.properties['internalLink'].node}">
    <c:set var="linkNode" value="${currentNode.properties['internalLink'].node}"/>
</c:if>

<div class="thumbnails thumbnail-style thumbnail-kenburn">
    <div class="thumbnail-img">
        <div class="overflow-hidden">
            <img class="img-fluid" src="${imageUrl}" alt="">
        </div>
        <%-- only display the read more text if a link has been provided --%>
        <c:if test="${not empty linkNode}">
            <a class="btn-more hover-effect" href="<template:module node="${linkNode}" view="hidden.contentURL" editable="false"/>" alt="${title}">
                <c:choose>
                    <c:when test="${jcr:isNodeType(currentNode, 'jdmix:buttonText')}">
                        <template:include view="hidden.buttonText"/>
                    </c:when>
                    <c:otherwise>
                        <fmt:message key="jdnt_highlight.readmore"/>
                    </c:otherwise>
                </c:choose>
                &nbsp;+</a>
        </c:if>
    </div>
    <div class="caption">
        <c:choose>
            <c:when test="${not empty linkNode}">
                <h3><a class="hover-effect" href="<template:module node="${linkNode}" view="hidden.contentURL" editable="false"/>">${title}</a></h3>
            </c:when>
            <c:otherwise>
                <h3><a class="hover-effect" href="#">${title}</a></h3>
            </c:otherwise>
        </c:choose>
        <p>${description}</p>
    </div>
</div>
